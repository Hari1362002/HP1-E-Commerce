/* ==========================================================================
   admin-orders.js — Order list with expandable line items
   ========================================================================== */
(function () {
  if (!Admin.guard()) return;
  Admin.apply();
  Admin.mount('orders.html');

  const orders = Store.orders();

  if (!orders.length) {
    $('#page').innerHTML = UI.empty(
      'No orders yet',
      'Place an order on the storefront and it will show up here with its full line items.',
      `<a class="btn btn--primary" href="../products.html">Open Storefront</a>`);
    return;
  }

  const gross = orders.reduce((t, o) => t + o.total, 0);
  const units = orders.reduce((t, o) => t + o.items, 0);

  $('#page').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
                gap:14px;margin-bottom:26px">
      ${Admin.statCard('Orders', orders.length, 'All time')}
      ${Admin.statCard('Units Sold', units, 'Across all orders')}
      ${Admin.statCard('Gross Value', moneyShort(gross), 'Incl. GST and shipping', 'var(--green)')}
      ${Admin.statCard('Average Order', moneyShort(gross / orders.length), 'Per order')}
    </div>

    <div style="display:grid;gap:12px">
      ${orders.map(o => `
        <div class="card" style="overflow:hidden">
          <button style="width:100%;display:grid;
                         grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) auto auto auto;
                         gap:16px;align-items:center;padding:16px 18px;text-align:left"
                  data-toggle="${esc(o.id)}">
            <span>
              <b class="mono" style="display:block;font-size:.76rem;color:var(--red)">${esc(o.id)}</b>
              <span class="dim" style="font-size:.72rem">
                ${new Date(o.at).toLocaleString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}</span>
            </span>
            <span style="min-width:0">
              <b style="display:block;font-size:.85rem">${esc(o.name)}</b>
              <span class="dim" style="font-size:.72rem">${esc(o.city)} – ${esc(o.pin)}</span>
            </span>
            <span class="tag tag--grey">${o.items} items</span>
            <span class="tag ${o.pay === 'cod' ? 'tag--amber' : 'tag--green'}">${esc(o.payLabel)}</span>
            <b style="font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:800">
              ${money(o.total)}</b>
          </button>

          <div hidden data-panel="${esc(o.id)}"
               style="border-top:1px solid var(--line);padding:18px;background:var(--bg-2)">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:20px;margin-bottom:18px">
              <div>
                <span class="kicker" style="display:block;margin-bottom:7px">Deliver To</span>
                <p style="font-size:.85rem;line-height:1.6">
                  ${esc(o.name)}<br>${esc(o.addr)}<br>
                  ${esc(o.city)} – ${esc(o.pin)}<br>${esc(o.state)}<br>
                  <span class="mono dim">${esc(o.phone)}</span>
                  ${o.email ? `<br><span class="mono dim">${esc(o.email)}</span>` : ''}
                </p>
              </div>
              <div>
                <span class="kicker" style="display:block;margin-bottom:7px">Fulfilment</span>
                <p style="font-size:.85rem;line-height:1.6">
                  Payment: ${esc(o.payLabel)}<br>
                  Expected by: ${esc(o.eta)}<br>
                  Units: ${o.items}
                </p>
              </div>
            </div>
            <table class="spectable">
              <tr><th style="width:auto">SKU</th><th style="width:auto">Part</th>
                  <th style="width:auto">Qty</th><th style="width:auto">Rate</th>
                  <th style="width:auto">Amount</th></tr>
              ${o.lines.map(l => `<tr>
                <td class="mono" style="font-size:.68rem">${esc(l.sku)}</td>
                <td>${esc(l.name)}</td>
                <td>${l.qty}</td>
                <td>${money(l.price)}</td>
                <td><b>${money(l.price * l.qty)}</b></td>
              </tr>`).join('')}
            </table>
          </div>
        </div>`).join('')}
    </div>`;

  $('#page').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle]');
    if (!btn) return;
    const panel = $(`[data-panel="${CSS.escape(btn.dataset.toggle)}"]`);
    if (panel) panel.hidden = !panel.hidden;
  });
})();
