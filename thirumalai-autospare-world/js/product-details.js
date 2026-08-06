/* ==========================================================================
   product-details.js — Single part: gallery, fitment, specs, related
   ========================================================================== */
(function () {
  const part = Catalog.get(qp('p'));

  if (!part) {
    $('#page').innerHTML = `<section class="section"><div class="wrap">
      ${UI.empty('Part not found',
        'That SKU is not in the catalogue. Try a search or browse by your bike.',
        `<a class="btn btn--primary" href="products.html">Browse All Parts</a>`)}
    </div></section>`;
    return;
  }

  document.title = `${part.name} — Thirumalai Autospare World`;

  const fits     = Catalog.fitmentOf(part);
  const siblings = Catalog.siblingsOf(part);
  const related  = Catalog.relatedTo(part, 6);
  const saved    = Store.cart().find(i => i.id === part.id);
  const model    = part.model ? Catalog.modelById[part.model] : null;
  const brand    = model ? Catalog.brandById[model.brand] : null;

  const crumbs = [{ label: 'Home', href: 'index.html' }];
  if (brand && model) {
    crumbs.push({ label: 'Shop by Bike', href: 'brands.html' },
                { label: brand.name, href: `brand.html?b=${brand.id}` },
                { label: model.name, href: `model.html?b=${brand.id}&m=${model.id}` });
  } else {
    crumbs.push({ label: 'All Parts', href: 'products.html' });
  }
  crumbs.push({ label: part.catName, href: `products.html?cat=${part.cat}` },
              { label: part.shortName });

  /* four gallery angles from the same graphic — a stand-in for real photography */
  const views = ['Front', 'Side', 'Detail', 'Packed'];

  $('#page').innerHTML = `
    <section class="pagehead gridtex" style="padding-bottom:0;border-bottom:none">
      <div class="wrap">${UI.crumb(crumbs)}</div>
    </section>

    <section>
      <div class="wrap pdp">
        <!-- ---------- gallery ---------- -->
        <div class="pdp__gallery">
          <div class="pdp__main" id="mainPic">${UI.partPic(part)}</div>
          <div class="pdp__thumbs" id="thumbs">
            ${views.map((v, i) => `
              <button class="pdp__thumb ${i === 0 ? 'is-on' : ''}" data-view="${i}" title="${v} view">
                ${PartArt.render(part.art)}
              </button>`).join('')}
          </div>
        </div>

        <!-- ---------- buy box ---------- -->
        <div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span class="tag tag--grey">${part.sku}</span>
            <span class="tag tag--green">${esc(part.grade)}</span>
            ${part.offPct >= 25 ? `<span class="tag tag--red">${part.offPct}% off</span>` : ''}
            ${part.tags.includes('bestseller') ? `<span class="tag tag--amber">Bestseller</span>` : ''}
          </div>

          <h1 class="pdp__title">${esc(part.shortName)}</h1>

          <div class="pdp__meta">
            <span>${UI.stars(part.rating)} <b style="color:var(--txt)">${part.rating}</b>
                  (${part.reviews} reviews)</span>
            <span>Brand: <b style="color:var(--txt)">${esc(part.maker)}</b></span>
            <span>Fits: <b style="color:var(--txt)">${esc(part.modelName)}</b></span>
          </div>

          <div class="pdp__pricebox">
            <span class="price">${money(part.price)}</span>
            <span class="price--mrp">${money(part.mrp)}</span>
            <span class="price--off">Save ${money(part.mrp - part.price)} (${part.offPct}%)</span>
          </div>
          <p class="pdp__tax">Inclusive of all taxes · Free shipping on orders over ₹999</p>

          <div class="part-card__stock" style="margin-bottom:20px;font-size:.72rem">
            ${UI.stockLine(part.stock)}
            <span class="dim" style="margin-left:10px">· ${part.stock} units at Kolumam counter</span>
          </div>

          <div style="display:flex;gap:14px;align-items:center;margin-bottom:20px;flex-wrap:wrap">
            <div class="qty">
              <button id="qMinus" aria-label="Decrease quantity">${ICO.minus}</button>
              <input id="qty" type="number" value="${saved ? saved.qty : 1}" min="1"
                     max="${Math.max(part.stock, 1)}" aria-label="Quantity">
              <button id="qPlus" aria-label="Increase quantity">${ICO.plus}</button>
            </div>
            <span class="mono dim">Max ${part.stock} per order</span>
          </div>

          <div class="pdp__buy">
            <button class="btn btn--primary" id="addBtn" ${part.stock ? '' : 'disabled'}>
              ${ICO.cart} ${part.stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button class="btn btn--light" id="buyBtn" ${part.stock ? '' : 'disabled'}>Buy Now</button>
            <button class="btn btn--ghost" data-wish="${part.id}" id="wishBtn"
                    style="flex:0 0 52px;min-width:52px;padding:0">${ICO.heart}</button>
          </div>

          <!-- fitment -->
          <div class="fitbox">
            <div class="fitbox__head">${ICO.checkCircle}
              ${part.universal ? `Universal fit — suits ${fits.length} models we stock`
                               : `Confirmed fitment`}</div>
            <div class="fitbox__body">
              <p class="muted" style="font-size:.84rem;margin-bottom:12px">
                ${part.universal
                  ? 'This item is not model-specific. It fits every bike listed below.'
                  : `Made for the <b style="color:var(--txt)">${esc(part.modelName)}</b>
                     (${esc(model.years)}). If your bike is not listed, do not fit this part.`}
              </p>
              <div class="fitlist">
                ${fits.slice(0, 24).map(m => `
                  <a href="model.html?b=${m.brand}&m=${m.id}">
                    ${esc(Catalog.brandById[m.brand].name)} ${esc(m.name)}
                  </a>`).join('')}
                ${fits.length > 24 ? `<span class="mono dim" style="align-self:center">
                    +${fits.length - 24} more</span>` : ''}
              </div>
            </div>
          </div>

          <div class="feat-grid" style="grid-template-columns:1fr 1fr">
            <div class="feat" style="padding:16px">
              <span class="feat__ico">${ICO.shield}</span>
              <div><b>${esc(part.warranty)} Warranty</b><p>Against manufacturing defects</p></div>
            </div>
            <div class="feat" style="padding:16px">
              <span class="feat__ico">${ICO.refresh}</span>
              <div><b>7-Day Returns</b><p>Unfitted parts, original packing</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------- tabs ---------- -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="tabs" id="tabs">
          <button class="tab is-on" data-tab="desc">Description</button>
          <button class="tab" data-tab="spec">Specifications</button>
          <button class="tab" data-tab="fit">Fitment List (${fits.length})</button>
          <button class="tab" data-tab="ship">Shipping &amp; Returns</button>
        </div>
        <div id="tabBody"></div>
      </div>
    </section>

    ${siblings.length ? `
    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="section-head__l">
            <span class="section-head__num">SAME PART · OTHER BIKES</span>
            <h2>Need This For A Different Bike?</h2>
            <p>The same component, built for other models we stock.</p>
          </div>
        </div>
        <div class="part-grid reveal">
          ${siblings.slice(0, 6).map(p => UI.partCard(p)).join('')}
        </div>
      </div>
    </section>` : ''}

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="section-head__l">
            <span class="section-head__num">GOES WELL WITH</span>
            <h2>${model ? `More For The ${esc(model.name)}` : 'Related Parts'}</h2>
            <p>Commonly bought at the same time.</p>
          </div>
          ${model ? `<a class="section-head__link"
             href="model.html?b=${model.brand}&m=${model.id}">All ${esc(model.name)} Parts →</a>` : ''}
        </div>
        <div class="part-grid reveal">${related.map(p => UI.partCard(p)).join('')}</div>
      </div>
    </section>`;

  /* ---------------- tabs ---------------- */
  const TABS = {
    desc: () => `
      <div style="max-width:78ch">
        <p style="margin-bottom:18px">${esc(part.desc)}</p>
        <h4 style="margin-bottom:12px">What you get</h4>
        <ul style="display:grid;gap:9px;margin-bottom:22px">
          ${[
            `One ${part.shortName.toLowerCase()} as pictured, ${part.grade.toLowerCase()} quality`,
            `Manufactured by ${part.maker}`,
            `${part.warranty} warranty against manufacturing defects`,
            part.universal
              ? 'Universal fitment — verify dimensions against your existing part before fitting'
              : `Built specifically for the ${part.modelName}`,
            'Tax invoice with GST included in every consignment'
          ].map(t => `<li style="display:flex;gap:10px;align-items:flex-start;color:var(--txt-2)">
              <span style="color:var(--green);flex:none;width:16px">${ICO.check}</span>
              <span>${esc(t)}</span></li>`).join('')}
        </ul>
        <p class="dim" style="font-size:.84rem">
          Part numbers and vehicle references are shown for fitment identification only.
          All trademarks belong to their respective owners.
        </p>
      </div>`,

    spec: () => `
      <table class="spectable" style="max-width:720px">
        ${[
          ['SKU / Part No.', part.sku],
          ['Category', part.catName],
          ['Manufacturer', part.maker],
          ['Quality Grade', part.grade],
          ['Fits', part.modelName],
          ['Warranty', part.warranty],
          ['Shipping Weight', part.weight + ' kg'],
          ['HSN Code', part.hsn],
          ['Country of Origin', 'India'],
          ['Stock on Hand', part.stock + ' units'],
          ['MRP', money(part.mrp)],
          ['Our Price', money(part.price)]
        ].map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}
      </table>`,

    fit: () => `
      <p class="muted" style="margin-bottom:16px;max-width:70ch">
        This part is confirmed to fit the ${fits.length} model${fits.length > 1 ? 's' : ''}
        below. Click any bike to see its full parts list.
      </p>
      <div class="model-grid">${fits.slice(0, 12).map(m => UI.modelCard(m)).join('')}</div>
      ${fits.length > 12 ? `<p class="mono dim" style="margin-top:16px">
        + ${fits.length - 12} more models</p>` : ''}`,

    ship: () => `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;max-width:900px">
        ${[
          ['Dispatch', 'Orders confirmed before 4:00 PM leave our Kolumam counter the same working day. Later orders go out the next morning.'],
          ['Delivery', 'Tamil Nadu 1–2 days. South India 2–3 days. Rest of India 3–6 days. Every consignment carries a tracking number sent by SMS.'],
          ['Shipping Cost', 'Free above ₹999. Below that, a flat ₹79 applies. Cash on delivery adds ₹49 and is capped at ₹5,000 per order.'],
          ['Returns', 'Seven days from delivery for unfitted parts in original packing. Wrong fitment on our side means we pay the return freight both ways.'],
          ['Warranty Claims', `This part carries ${part.warranty}. Send the invoice and photographs to parts@thirumalaiautospare.in and we will arrange a replacement.`],
          ['Not Returnable', 'Electrical items that have been wired in, and fluids or oils once the seal is broken, cannot be taken back.']
        ].map(([h, b]) => `<div>
            <h4 style="margin-bottom:8px">${h}</h4>
            <p class="muted" style="font-size:.87rem">${b}</p>
          </div>`).join('')}
      </div>`
  };

  function showTab(key) {
    $$('#tabs .tab').forEach(t => t.classList.toggle('is-on', t.dataset.tab === key));
    $('#tabBody').innerHTML = TABS[key]();
  }
  $('#tabs').addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]');
    if (t) showTab(t.dataset.tab);
  });
  showTab('desc');

  /* ---------------- gallery thumbs ---------------- */
  $('#thumbs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-view]');
    if (!b) return;
    $$('#thumbs .pdp__thumb').forEach(t => t.classList.remove('is-on'));
    b.classList.add('is-on');
    const rot = [0, -8, 6, -3][+b.dataset.view];
    const svg = $('#mainPic').firstElementChild;
    if (svg) svg.style.transform = `rotate(${rot}deg) scale(${1 + Math.abs(rot) / 90})`;
  });
  $('#mainPic').firstElementChild.style.transition = 'transform .35s var(--ease)';

  /* ---------------- quantity + buy ---------------- */
  const qty = $('#qty');
  const clamp = () => {
    let v = parseInt(qty.value, 10);
    if (!Number.isFinite(v) || v < 1) v = 1;
    if (v > part.stock) { v = part.stock; toast('Stock limit reached', `${part.stock} available`, 'err'); }
    qty.value = v;
    return v;
  };
  $('#qMinus').addEventListener('click', () => { qty.value = Math.max(1, (+qty.value || 1) - 1); });
  $('#qPlus').addEventListener('click',  () => { qty.value = (+qty.value || 1) + 1; clamp(); });
  qty.addEventListener('change', clamp);

  $('#addBtn').addEventListener('click', () => Store.addToCart(part.id, clamp()));
  $('#buyBtn').addEventListener('click', () => {
    if (Store.addToCart(part.id, clamp())) location.href = 'checkout.html';
  });

  if (Store.isWished(part.id)) $('#wishBtn').classList.add('is-on');

  Shell.observeReveal();
})();
