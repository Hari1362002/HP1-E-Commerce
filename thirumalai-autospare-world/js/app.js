/* ==========================================================================
   app.js — Shared shell, state and UI renderers
   Loaded on every page after data.js + art.js.
   ========================================================================== */

/* ---------- tiny DOM helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

/** Compact Indian format for big figures: ₹6.72 Cr, ₹4.5 L, ₹8,400 */
const moneyShort = (n) => {
  n = Math.round(n);
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2).replace(/\.00$/, '') + ' Cr';
  if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2).replace(/\.00$/, '') + ' L';
  return money(n);
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Read query params */
const QS = new URLSearchParams(location.search);
const qp = (k, d = '') => QS.get(k) || d;

/* ---------- Persistent state ---------- */
const Store = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota */ }
  },

  /* --- cart: [{id, qty}] --- */
  cart()      { return this.read('taw_cart', []); },
  saveCart(c) { this.write('taw_cart', c); Shell.syncCounts(); },

  cartCount() { return this.cart().reduce((n, i) => n + i.qty, 0); },

  cartLines() {
    return this.cart()
      .map(i => ({ ...i, part: Catalog.get(i.id) }))
      .filter(l => l.part);
  },

  cartTotal() {
    return this.cartLines().reduce((t, l) => t + l.part.price * l.qty, 0);
  },

  addToCart(id, qty = 1) {
    const part = Catalog.get(id);
    if (!part) return false;
    if (part.stock < 1) { toast('Out of stock', part.shortName, 'err'); return false; }

    const cart = this.cart();
    const line = cart.find(i => i.id === id);
    const have = line ? line.qty : 0;

    if (have + qty > part.stock) {
      toast('Only ' + part.stock + ' left in stock', part.shortName, 'err');
      qty = part.stock - have;
      if (qty < 1) return false;
    }
    if (line) line.qty += qty; else cart.push({ id, qty });
    this.saveCart(cart);
    toast('Added to cart', `${part.shortName} · ${money(part.price * qty)}`);
    return true;
  },

  setQty(id, qty) {
    const part = Catalog.get(id);
    let cart = this.cart();
    qty = Math.max(0, Math.min(qty, part ? part.stock : 0));
    if (qty === 0) cart = cart.filter(i => i.id !== id);
    else {
      const line = cart.find(i => i.id === id);
      if (line) line.qty = qty; else cart.push({ id, qty });
    }
    this.saveCart(cart);
  },

  removeFromCart(id) {
    this.saveCart(this.cart().filter(i => i.id !== id));
  },

  clearCart() { this.saveCart([]); },

  /* --- wishlist --- */
  wish()         { return this.read('taw_wish', []); },
  isWished(id)   { return this.wish().includes(id); },
  toggleWish(id) {
    const w = this.wish();
    const i = w.indexOf(id);
    if (i > -1) w.splice(i, 1); else w.push(id);
    this.write('taw_wish', w);
    Shell.syncCounts();
    return i === -1;
  },

  /* --- garage: the bike the customer saved --- */
  garage()      { return this.read('taw_garage', null); },
  setGarage(id) { this.write('taw_garage', id); },

  /* --- orders --- */
  orders()     { return this.read('taw_orders', []); },
  addOrder(o)  { const list = this.orders(); list.unshift(o); this.write('taw_orders', list); }
};

/* ==========================================================================
   Dealer edits — price/stock changes made in the back office ride on top of
   the generated catalogue. Applied at load so the storefront reflects them.
   Idempotent: offPct is always recomputed from price vs MRP.
   ========================================================================== */
function applyDealerEdits() {
  for (const [sku, patch] of Object.entries(Store.read('taw_admin_overrides', {}))) {
    const p = Catalog.get(sku);
    if (!p) continue;
    if (patch.stock != null) p.stock = patch.stock;
    if (patch.price != null) {
      p.price = patch.price;
      p.offPct = Math.max(0, Math.round((1 - p.price / p.mrp) * 100));
    }
  }
}
applyDealerEdits();

