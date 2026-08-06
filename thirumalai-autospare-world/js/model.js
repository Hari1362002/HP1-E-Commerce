/* ==========================================================================
   model.js — One bike model: specs + every part that fits it,
   grouped by category with live filtering.
   ========================================================================== */
(function () {
  const model = Catalog.modelById[qp('m')];

  if (!model) {
    $('#page').innerHTML = `<section class="section"><div class="wrap">
      ${UI.empty('Bike not found',
        'We could not find that model. Pick your bike from the full list.',
        `<a class="btn btn--primary" href="brands.html">Shop by Bike</a>`)}
    </div></section>`;
    return;
  }

  const brand = Catalog.brandById[model.brand];
  const parts = Catalog.partsOf(model.id);

  document.title = `${brand.name} ${model.name} Spare Parts — Thirumalai Autospare World`;

  /* categories actually present for this bike, in catalogue order */
  const cats = CATEGORIES
    .map(c => ({ ...c, list: parts.filter(p => p.cat === c.id) }))
    .filter(c => c.list.length);

  const inStock = parts.filter(p => p.stock > 0).length;
  const cheapest = parts.reduce((a, p) => Math.min(a, p.price), Infinity);

  /* ---------------- render ---------------- */
  $('#page').innerHTML = `
    <section class="pagehead gridtex">
      <div class="wrap">
        ${UI.crumb([
          { label: 'Home', href: 'index.html' },
          { label: 'Shop by Bike', href: 'brands.html' },
          { label: brand.name, href: `brand.html?b=${brand.id}` },
          { label: model.name }
        ])}

        <div class="mbanner">
          <div class="mbanner__pic">${UI.bikePic(model)}</div>
          <div>
            <span class="section-head__num" style="color:${brand.color}">
              ${esc(brand.full.toUpperCase())} · ${model.cc} CC · ${model.kind.toUpperCase()}
            </span>
            <h1>${esc(model.name)}</h1>
            <p class="mbanner__lede">
              Every part below is confirmed to fit the ${esc(brand.name)} ${esc(model.name)}
              (${esc(model.years)}). ${parts.length} line items across ${cats.length}
              categories, ${inStock} of them in stock right now.
            </p>

            <div class="specs specs--4">
              <div class="spec"><span>Engine</span><b>${model.cc} cc</b></div>
              <div class="spec"><span>Max Power</span><b>${esc(model.power)}</b></div>
              <div class="spec"><span>Torque</span><b>${esc(model.torque)}</b></div>
              <div class="spec"><span>Mileage</span><b>${esc(model.mileage)}</b></div>
              <div class="spec"><span>Front Brake</span><b>${model.brake === 'disc' ? 'Disc' : 'Drum'}</b></div>
              <div class="spec"><span>Front Tyre</span><b>${esc(model.tyreF)}</b></div>
              <div class="spec"><span>Rear Tyre</span><b>${esc(model.tyreR)}</b></div>
              <div class="spec"><span>Parts From</span><b>${money(cheapest)}</b></div>
            </div>

            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <button class="btn btn--primary" id="saveBike">${ICO.bike} Save As My Bike</button>
              <a class="btn btn--ghost" href="#parts">Browse ${parts.length} Parts</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="hazard hazard--thin"
         style="background-image:repeating-linear-gradient(-45deg,${brand.color} 0 10px,#0A0B0C 10px 20px)"></div>

    <section class="section" id="parts">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head__l">
            <span class="section-head__num">PARTS CATALOGUE</span>
            <h2>Fits Your ${esc(model.name)}</h2>
            <p>Filter by system, or scroll the full list. Universal items that suit any
               bike are included and marked as such.</p>
          </div>
          <a class="section-head__link" href="products.html?model=${model.id}">Open In Full Catalogue →</a>
        </div>

        <div class="toolbar">
          <span class="toolbar__count"><b id="shown">${parts.length}</b> of ${parts.length} parts</span>
          <div class="chiprow" id="catChips">
            <button class="chip is-on" data-cat="all">All Parts</button>
            ${cats.map(c => `<button class="chip" data-cat="${c.id}">${esc(c.short)} (${c.list.length})</button>`).join('')}
          </div>
          <div class="field" style="min-width:170px">
            <select id="sort" aria-label="Sort parts">
              <option value="pop">Sort: Popular</option>
              <option value="lo">Price: Low to High</option>
              <option value="hi">Price: High to Low</option>
              <option value="off">Biggest Discount</option>
              <option value="az">Name: A–Z</option>
            </select>
          </div>
        </div>

        <div id="catBlocks"></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="section-head__l">
            <span class="section-head__num">SAME STABLE</span>
            <h2>Other ${esc(brand.name)} Models</h2>
            <p>Looking after more than one bike? Jump straight across.</p>
          </div>
          <a class="section-head__link" href="brand.html?b=${brand.id}">All ${esc(brand.name)} →</a>
        </div>
        <div class="model-grid reveal">
          ${Catalog.modelsOf(brand.id).filter(m => m.id !== model.id).slice(0, 4)
            .map(m => UI.modelCard(m)).join('')}
        </div>
      </div>
    </section>`;

  /* ---------------- filtering + sorting ---------------- */
  const SORTS = {
    pop: (a, b) => (b.rating * 40 + b.reviews) - (a.rating * 40 + a.reviews),
    lo:  (a, b) => a.price - b.price,
    hi:  (a, b) => b.price - a.price,
    off: (a, b) => b.offPct - a.offPct,
    az:  (a, b) => a.shortName.localeCompare(b.shortName)
  };

  let activeCat = 'all';
  let activeSort = 'pop';

  function draw() {
    const groups = (activeCat === 'all' ? cats : cats.filter(c => c.id === activeCat));
    let total = 0;

    $('#catBlocks').innerHTML = groups.map(c => {
      const list = [...c.list].sort(SORTS[activeSort]);
      total += list.length;
      return `
        <div style="margin-bottom:38px">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
            <h3 style="font-size:1.3rem">${esc(c.name)}</h3>
            <span class="mono dim">${list.length} ITEMS</span>
            <span style="flex:1;height:1px;background:var(--line)"></span>
            <a class="section-head__link" style="font-size:.82rem"
               href="products.html?model=${model.id}&cat=${c.id}">View all →</a>
          </div>
          <div class="part-grid">${list.map(p => UI.partCard(p)).join('')}</div>
        </div>`;
    }).join('');

    $('#shown').textContent = total;
  }

  $('#catChips').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    $$('#catChips .chip').forEach(c => c.classList.remove('is-on'));
    chip.classList.add('is-on');
    activeCat = chip.dataset.cat;
    draw();
  });

  $('#sort').addEventListener('change', (e) => { activeSort = e.target.value; draw(); });

  /* ---------------- my-bike ---------------- */
  const saveBtn = $('#saveBike');
  const refreshSaveBtn = () => {
    const saved = Store.garage() === model.id;
    saveBtn.innerHTML = saved
      ? `${ICO.checkCircle} Saved As My Bike`
      : `${ICO.bike} Save As My Bike`;
    saveBtn.classList.toggle('btn--primary', !saved);
    saveBtn.classList.toggle('btn--outline-red', saved);
  };
  saveBtn.addEventListener('click', () => {
    const saved = Store.garage() === model.id;
    Store.setGarage(saved ? null : model.id);
    toast(saved ? 'Removed from your garage' : 'Saved to your garage',
          `${brand.name} ${model.name}`);
    refreshSaveBtn();
  });
  refreshSaveBtn();

  draw();
  Shell.observeReveal();
})();
