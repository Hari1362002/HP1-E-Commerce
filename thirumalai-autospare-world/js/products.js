/* ==========================================================================
   products.js — Full catalogue with faceted filtering
   URL params: q, brand, model, cat, maker, deals, wish, sort
   ========================================================================== */
(function () {

  const PAGE = 24;

  /* ---------------- state, seeded from the URL ---------------- */
  const S = {
    q:      qp('q'),
    brand:  qp('brand'),
    model:  qp('model'),
    cats:   qp('cat') ? [qp('cat')] : [],
    makers: [],
    maxPrice: 4000,
    stock:  false,
    deals:  qp('deals') === '1',
    wish:   qp('wish') === '1',
    sort:   qp('sort') === 'popular' ? 'pop' : (qp('sort') || 'pop'),
    limit:  PAGE
  };

  const MAKERS = [...new Set(Catalog.PARTS.map(p => p.maker))].sort();
  const PRICE_MAX = 4000;

  /* ---------------- build filter controls ---------------- */
  $('#fbrand').innerHTML = `<option value="">All brands</option>` +
    BRANDS.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('');

  $('#fcats').innerHTML = CATEGORIES.map(c => `
    <label class="fopt">
      <input type="checkbox" value="${c.id}" data-f="cat">
      ${esc(c.name)}
      <span class="fopt__n">${Catalog.partsOfCat(c.id).length}</span>
    </label>`).join('');

  $('#fmakers').innerHTML = MAKERS.map(m => `
    <label class="fopt">
      <input type="checkbox" value="${esc(m)}" data-f="maker">
      ${esc(m)}
      <span class="fopt__n">${Catalog.PARTS.filter(p => p.maker === m).length}</span>
    </label>`).join('');

  function fillModels() {
    const list = S.brand ? Catalog.modelsOf(S.brand) : MODELS;
    const sel = $('#fmodel');
    sel.disabled = false;
    sel.innerHTML = `<option value="">All models</option>` +
      list.map(m => `<option value="${m.id}">${esc(m.name)} · ${m.cc}cc</option>`).join('');
    sel.value = S.model;
  }

  /* reflect incoming URL state onto the controls */
  $('#fq').value = S.q;
  $('#fbrand').value = S.brand;
  fillModels();
  $('#sort').value = S.sort;
  $('#fdeal').checked = S.deals;
  $('#fwish').checked = S.wish;
  $$('[data-f="cat"]').forEach(c => { if (S.cats.includes(c.value)) c.checked = true; });

  /* if a model came in via the URL but no brand, back-fill the brand */
  if (S.model && !S.brand) {
    const m = Catalog.modelById[S.model];
    if (m) { S.brand = m.brand; $('#fbrand').value = m.brand; fillModels(); }
  }

  /* ---------------- filtering ---------------- */
  const SORTS = {
    pop:  (a, b) => (b.rating * 40 + b.reviews) - (a.rating * 40 + a.reviews),
    lo:   (a, b) => a.price - b.price,
    hi:   (a, b) => b.price - a.price,
    off:  (a, b) => b.offPct - a.offPct,
    rate: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    az:   (a, b) => a.shortName.localeCompare(b.shortName)
  };

  function results() {
    let list = Catalog.PARTS;

    if (S.q) {
      const words = S.q.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const hay = `${p.name} ${p.sku} ${p.maker} ${p.catName} ${p.modelName}`.toLowerCase();
        return words.every(w => hay.includes(w));
      });
    }
    /* fitSet/brandSet already account for universal parts and their
       only/exclude rules, so a scooter-only item never shows on a KTM */
    if (S.model)      list = list.filter(p => p.fitSet.has(S.model));
    else if (S.brand) list = list.filter(p => p.brandSet.has(S.brand));

    if (S.cats.length)   list = list.filter(p => S.cats.includes(p.cat));
    if (S.makers.length) list = list.filter(p => S.makers.includes(p.maker));
    if (S.maxPrice < PRICE_MAX) list = list.filter(p => p.price <= S.maxPrice);
    if (S.stock) list = list.filter(p => p.stock > 0);
    if (S.deals) list = list.filter(p => p.offPct >= 25);
    if (S.wish)  { const w = Store.wish(); list = list.filter(p => w.includes(p.id)); }

    return [...list].sort(SORTS[S.sort] || SORTS.pop);
  }

  /* ---------------- header copy ---------------- */
  function heading() {
    const crumbs = [{ label: 'Home', href: 'index.html' }];
    let kicker = 'PARTS CATALOGUE', title = 'All Spare Parts', lede =
      'The complete shelf — every part we stock, for every bike we cover. Use the filters to narrow it down.';

    if (S.wish) {
      kicker = 'SAVED ITEMS'; title = 'My Wishlist';
      lede = 'Parts you have saved for later. They stay here until you remove them.';
    } else if (S.deals) {
      kicker = 'PRICE DROP'; title = "This Week's Offers";
      lede = 'Everything currently marked down by 25% or more.';
    } else if (S.model) {
      const m = Catalog.modelById[S.model], b = Catalog.brandById[m.brand];
      kicker = `${b.full.toUpperCase()} · ${m.cc} CC`;
      title = `${b.name} ${m.name} Parts`;
      lede = `Confirmed fitments for the ${b.name} ${m.name} (${m.years}), plus universal items.`;
      crumbs.push({ label: 'Shop by Bike', href: 'brands.html' },
                  { label: b.name, href: `brand.html?b=${b.id}` },
                  { label: m.name, href: `model.html?b=${b.id}&m=${m.id}` });
    } else if (S.brand) {
      const b = Catalog.brandById[S.brand];
      kicker = b.full.toUpperCase(); title = `${b.name} Spare Parts`;
      lede = b.blurb;
      crumbs.push({ label: 'Shop by Bike', href: 'brands.html' }, { label: b.name });
    } else if (S.cats.length === 1) {
      const c = Catalog.catById[S.cats[0]];
      kicker = 'CATEGORY'; title = c.name; lede = `${c.blurb} — across every bike we cover.`;
    } else if (S.q) {
      kicker = 'SEARCH RESULTS'; title = `“${S.q}”`;
      lede = 'Matching parts from across the catalogue.';
    }

    crumbs.push({ label: title });
    $('#crumb').innerHTML = UI.crumb(crumbs);
    $('#kicker').textContent = kicker;
    $('#title').textContent = title;
    $('#lede').textContent = lede;
    document.title = `${title} — Thirumalai Autospare World`;
  }

  /* ---------------- active filter chips ---------------- */
  function chips() {
    const out = [];
    if (S.q)     out.push(['q', `“${S.q}”`]);
    if (S.brand) out.push(['brand', Catalog.brandById[S.brand].name]);
    if (S.model) out.push(['model', Catalog.modelById[S.model].name]);
    S.cats.forEach(c   => out.push(['cat:' + c, Catalog.catById[c].short]));
    S.makers.forEach(m => out.push(['maker:' + m, m]));
    if (S.stock) out.push(['stock', 'In stock']);
    if (S.deals) out.push(['deals', 'Offers']);
    if (S.wish)  out.push(['wish', 'Wishlist']);
    if (S.maxPrice < PRICE_MAX) out.push(['price', `Under ${money(S.maxPrice)}`]);

    $('#activeChips').innerHTML = out
      .map(([k, label]) => `<button class="chip is-on" data-drop="${esc(k)}">${esc(label)} ✕</button>`)
      .join('');
  }

  /* ---------------- render ---------------- */
  function draw() {
    const list = results();
    heading();
    chips();

    $('#count').textContent = list.length.toLocaleString('en-IN');

    if (!list.length) {
      $('#grid').innerHTML = '';
      $('#more').innerHTML = UI.empty(
        'No parts match those filters',
        S.wish ? 'Your wishlist is empty — tap the heart on any part to save it here.'
               : 'Try widening the price range, or clearing a filter or two.',
        `<button class="btn btn--primary" id="emptyClear">Clear All Filters</button>`);
      $('#emptyClear')?.addEventListener('click', clearAll);
      return;
    }

    const page = list.slice(0, S.limit);
    $('#grid').innerHTML = page.map(p => UI.partCard(p)).join('');

    $('#more').innerHTML = list.length > S.limit
      ? `<button class="btn btn--ghost btn--lg" id="loadMore">
           Load More · ${list.length - S.limit} remaining</button>`
      : `<p class="mono dim">Showing all ${list.length} results</p>`;

    $('#loadMore')?.addEventListener('click', () => { S.limit += PAGE; draw(); });
  }

  /* ---------------- events ---------------- */
  let qTimer;
  $('#fq').addEventListener('input', (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { S.q = e.target.value.trim(); S.limit = PAGE; draw(); }, 220);
  });

  $('#fbrand').addEventListener('change', (e) => {
    S.brand = e.target.value; S.model = ''; S.limit = PAGE;
    fillModels(); draw();
  });

  $('#fmodel').addEventListener('change', (e) => {
    S.model = e.target.value; S.limit = PAGE; draw();
  });

  $('#filters').addEventListener('change', (e) => {
    const box = e.target;
    if (box.dataset.f === 'cat') {
      S.cats = $$('[data-f="cat"]:checked').map(c => c.value);
    } else if (box.dataset.f === 'maker') {
      S.makers = $$('[data-f="maker"]:checked').map(c => c.value);
    } else if (box.id === 'fstock') S.stock = box.checked;
    else if (box.id === 'fdeal')    S.deals = box.checked;
    else if (box.id === 'fwish')    S.wish  = box.checked;
    else return;
    S.limit = PAGE; draw();
  });

  $('#fprice').addEventListener('input', (e) => {
    S.maxPrice = +e.target.value;
    $('#priceVal').textContent = S.maxPrice >= PRICE_MAX ? 'Any' : money(S.maxPrice);
    S.limit = PAGE;
    draw();
  });

  $('#sort').addEventListener('change', (e) => { S.sort = e.target.value; draw(); });

  /* remove a single filter via its chip */
  $('#activeChips').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-drop]');
    if (!chip) return;
    const k = chip.dataset.drop;

    if (k === 'q')          { S.q = ''; $('#fq').value = ''; }
    else if (k === 'brand') { S.brand = ''; S.model = ''; $('#fbrand').value = ''; fillModels(); }
    else if (k === 'model') { S.model = ''; $('#fmodel').value = ''; }
    else if (k === 'stock') { S.stock = false; $('#fstock').checked = false; }
    else if (k === 'deals') { S.deals = false; $('#fdeal').checked = false; }
    else if (k === 'wish')  { S.wish = false;  $('#fwish').checked = false; }
    else if (k === 'price') { S.maxPrice = PRICE_MAX; $('#fprice').value = PRICE_MAX; $('#priceVal').textContent = 'Any'; }
    else if (k.startsWith('cat:')) {
      const v = k.slice(4);
      S.cats = S.cats.filter(c => c !== v);
      $$('[data-f="cat"]').forEach(c => { if (c.value === v) c.checked = false; });
    } else if (k.startsWith('maker:')) {
      const v = k.slice(6);
      S.makers = S.makers.filter(m => m !== v);
      $$('[data-f="maker"]').forEach(c => { if (c.value === v) c.checked = false; });
    }
    S.limit = PAGE;
    draw();
  });

  function clearAll() {
    Object.assign(S, {
      q: '', brand: '', model: '', cats: [], makers: [],
      maxPrice: PRICE_MAX, stock: false, deals: false, wish: false, limit: PAGE
    });
    $('#fq').value = '';
    $('#fbrand').value = '';
    $('#fprice').value = PRICE_MAX;
    $('#priceVal').textContent = 'Any';
    $$('#filters input[type="checkbox"]').forEach(c => c.checked = false);
    fillModels();
    draw();
  }
  $('#clearFilters').addEventListener('click', clearAll);

  /* removing an item from the wishlist while viewing it should re-filter */
  document.addEventListener('click', (e) => {
    if (S.wish && e.target.closest('[data-wish]')) setTimeout(draw, 0);
  });

  draw();
})();