/* ==========================================================================
   Pricing — one source of truth for cart + checkout totals.
   Listed prices already include GST, so tax is shown as a component.
   ========================================================================== */
const COUPONS = {
  RIDE10:    { type: 'pct',  value: 10,  min: 0,    label: '10% off your order' },
  FIRST500:  { type: 'flat', value: 100, min: 500,  label: '₹100 off over ₹500' },
  SERVICE20: { type: 'pct',  value: 20,  min: 2500, label: '20% off over ₹2,500' },
  FREESHIP:  { type: 'ship', value: 0,   min: 0,    label: 'Free shipping' }
};

const Pricing = {
  FREE_SHIP_OVER: 999,
  SHIP_FLAT: 79,
  COD_FEE: 49,
  GST_RATE: 0.18,

  coupon()      { return Store.read('taw_coupon', null); },
  setCoupon(c)  { Store.write('taw_coupon', c); },

  /** @param {{cod?:boolean}} opts */
  quote(opts = {}) {
    const lines    = Store.cartLines();
    const subtotal = lines.reduce((t, l) => t + l.part.price * l.qty, 0);
    const mrpTotal = lines.reduce((t, l) => t + l.part.mrp * l.qty, 0);
    const items    = lines.reduce((n, l) => n + l.qty, 0);

    const code = this.coupon();
    const c = code ? COUPONS[code] : null;
    let discount = 0, freeShip = false;

    if (c && subtotal >= c.min) {
      if (c.type === 'pct')  discount = Math.round(subtotal * c.value / 100);
      if (c.type === 'flat') discount = Math.min(c.value, subtotal);
      if (c.type === 'ship') freeShip = true;
    }

    const afterDiscount = subtotal - discount;
    const shipping = (!items || freeShip || afterDiscount >= this.FREE_SHIP_OVER)
      ? 0 : this.SHIP_FLAT;
    const cod = opts.cod ? this.COD_FEE : 0;
    const total = afterDiscount + shipping + cod;
    const gst = Math.round(afterDiscount - afterDiscount / (1 + this.GST_RATE));

    return {
      lines, items, subtotal, mrpTotal,
      savedOnMrp: mrpTotal - subtotal,
      code, coupon: c, discount, shipping, cod, gst, total,
      freeShipGap: Math.max(0, this.FREE_SHIP_OVER - afterDiscount)
    };
  }
};

/* ---------- Toast ---------- */
function toast(title, sub = '', type = 'ok') {
  let host = $('.toaster');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toaster';
    document.body.appendChild(host);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'err' ? ' toast--err' : '');
  t.innerHTML = `${type === 'err' ? ICO.alert : ICO.checkCircle}
    <div><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div>`;
  host.appendChild(t);
  setTimeout(() => {
    t.classList.add('is-out');
    t.addEventListener('animationend', () => t.remove(), { once: true });
  }, 2600);
}

/* ==========================================================================
   UI renderers
   ========================================================================== */
