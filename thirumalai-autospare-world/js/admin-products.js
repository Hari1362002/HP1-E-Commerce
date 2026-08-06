/* ==========================================================================
   admin-products.js — Inventory table with inline price / stock editing
   ========================================================================== */
(function () {
  if (!Admin.guard()) return;
  Admin.apply();
  Admin.mount('products.html');

  const PAGE = 40;
  const S = { q: '', brand: '', cat: '', stock: qp('filter') === 'low' ? 'low' : '', limit: PAGE };

  $('#brand').innerHTML = `<option value="">All brands</option>` +
    BRANDS.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('');
  $('#cat').innerHTML = `<option value="">All categories</option>` +
    CATEGORIES.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
  $('#stock').value = S.stock;

  function results() {
    const edits = Admin.overrides();
    let list = Catalog.PARTS;

    if (S.q) {
      const w = S.q.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const hay = `${p.name} ${p.sku} ${p.maker} ${p.catName} ${p.modelName}`.toLowerCase();
        return w.every(x => hay.includes(x));
      });
    }
    if (S.brand) list = list.filter(p => p.brandSet.has(S.brand));
    if (S.cat)   list = list.filter(p => p.cat === S.cat);
    if (S.stock === 'low')    list = list.filter(p => p.stock > 0 && p.stock <= 5);
    if (S.stock === 'out')    list = list.filter(p => p.stock === 0);
    if (S.stock === 'edited') list = list.filter(p => edits[p.sku]);

    return list;
  }

  function row(p, edited) {
    return `
      <tr data-sku="${p.sku}">
        <td style="width:52px;padding:8px 10px">
          <span class="cartrow__pic" style="width:38px">${UI.partPic(p)}</span>
        </td>
        <td style="width:auto">
          <a href="../product-details.html?p=${encodeURIComponent(p.id)}"
             style="font-weight:600;font-size:.85rem">${esc(p.shortName)}</a>
          <span class="dim" style="display:block;font-size:.72rem">
            ${esc(p.maker)} · ${esc(p.modelName)}</span>
        </td>
        <td class="mono" style="width:auto;font-size:.68rem">${p.sku}</td>
        <td style="width:auto"><span class="tag tag--grey">${esc(p.catName)}</span></td>
        <td class="mono dim" style="width:auto">${money(p.mrp)}</td>
        <td style="width:auto">
          <input type="number" value="${p.price}" min="1" max="${p.mrp}" data-price
                 style="width:92px;height:34px;padding:0 9px;background:var(--bg-2);
                        border:1px solid var(--line-2);border-radius:var(--r-xs);
                        font-family:'Roboto Mono',monospace;font-size:.78rem">
        </td>
        <td style="width:auto">
          <input type="number" value="${p.stock}" min="0" max="999" data-stock
                 style="width:78px;height:34px;padding:0 9px;background:var(--bg-2);
                        border:1px solid ${p.stock === 0 ? 'var(--red)' : p.stock <= 5 ? 'var(--amber)' : 'var(--line-2)'};
                        border-radius:var(--r-xs);font-family:'Roboto Mono',monospace;font-size:.78rem">
        </td>
        <td style="width:auto;white-space:nowrap">
          ${edited ? `<button class="linkbtn" data-reset>${ICO.refresh} Reset</button>`
                   : `<span class="dim mono" style="font-size:.64rem">—</span>`}
        </td>
      </tr>`;
  }

  function draw() {
    const list = results();
    const edits = Admin.overrides();
    $('#count').textContent = list.length.toLocaleString('en-IN');

    const page = list.slice(0, S.limit);
    $('#table').innerHTML = `
      <tr>
        <th style="width:52px"></th>
        <th style="width:auto">Part</th>
        <th style="width:auto">SKU</th>
        <th style="width:auto">Category</th>
        <th style="width:auto">MRP</th>
        <th style="width:auto">Selling Price</th>
        <th style="width:auto">Stock</th>
        <th style="width:auto"></th>
      </tr>
      ${page.map(p => row(p, !!edits[p.sku])).join('')}`;

    $('#more').innerHTML = list.length > S.limit
      ? `<button class="btn btn--ghost" id="loadMore">
           Load More · ${list.length - S.limit} remaining</button>`
      : (list.length ? `<p class="mono dim">Showing all ${list.length} SKUs</p>`
                     : `<p class="mono dim">No SKUs match those filters</p>`);

    $('#loadMore')?.addEventListener('click', () => { S.limit += PAGE; draw(); });
  }

  /* ---- filters ---- */
  let t;
  $('#q').addEventListener('input', e => {
    clearTimeout(t);
    t = setTimeout(() => { S.q = e.target.value.trim(); S.limit = PAGE; draw(); }, 200);
  });
  ['brand', 'cat', 'stock'].forEach(id =>
    $('#' + id).addEventListener('change', e => { S[id] = e.target.value; S.limit = PAGE; draw(); }));

  /* ---- inline edits ---- */
  $('#table').addEventListener('change', (e) => {
    const tr = e.target.closest('[data-sku]');
    if (!tr) return;
    const sku = tr.dataset.sku;
    const p = Catalog.get(sku);

    if (e.target.hasAttribute('data-price')) {
      const v = Math.max(1, Math.min(parseInt(e.target.value, 10) || p.price, p.mrp));
      Admin.setOverride(sku, { price: v });
      toast('Price updated', `${p.shortName} → ${money(v)}`);
    } else if (e.target.hasAttribute('data-stock')) {
      const v = Math.max(0, Math.min(parseInt(e.target.value, 10) || 0, 999));
      Admin.setOverride(sku, { stock: v });
      toast('Stock updated', `${p.shortName} → ${v} units`);
    } else return;

    draw();
  });

  $('#table').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-reset]');
    if (!btn) return;
    const sku = btn.closest('[data-sku]').dataset.sku;
    const o = Admin.overrides();
    delete o[sku];
    Store.write('taw_admin_overrides', o);
    toast('Edit reverted', sku);
    location.reload();          /* regenerate the SKU from its template */
  });

  $('#resetAll').addEventListener('click', () => {
    if (!Object.keys(Admin.overrides()).length) return toast('Nothing to reset', '', 'err');
    Admin.clearOverrides();
    toast('All edits reverted');
    location.reload();
  });

  draw();
})();
