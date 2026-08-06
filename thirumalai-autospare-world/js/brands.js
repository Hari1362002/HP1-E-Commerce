/* ==========================================================================
   brands.js — All brands, each with its full model line-up
   ========================================================================== */
(function () {

  $('#crumb').outerHTML = UI.crumb([
    { label: 'Home', href: 'index.html' },
    { label: 'Shop by Bike' }
  ]);

  $('#finderIco').innerHTML = ICO.bike;
  wireFinder($('#finder'));

  $('#brandSections').innerHTML = BRANDS.map((b, i) => {
    const models = Catalog.modelsOf(b.id);
    const parts  = models.reduce((n, m) => n + Catalog.countOf(m.id), 0);

    return `
      <section class="section ${i % 2 ? 'section--alt' : ''}" id="${b.id}">
        <div class="wrap">
          <div class="section-head reveal">
            <div class="section-head__l">
              <span class="section-head__num" style="color:${b.color}">
                ${String(i + 1).padStart(2, '0')} / ${esc(b.full.toUpperCase())}
              </span>
              <h2>${esc(b.name)}</h2>
              <p>${esc(b.blurb)}</p>
            </div>
            <a class="section-head__link" href="brand.html?b=${b.id}">
              ${models.length} Models · ${parts.toLocaleString('en-IN')} Parts →
            </a>
          </div>
          <div class="model-grid reveal">
            ${models.map(m => UI.modelCard(m)).join('')}
          </div>
        </div>
      </section>`;
  }).join('');

  Shell.observeReveal();
})();