const UI = {
  /* Bike picture — real photo if the model has one, else generated art */
  bikePic(model) {
    if (model.image) return `<img src="${esc(model.image)}" alt="${esc(model.name)}" loading="lazy">`;
    const color = Catalog.brandById[model.brand]?.color || '#E11B22';
    return BikeArt.render(model.kind, color);
  },

  partPic(part) {
    if (part.image) return `<img src="${esc(part.image)}" alt="${esc(part.name)}" loading="lazy">`;
    return PartArt.render(part.art);
  },

  stars(rating) {
    let out = '<span class="stars">';
    for (let i = 1; i <= 5; i++) {
      out += ICO.star.replace('<svg', `<svg class="${i <= Math.round(rating) ? 'on' : ''}"`);
    }
    return out + '</span>';
  },

  stockLine(stock) {
    if (stock === 0)  return `<span class="dot dot--red"></span><span class="dim">Out of stock</span>`;
    if (stock <= 5)   return `<span class="dot dot--amber"></span><span style="color:var(--amber)">Only ${stock} left</span>`;
    return `<span class="dot dot--green"></span><span style="color:var(--green)">In stock</span>`;
  },

  /* --- Part card --- */
  partCard(p) {
    const wished = Store.isWished(p.id);
    const flags = [];
    if (p.offPct >= 25)             flags.push(`<span class="tag tag--red">${p.offPct}% off</span>`);
    if (p.tags.includes('bestseller')) flags.push(`<span class="tag tag--amber">Bestseller</span>`);
    if (p.universal)                flags.push(`<span class="tag tag--grey">Universal</span>`);

    return `
      <article class="part-card" data-part="${p.id}">
        <div class="part-card__pic">
          ${this.partPic(p)}
          <div class="part-card__flags">${flags.join('')}</div>
        </div>
        <button class="part-card__wish ${wished ? 'is-on' : ''}" data-wish="${p.id}"
                aria-label="Save to wishlist" title="Save to wishlist">${ICO.heart}</button>
        <div class="part-card__body">
          <div class="part-card__sku">${p.sku}</div>
          <a class="part-card__name stretch" href="product-details.html?p=${encodeURIComponent(p.id)}">
            ${esc(p.shortName)}
          </a>
          <div class="part-card__maker">${esc(p.maker)} · ${esc(p.modelName)}</div>
          <div class="part-card__rating">${this.stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
          <div class="part-card__price">
            <span class="price">${money(p.price)}</span>
            <span class="price--mrp">${money(p.mrp)}</span>
            <span class="price--off">${p.offPct}% off</span>
          </div>
          <div class="part-card__stock">${this.stockLine(p.stock)}</div>
          <button class="btn btn--primary btn--sm btn--block" data-add="${p.id}"
                  ${p.stock ? '' : 'disabled'} style="position:relative;z-index:5">
            ${ICO.cart} ${p.stock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </article>`;
  },

  /* --- Bike model card --- */
  modelCard(m) {
    const b = Catalog.brandById[m.brand];
    return `
      <article class="model-card" style="--bc:${b.color}">
        <div class="model-card__pic">
          ${this.bikePic(m)}
          <span class="model-card__cc">${m.cc} CC · ${m.kind.toUpperCase()}</span>
        </div>
        <div class="model-card__body">
          <div class="model-card__brand">${esc(b.name)}</div>
          <a class="model-card__name stretch"
             href="model.html?b=${m.brand}&m=${m.id}">${esc(m.name)}</a>
          <div class="model-card__years">${esc(m.years)} · ${esc(m.power)}</div>
          <div class="model-card__foot">
            <span class="model-card__parts"><b>${Catalog.countOf(m.id)}</b> Parts</span>
            <span class="model-card__go">View ${ICO.chevR}</span>
          </div>
        </div>
      </article>`;
  },

  /* --- Brand tile --- */
  brandTile(b) {
    const n = Catalog.modelsOf(b.id).length;
    return `
      <a class="brand-tile" style="--bc:${b.color}" href="brand.html?b=${b.id}">
        <div class="brand-tile__logo"><span>${esc(b.name)}</span></div>
        <div class="brand-tile__meta">
          <small>${n} Models · Est. ${b.since}</small>
          <span class="brand-tile__arrow">${ICO.right}</span>
        </div>
      </a>`;
  },

  /* --- Category tile --- */
  catTile(c) {
    const n = Catalog.partsOfCat(c.id).length;
    return `
      <a class="cat-tile" href="products.html?cat=${c.id}">
        <span class="cat-tile__ico">${PartArt.render(c.art)}</span>
        <b>${esc(c.name)}</b>
        <small>${n} Parts</small>
      </a>`;
  },

  crumb(items) {
    return `<nav class="crumb">` + items.map((it, i) =>
      (i ? ICO.chevR : '') +
      (it.href ? `<a href="${it.href}">${esc(it.label)}</a>`
               : `<span class="crumb__now">${esc(it.label)}</span>`)
    ).join('') + `</nav>`;
  },

  empty(title, msg, cta = '') {
    return `<div class="empty">${ICO.box}<h3>${esc(title)}</h3><p>${esc(msg)}</p>${cta}</div>`;
  }
};

