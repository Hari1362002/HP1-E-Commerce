/* ==========================================================================
   admin-dashboard.js — Catalogue, stock and order overview
   ========================================================================== */
(function () {
  if (!Admin.guard()) return;
  Admin.apply();
  Admin.mount('dashboard.html');

  const parts   = Catalog.PARTS;
  const orders  = Store.orders();
  const out     = parts.filter(p => p.stock === 0);
  const low     = parts.filter(p => p.stock > 0 && p.stock <= 5);
  const value   = parts.reduce((t, p) => t + p.price * p.stock, 0);
  const revenue = orders.reduce((t, o) => t + o.total, 0);

  /* units sold per SKU, from placed orders */
  const sold = {};
  orders.forEach(o => o.lines.forEach(l => { sold[l.sku] = (sold[l.sku] || 0) + l.qty; }));
  const top = Object.entries(sold)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([sku, qty]) => ({ part: Catalog.get(sku), qty }))
    .filter(r => r.part);

  /* stock split by category, for the bar chart */
  const byCat = CATEGORIES.map(c => {
    const list = parts.filter(p => p.cat === c.id);
    return {
      name: c.short,
      units: list.reduce((t, p) => t + p.stock, 0),
      skus: list.length
    };
  }).sort((a, b) => b.units - a.units);
  const maxUnits = Math.max(...byCat.map(c => c.units), 1);

  $('#page').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
                gap:14px;margin-bottom:26px">
      ${Admin.statCard('Catalogue SKUs', parts.length.toLocaleString('en-IN'),
        `${MODELS.length} models · ${BRANDS.length} brands`)}
      ${Admin.statCard('Stock Value', moneyShort(value), 'At current selling price')}
      ${Admin.statCard('Low Stock', low.length, '5 units or fewer', 'var(--amber)')}
      ${Admin.statCard('Out of Stock', out.length, 'Needs reordering', 'var(--red)')}
      ${Admin.statCard('Orders', orders.length, 'Placed on this device')}
      ${Admin.statCard('Order Value', moneyShort(revenue), 'Gross, incl. GST', 'var(--green)')}
    </div>

    <div style="display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);
                gap:18px;align-items:start" class="dash-split">

      <!-- stock by category -->
      <div class="card" style="padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px">
          <h4>Stock by Category</h4>
          <span class="mono dim">UNITS ON HAND</span>
        </div>
        <div style="display:grid;gap:13px">
          ${byCat.map(c => `
            <div>
              <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px">
                <span>${esc(c.name)} <span class="dim mono" style="font-size:.62rem">
                  ${c.skus} SKU</span></span>
                <b class="mono" style="font-size:.74rem">${c.units.toLocaleString('en-IN')}</b>
              </div>
              <div style="height:7px;background:var(--panel-3);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${(c.units / maxUnits * 100).toFixed(1)}%;
                            background:linear-gradient(90deg,var(--red),var(--red-hi));
                            border-radius:4px"></div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- needs attention -->
      <div class="card" style="padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px">
          <h4>Needs Reordering</h4>
          <a class="section-head__link" style="font-size:.78rem" href="products.html?filter=low">
            Inventory →</a>
        </div>
        ${(out.concat(low)).length ? `
          <div style="display:grid;gap:11px;max-height:400px;overflow-y:auto">
            ${out.concat(low).slice(0, 14).map(p => `
              <div style="display:grid;grid-template-columns:34px minmax(0,1fr) auto;
                          gap:11px;align-items:center">
                <span class="cartrow__pic" style="width:34px">${UI.partPic(p)}</span>
                <span style="min-width:0">
                  <a href="../product-details.html?p=${encodeURIComponent(p.id)}"
                     style="display:block;font-size:.8rem;font-weight:600;line-height:1.3;
                            white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                    ${esc(p.shortName)}</a>
                  <span class="mono dim" style="font-size:.6rem">${p.sku}</span>
                </span>
                <span class="tag ${p.stock ? 'tag--amber' : 'tag--red'}">
                  ${p.stock ? p.stock + ' left' : 'Nil'}</span>
              </div>`).join('')}
          </div>
          ${out.concat(low).length > 14
            ? `<p class="mono dim" style="margin-top:12px;font-size:.66rem">
                 + ${out.concat(low).length - 14} more</p>` : ''}`
          : `<p class="muted" style="font-size:.86rem">Everything is well stocked.</p>`}
      </div>
    </div>

    <!-- best sellers from real orders -->
    <div class="card" style="padding:22px;margin-top:18px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px">
        <h4>Top Sellers</h4>
        <span class="mono dim">FROM PLACED ORDERS</span>
      </div>
      ${top.length ? `
        <table class="spectable">
          <tr><th>Part</th><th style="width:auto">SKU</th>
              <th style="width:auto">Units</th><th style="width:auto">Value</th></tr>
          ${top.map(r => `<tr>
            <td>${esc(r.part.shortName)}</td>
            <td class="mono">${r.part.sku}</td>
            <td><b>${r.qty}</b></td>
            <td>${money(r.qty * r.part.price)}</td>
          </tr>`).join('')}
        </table>`
        : `<p class="muted" style="font-size:.86rem">
             No orders yet. Place one on the storefront and it will appear here.</p>`}
    </div>

    <!-- recent orders -->
    <div class="card" style="padding:22px;margin-top:18px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px">
        <h4>Recent Orders</h4>
        <a class="section-head__link" style="font-size:.78rem" href="orders.html">All Orders →</a>
      </div>
      ${orders.length ? `
        <div style="overflow-x:auto">
          <table class="spectable" style="min-width:640px">
            <tr><th style="width:auto">Order</th><th style="width:auto">Customer</th>
                <th style="width:auto">Items</th><th style="width:auto">Payment</th>
                <th style="width:auto">Total</th></tr>
            ${orders.slice(0, 8).map(o => `<tr>
              <td class="mono">${esc(o.id)}</td>
              <td>${esc(o.name)}<br><span class="dim" style="font-size:.74rem">
                ${esc(o.city)} – ${esc(o.pin)}</span></td>
              <td>${o.items}</td>
              <td>${esc(o.payLabel)}</td>
              <td><b>${money(o.total)}</b></td>
            </tr>`).join('')}
          </table>
        </div>`
        : `<p class="muted" style="font-size:.86rem">No orders on this device yet.</p>`}
    </div>`;
})();
