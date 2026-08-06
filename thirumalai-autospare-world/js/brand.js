/* ==========================================================================
   brand.js — One brand: its models, grouped by body style
   ========================================================================== */
(function () {
  const brand = Catalog.brandById[qp('b')];

  if (!brand) {
    $('#page').innerHTML = `<section class="section"><div class="wrap">
      ${UI.empty('Brand not found',
        'That brand is not in our catalogue. Browse the full list instead.',
        `<a class="btn btn--primary" href="brands.html">All Brands</a>`)}
    </div></section>`;
    return;
  }

  document.title = `${brand.full} Spare Parts — Thirumalai Autospare World`;

  const models = Catalog.modelsOf(brand.id);
  const parts  = models.reduce((n, m) => n + Catalog.countOf(m.id), 0);

  /* group by body style, in a sensible order */
  const ORDER = ['commuter', 'sport', 'cruiser', 'adventure', 'scooter'];
  const LABEL = {
    commuter: 'Commuter Motorcycles', sport: 'Sports & Street',
    cruiser: 'Cruisers & Roadsters', adventure: 'Adventure & Touring',
    scooter: 'Scooters'
  };
  const groups = ORDER
    .map(k => ({ kind: k, list: models.filter(m => m.kind === k) }))
    .filter(g => g.list.length);

  $('#page').innerHTML = `
    <section class="pagehead gridtex">
      <div class="wrap">
        ${UI.crumb([
          { label: 'Home', href: 'index.html' },
          { label: 'Shop by Bike', href: 'brands.html' },
          { label: brand.name }
        ])}
        <div style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:24px;justify-content:space-between">
          <div>
            <span class="section-head__num" style="color:${brand.color}">
              ${esc(brand.full.toUpperCase())} · EST. ${brand.since}
            </span>
            <h1 style="margin:6px 0 12px">${esc(brand.name)} Spare Parts</h1>
            <p class="muted" style="max-width:62ch">${esc(brand.blurb)}</p>
          </div>
          <div class="specs specs--3" style="margin:0;min-width:280px;flex:0 1 340px">
            <div class="spec"><span>Models</span><b>${models.length}</b></div>
            <div class="spec"><span>Parts</span><b>${parts.toLocaleString('en-IN')}</b></div>
            <div class="spec"><span>Since</span><b>${brand.since}</b></div>
          </div>
        </div>
      </div>
    </section>

    <div class="hazard hazard--thin" style="background-image:repeating-linear-gradient(-45deg,${brand.color} 0 10px,#0A0B0C 10px 20px)"></div>

    ${groups.map((g, i) => `
      <section class="section ${i % 2 ? 'section--alt' : ''}">
        <div class="wrap">
          <div class="section-head reveal">
            <div class="section-head__l">
              <span class="section-head__num" style="color:${brand.color}">
                ${String(i + 1).padStart(2, '0')} / ${g.kind.toUpperCase()}
              </span>
              <h2>${LABEL[g.kind]}</h2>
              <p>Click a bike to see every part confirmed to fit that exact model.</p>
            </div>
            <span class="section-head__link" style="pointer-events:none">
              ${g.list.length} Model${g.list.length > 1 ? 's' : ''}
            </span>
          </div>
          <div class="model-grid reveal">
            ${g.list.map(m => UI.modelCard(m)).join('')}
          </div>
        </div>
      </section>`).join('')}

    <section class="section ${groups.length % 2 ? 'section--alt' : ''}">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="section-head__l">
            <span class="section-head__num">ALSO STOCKED</span>
            <h2>Other Brands</h2>
            <p>Ride something else? We carry these too.</p>
          </div>
        </div>
        <div class="brand-grid reveal">
          ${BRANDS.filter(b => b.id !== brand.id).map(b => UI.brandTile(b)).join('')}
        </div>
      </div>
    </section>`;

  Shell.observeReveal();
})();
