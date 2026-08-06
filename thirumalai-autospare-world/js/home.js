/* ==========================================================================
   home.js — Landing page
   ========================================================================== */
(function () {

  /* ---- hero artwork ---- */
  $('#heroBike').innerHTML = BikeArt.render('sport', '#E11B22');
  $('#finderIco').innerHTML = ICO.bike;

  /* ---- live counts ---- */
  $('#statParts').textContent  = Catalog.PARTS.length.toLocaleString('en-IN') + '+';
  $('#statModels').textContent = MODELS.length + '+';
  $('#statYears').textContent  = new Date().getFullYear() - 2010;   /* trading since 2010 */

  /* ---- marquee ---- */
  const lines = [
    'Engine Oil', 'Clutch Cable', 'Brake Pads', 'Chain Sprocket Kit', 'Air Filter',
    'Spark Plug', 'Battery', 'Shock Absorber', 'Headlight Assembly', 'Tyres & Tubes',
    'CVT Belt', 'Wheel Bearing', 'Side Mirror', 'Piston Kit'
  ];
  const row = lines.map(t => `<span>${t}</span>`).join('');
  $('#marquee').innerHTML = row + row;   // duplicated for a seamless loop

  /* ---- fitment finder ---- */
  wireFinder($('#finder'));

  /* ---- brands ---- */
  $('#brandGrid').innerHTML = BRANDS.map(b => UI.brandTile(b)).join('');

  /* ---- popular models (a spread across brands and body styles) ---- */
  const popularIds = [
    'splendor-plus', 'activa-6g', 'pulsar-150', 'classic-350',
    'r15-v4', 'apache-rtr-160-4v', 'access-125', 'duke-390'
  ];
  $('#popularModels').innerHTML = popularIds
    .map(id => Catalog.modelById[id])
    .filter(Boolean)
    .map(m => UI.modelCard(m))
    .join('');

  /* ---- categories ---- */
  $('#catGrid').innerHTML = CATEGORIES.map(c => UI.catTile(c)).join('');

  /* ---- bestsellers ---- */
  $('#bestGrid').innerHTML = Catalog.bestSellers(6).map(p => UI.partCard(p)).join('');

  /* ---- deals ---- */
  $('#dealGrid').innerHTML = Catalog.deals(6).map(p => UI.partCard(p)).join('');

  /* ---- why-us strip ---- */
  const feats = [
    [ICO.checkCircle, 'Fitment Guarantee', 'Every part is listed against the exact model it fits. Wrong fit, we take it back and pay the return freight.'],
    [ICO.truck,       '24-Hour Dispatch',  'Orders placed before 4 PM leave the same working day. All-India courier with tracking on every consignment.'],
    [ICO.shield,      'Genuine & OEM Grade','Bosch, NGK, Exide, MRF, Rolon, TVS Girling and more — sourced through authorised channels only.'],
    [ICO.refresh,     '7-Day Returns',     'Unfitted parts in original packing can go back within seven days. No arguments, no restocking fee.']
  ];
  $('#featGrid').innerHTML = feats.map(([ico, title, body]) => `
    <div class="feat">
      <span class="feat__ico">${ico}</span>
      <div><b>${title}</b><p>${body}</p></div>
    </div>`).join('');

  /* reveal newly injected content */
  Shell.observeReveal();
})();
