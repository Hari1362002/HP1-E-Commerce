/* ==========================================================================
   cart.js — Cart review: quantities, coupon, totals, suggestions
   ========================================================================== */
(function () {

  $('#crumb').innerHTML = UI.crumb([
    { label: 'Home', href: 'index.html' },
    { label: 'Cart' }
  ]);

  function summaryHTML(q) {
    const gap = q.freeShipGap;
    return `
      <div class="summary">
        <div class="summary__head"><h4>Order Summary</h4></div>
        <div class="summary__body">
          <div class="srow"><span>Subtotal (${q.items} item${q.items > 1 ? 's' : ''})</span><b>${money(q.subtotal)}</b></div>
          ${q.savedOnMrp > 0 ? `<div class="srow"><span>Saving vs MRP</span>
            <b style="color:var(--green)">− ${money(q.savedOnMrp)}</b></div>` : ''}
          ${q.discount > 0 ? `<div class="srow"><span>Coupon ${esc(q.code)}</span>
            <b style="color:var(--green)">− ${money(q.discount)}</b></div>` : ''}
          <div class="srow"><span>Shipping</span>
            <b>${q.shipping ? money(q.shipping) : '<span style="color:var(--green)">FREE</span>'}</b></div>
          <div class="srow"><span class="dim" style="font-size:.78rem">Includes GST @ 18%</span>
            <span class="dim" style="font-size:.78rem">${money(q.gst)}</span></div>

          <div class="coupon">
            <input id="couponIn" placeholder="Coupon code" value="${esc(q.code || '')}"
                   aria-label="Coupon code">
            <button class="btn btn--ghost btn--sm" id="couponBtn"
                    style="height:42px">${q.code ? 'Remove' : 'Apply'}</button>
          </div>
          ${q.code && q.discount === 0 && q.coupon
            ? `<p class="mono" style="color:var(--amber);font-size:.68rem;margin:-8px 0 12px">
                 Needs a minimum order of ${money(q.coupon.min)}</p>` : ''}
          ${!q.code ? `<p class="mono dim" style="font-size:.66rem;margin:-8px 0 12px">
              Try RIDE10 · FIRST500 · SERVICE20</p>` : ''}

          ${gap > 0 ? `<div style="padding:11px 13px;background:var(--amber-dim);
              border:1px solid rgba(255,176,32,.28);border-radius:var(--r-xs);
              margin-bottom:16px;font-size:.79rem;color:var(--amber)">
              Add ${money(gap)} more for free shipping</div>` : ''}

          <div class="srow srow--total"><span>Total</span><b>${money(q.total)}</b></div>

          <a class="btn btn--primary btn--block" href="checkout.html"
             style="margin-top:18px;height:50px">Proceed to Checkout ${ICO.right}</a>
          <a class="btn btn--ghost btn--block" href="products.html"
             style="margin-top:10px">Continue Shopping</a>

          <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line);
                      display:grid;gap:9px">
            ${[[ICO.shield, 'Secure checkout'], [ICO.truck, 'Dispatch within 24 hours'],
               [ICO.refresh, '7-day returns on unfitted parts']]
              .map(([i, t]) => `<span style="display:flex;gap:9px;align-items:center;
                    font-size:.78rem;color:var(--txt-3)">
                    <span style="width:15px;color:var(--green)">${i}</span>${t}</span>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function rowHTML(line) {
    const p = line.part;
    return `
      <div class="cartrow" data-row="${p.id}">
        <a class="cartrow__pic" href="product-details.html?p=${encodeURIComponent(p.id)}">
          ${UI.partPic(p)}
        </a>
        <div>
          <a class="cartrow__name" href="product-details.html?p=${encodeURIComponent(p.id)}">
            ${esc(p.shortName)}
          </a>
          <div class="cartrow__sku">${p.sku} · ${esc(p.maker)} · ${esc(p.modelName)}</div>
          <div class="cartrow__ctl">
            <div class="qty" style="height:38px">
              <button data-step="-1" data-id="${p.id}" aria-label="Decrease">${ICO.minus}</button>
              <input type="number" value="${line.qty}" min="1" max="${p.stock}"
                     data-qty="${p.id}" aria-label="Quantity">
              <button data-step="1" data-id="${p.id}" aria-label="Increase">${ICO.plus}</button>
            </div>
            <span class="mono dim">${money(p.price)} each</span>
            ${line.qty >= p.stock ? `<span class="tag tag--amber">Max stock</span>` : ''}
          </div>
        </div>
        <div class="cartrow__right">
          <div class="cartrow__line">${money(p.price * line.qty)}</div>
          <button class="linkbtn" data-remove="${p.id}">${ICO.trash} Remove</button>
        </div>
      </div>`;
  }

  function draw() {
    const q = Pricing.quote();

    if (!q.items) {
      $('#lede').textContent = 'Nothing here yet.';
      $('#cartWrap').innerHTML = UI.empty(
        'Your cart is empty',
        'Pick your bike and we will show you the parts that fit it — or browse the full catalogue.',
        `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
           <a class="btn btn--primary" href="brands.html">Shop by Your Bike</a>
           <a class="btn btn--ghost" href="products.html">Browse All Parts</a>
         </div>`);
      $('#suggestSection').hidden = true;
      return;
    }

    $('#lede').textContent =
      `${q.items} item${q.items > 1 ? 's' : ''} ready to go. Check the quantities and head to checkout.`;

    $('#cartWrap').innerHTML = `
      <div class="cart-layout">
        <div>
          ${q.lines.map(rowHTML).join('')}
          <button class="linkbtn" id="clearCart" style="margin-top:8px">${ICO.trash} Empty cart</button>
        </div>
        ${summaryHTML(q)}
      </div>`;

    /* suggestions: other parts for the bikes already in the cart */
    const seed = q.lines.map(l => l.part).find(p => p.model);
    const inCart = new Set(q.lines.map(l => l.id));
    const picks = (seed ? Catalog.relatedTo(seed, 12) : Catalog.bestSellers(12))
      .filter(p => !inCart.has(p.id)).slice(0, 6);

    $('#suggestSection').hidden = !picks.length;
    $('#suggest').innerHTML = picks.map(p => UI.partCard(p)).join('');
  }

  /* Delegated once on the stable container — draw() only swaps its innerHTML. */
  function wire() {
    $('#cartWrap').addEventListener('click', (e) => {
      const step = e.target.closest('[data-step]');
      if (step) {
        const id = step.dataset.id;
        const cur = Store.cart().find(i => i.id === id);
        Store.setQty(id, (cur ? cur.qty : 0) + (+step.dataset.step));
        return draw();
      }
      const rm = e.target.closest('[data-remove]');
      if (rm) {
        const p = Catalog.get(rm.dataset.remove);
        Store.removeFromCart(rm.dataset.remove);
        toast('Removed from cart', p ? p.shortName : '');
        return draw();
      }
      if (e.target.closest('#clearCart')) {
        Store.clearCart();
        toast('Cart emptied');
        return draw();
      }
      const cb = e.target.closest('#couponBtn');
      if (cb) {
        if (Pricing.coupon()) {
          Pricing.setCoupon(null);
          toast('Coupon removed');
        } else {
          const code = $('#couponIn').value.trim().toUpperCase();
          if (!code) return;
          if (!COUPONS[code]) return toast('Invalid coupon', `${code} is not recognised`, 'err');
          Pricing.setCoupon(code);
          toast('Coupon applied', COUPONS[code].label);
        }
        return draw();
      }
    });

    $('#cartWrap').addEventListener('change', (e) => {
      const box = e.target.closest('[data-qty]');
      if (!box) return;
      Store.setQty(box.dataset.qty, parseInt(box.value, 10) || 0);
      draw();
    });
  }

  wire();
  draw();
})();