/* ==========================================================================
   Shell — header / footer / global wiring
   ========================================================================== */
const Shell = {
  page: document.body.dataset.page || '',

  headerHTML() {
    const brandLinks = BRANDS.map(b => `
      <a class="mega__brand" href="brand.html?b=${b.id}">
        <span class="mega__logo" style="color:${b.color}">${esc(b.name.slice(0, 3).toUpperCase())}</span>
        <span>
          <b class="mega__name">${esc(b.name)}</b>
          <span class="mega__meta">${Catalog.modelsOf(b.id).length} models</span>
        </span>
      </a>`).join('');

    const on = (p) => this.page === p ? ' is-active' : '';

    return `
    <div class="topbar">
      <div class="wrap topbar__in">
        <div class="topbar__l">
          <span>${ICO.phone} <a href="tel:+919876543210">+91 98765 43210</a></span>
          <span>${ICO.clock} Mon–Sat · 9:00 AM – 8:30 PM</span>
        </div>
        <div class="topbar__r">
          <span>${ICO.truck} Free shipping over <strong>₹999</strong></span>
          <span>${ICO.pin} Kolumam, Tamil Nadu</span>
          <span>GSTIN 33AABCT1234M1Z5</span>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="wrap header__in">
        <button class="iconbtn burger" id="burger" aria-label="Menu">${ICO.menu}</button>

        <a class="logo" href="index.html">
          <span class="logo__mark">${ICO.gear}</span>
          <span class="logo__txt">
            <span class="logo__name">Thirumalai</span>
            <span class="logo__sub">Autospare World</span>
          </span>
        </a>

        <nav class="nav">
          <a class="nav__link${on('home')}" href="index.html">Home</a>
          <div class="nav__item">
            <a class="nav__link${on('brands')}" href="brands.html">Shop by Bike ${ICO.chevD}</a>
            <div class="mega">
              <div class="mega__grid">${brandLinks}</div>
              <div class="mega__foot">
                <p>Pick your brand → choose your model → see only the parts that fit it.</p>
                <a class="btn btn--sm btn--outline-red" href="brands.html">All Brands ${ICO.right}</a>
              </div>
            </div>
          </div>
          <a class="nav__link${on('products')}" href="products.html">All Parts</a>
          <a class="nav__link${on('deals')}" href="products.html?deals=1">Offers</a>
          <a class="nav__link${on('contact')}" href="index.html#contact">Contact</a>
        </nav>

        <form class="search" id="searchForm" role="search">
          <span class="search__ico">${ICO.search}</span>
          <input class="search__in" id="searchInput" type="search" autocomplete="off"
                 placeholder="Search part, SKU or bike — e.g. clutch cable Splendor">
        </form>

        <div class="hactions">
          <a class="iconbtn" href="products.html?wish=1" aria-label="Wishlist" title="Wishlist">
            ${ICO.heart}<span class="iconbtn__count" data-count="wish"></span>
          </a>
          <a class="iconbtn" href="admin/login.html" aria-label="Account" title="Dealer login">${ICO.user}</a>
          <a class="iconbtn" href="cart.html" aria-label="Cart" title="Cart">
            ${ICO.cart}<span class="iconbtn__count" data-count="cart"></span>
          </a>
        </div>
      </div>
    </header>

    <div class="mnav" id="mnav">
      <div class="mnav__scrim" data-close></div>
      <div class="mnav__panel">
        <div class="mnav__head">
          <a class="logo" href="index.html">
            <span class="logo__mark">${ICO.gear}</span>
            <span class="logo__txt"><span class="logo__name">Thirumalai</span></span>
          </a>
          <button class="iconbtn" data-close aria-label="Close">${ICO.x}</button>
        </div>
        <div class="mnav__body">
          <form class="search" id="mSearchForm" style="display:block;max-width:none;padding:14px 18px">
            <span class="search__ico" style="left:31px">${ICO.search}</span>
            <input class="search__in" id="mSearchInput" type="search" placeholder="Search parts…">
          </form>
          <a class="mnav__link" href="index.html">Home ${ICO.chevR}</a>
          <a class="mnav__link" href="products.html">All Parts ${ICO.chevR}</a>
          <a class="mnav__link" href="products.html?deals=1">Offers ${ICO.chevR}</a>
          <a class="mnav__link" href="cart.html">Cart ${ICO.chevR}</a>
          <div class="mnav__section">Shop by Bike Brand</div>
          ${BRANDS.map(b => `<a class="mnav__link" href="brand.html?b=${b.id}">
              <span style="color:${b.color}">${esc(b.name)}</span> ${ICO.chevR}</a>`).join('')}
          <div class="mnav__section">Shop by Category</div>
          ${CATEGORIES.map(c => `<a class="mnav__link" href="products.html?cat=${c.id}">
              ${esc(c.name)} ${ICO.chevR}</a>`).join('')}
        </div>
      </div>
    </div>`;
  },

  footerHTML() {
    return `
    <div class="hazard hazard--thin"></div>
    <footer class="footer">
      <div class="wrap footer__top">
        <div class="footer__about">
          <a class="logo" href="index.html">
            <span class="logo__mark">${ICO.gear}</span>
            <span class="logo__txt">
              <span class="logo__name">Thirumalai</span>
              <span class="logo__sub">Autospare World</span>
            </span>
          </a>
          <p>Two-wheeler spare parts since 2010. Genuine and OEM-grade components
             for every major Indian motorcycle and scooter — stocked, tested and
             shipped across India.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook">${ICO.fb}</a>
            <a href="#" aria-label="Instagram">${ICO.ig}</a>
            <a href="#" aria-label="WhatsApp">${ICO.wa}</a>
            <a href="#" aria-label="YouTube">${ICO.yt}</a>
          </div>
        </div>

        <div>
          <h6>Shop</h6>
          <ul class="footer__links">
            <li><a href="brands.html">Shop by Bike</a></li>
            <li><a href="products.html">All Spare Parts</a></li>
            <li><a href="products.html?deals=1">Today's Offers</a></li>
            <li><a href="products.html?cat=engine">Engine &amp; Oil</a></li>
            <li><a href="products.html?cat=brakes">Brake System</a></li>
            <li><a href="products.html?cat=tyres">Tyres &amp; Tubes</a></li>
          </ul>
        </div>

        <div>
          <h6>Brands</h6>
          <ul class="footer__links">
            ${BRANDS.slice(0, 6).map(b =>
              `<li><a href="brand.html?b=${b.id}">${esc(b.full)}</a></li>`).join('')}
          </ul>
        </div>

        <div>
          <h6>Support</h6>
          <ul class="footer__links">
            <li><a href="#">Fitment Guarantee</a></li>
            <li><a href="#">Shipping &amp; Delivery</a></li>
            <li><a href="#">7-Day Returns</a></li>
            <li><a href="#">Warranty Claims</a></li>
            <li><a href="#">Track Your Order</a></li>
            <li><a href="admin/login.html">Dealer Login</a></li>
          </ul>
        </div>

        <div id="contact">
          <h6>Reach Us</h6>
          <ul class="footer__contact">
            <li>${ICO.pin}<span>Kolumam Bus Stop Opposite,<br>Kolumam<br>Tamil Nadu, India</span></li>
            <li>${ICO.phone}<span><a href="tel:+919876543210">+91 98765 43210</a><br>
                <a href="tel:+914223456789">+91 422 345 6789</a></span></li>
            <li>${ICO.mail}<span><a href="mailto:parts@thirumalaiautospare.in">parts@thirumalaiautospare.in</a></span></li>
          </ul>
        </div>
      </div>

      <div class="wrap footer__bot">
        <span>© ${new Date().getFullYear()} Thirumalai Autospare World. All rights reserved.</span>
        <div class="paylogos">
          <span>UPI</span><span>VISA</span><span>MASTERCARD</span><span>RUPAY</span><span>NET BANKING</span><span>COD</span>
        </div>
        <span><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Refunds</a></span>
      </div>
    </footer>`;
  },

  syncCounts() {
    const c = Store.cartCount(), w = Store.wish().length;
    $$('[data-count="cart"]').forEach(e => { e.textContent = c || ''; e.dataset.n = c; });
    $$('[data-count="wish"]').forEach(e => { e.textContent = w || ''; e.dataset.n = w; });
  },

  mount() {
    const h = $('[data-shell="header"]');
    const f = $('[data-shell="footer"]');
    if (h) h.outerHTML = this.headerHTML();
    if (f) f.outerHTML = this.footerHTML();

    this.syncCounts();
    this.wire();
  },

  wire() {
    /* mobile nav */
    const mnav = $('#mnav');
    $('#burger')?.addEventListener('click', () => mnav.classList.add('is-open'));
    $$('[data-close]').forEach(b => b.addEventListener('click', () => mnav.classList.remove('is-open')));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') mnav?.classList.remove('is-open');
    });

    /* search → products page */
    const go = (input) => (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (q) location.href = 'products.html?q=' + encodeURIComponent(q);
    };
    const si = $('#searchInput'), mi = $('#mSearchInput');
    if (si) $('#searchForm').addEventListener('submit', go(si));
    if (mi) $('#mSearchForm').addEventListener('submit', go(mi));
    if (si && qp('q')) si.value = qp('q');

    /* global delegated actions: add-to-cart + wishlist */
    document.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      if (add) {
        e.preventDefault();
        Store.addToCart(add.dataset.add, 1);
        return;
      }
      const wish = e.target.closest('[data-wish]');
      if (wish) {
        e.preventDefault();
        const now = Store.toggleWish(wish.dataset.wish);
        wish.classList.toggle('is-on', now);
        const p = Catalog.get(wish.dataset.wish);
        toast(now ? 'Saved to wishlist' : 'Removed from wishlist', p ? p.shortName : '');
      }
    });

    this.observeReveal();
  },

  /* scroll-in animation */
  observeReveal() {
    const els = $$('.reveal:not(.is-in)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => en.target.classList.add('is-in'), i * 55);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    els.forEach(e => io.observe(e));
  }
};

/* ---------- Fitment finder (brand → model → go) ---------- */
function wireFinder(root) {
  const bSel = $('[data-finder="brand"]', root);
  const mSel = $('[data-finder="model"]', root);
  const btn  = $('[data-finder="go"]', root);
  if (!bSel || !mSel || !btn) return;

  bSel.innerHTML = `<option value="">Select brand</option>` +
    BRANDS.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('');

  const fillModels = () => {
    const list = bSel.value ? Catalog.modelsOf(bSel.value) : [];
    mSel.disabled = !list.length;
    mSel.innerHTML = `<option value="">${list.length ? 'Select model' : 'Choose a brand first'}</option>` +
      list.map(m => `<option value="${m.id}">${esc(m.name)} · ${m.cc}cc</option>`).join('');
  };

  bSel.addEventListener('change', fillModels);
  btn.addEventListener('click', () => {
    if (mSel.value) {
      Store.setGarage(mSel.value);
      location.href = `model.html?b=${bSel.value}&m=${mSel.value}`;
    } else if (bSel.value) {
      location.href = `brand.html?b=${bSel.value}`;
    } else {
      toast('Pick your bike first', 'Select a brand to continue', 'err');
    }
  });

  fillModels();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => Shell.mount());
