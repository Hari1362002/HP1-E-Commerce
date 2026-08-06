/* ==========================================================================
   checkout.js — Address, payment method, order confirmation
   Front-end demo: no payment is taken and nothing leaves the browser.
   ========================================================================== */
(function () {

  $('#crumb').innerHTML = UI.crumb([
    { label: 'Home', href: 'index.html' },
    { label: 'Cart', href: 'cart.html' },
    { label: 'Checkout' }
  ]);

  const stepsHTML = (n) => `
    <div class="steps">
      ${[['Cart', 1], ['Delivery & Payment', 2], ['Confirmed', 3]].map(([label, i], idx) => `
        ${idx ? '<span class="step__bar"></span>' : ''}
        <div class="step ${n === i ? 'is-on' : n > i ? 'is-done' : ''}">
          <span class="step__n">${n > i ? '✓' : i}</span><b>${label}</b>
        </div>`).join('')}
    </div>`;

  /* ---------------- empty cart ---------------- */
  if (!Store.cartCount()) {
    $('#page').innerHTML = stepsHTML(2) + UI.empty(
      'Nothing to check out',
      'Your cart is empty. Add a part or two first.',
      `<a class="btn btn--primary" href="products.html">Browse Parts</a>`);
    return;
  }

  const PAY = [
    ['upi',  'UPI', 'GPay, PhonePe, Paytm — pay on your phone'],
    ['card', 'Credit / Debit Card', 'Visa, Mastercard, RuPay'],
    ['net',  'Net Banking', 'All major Indian banks'],
    ['cod',  'Cash on Delivery', `₹${Pricing.COD_FEE} handling fee · up to ₹5,000`]
  ];

  /* ---------------- order summary panel ---------------- */
  function summary(q) {
    return `
      <div class="summary">
        <div class="summary__head"><h4>Your Order</h4></div>
        <div class="summary__body">
          <div style="display:grid;gap:12px;margin-bottom:16px;max-height:284px;overflow-y:auto">
            ${q.lines.map(l => `
              <div style="display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:11px;align-items:center">
                <span class="cartrow__pic">${UI.partPic(l.part)}</span>
                <span style="min-width:0">
                  <span style="display:block;font-size:.82rem;font-weight:600;line-height:1.3">
                    ${esc(l.part.shortName)}</span>
                  <span class="mono dim" style="font-size:.62rem">${l.part.sku} × ${l.qty}</span>
                </span>
                <b class="mono" style="font-size:.78rem">${money(l.part.price * l.qty)}</b>
              </div>`).join('')}
          </div>
          <div style="border-top:1px solid var(--line);padding-top:12px">
            <div class="srow"><span>Subtotal</span><b>${money(q.subtotal)}</b></div>
            ${q.discount ? `<div class="srow"><span>Coupon ${esc(q.code)}</span>
              <b style="color:var(--green)">− ${money(q.discount)}</b></div>` : ''}
            <div class="srow"><span>Shipping</span>
              <b>${q.shipping ? money(q.shipping) : '<span style="color:var(--green)">FREE</span>'}</b></div>
            ${q.cod ? `<div class="srow"><span>COD handling</span><b>${money(q.cod)}</b></div>` : ''}
            <div class="srow"><span class="dim" style="font-size:.78rem">Includes GST @ 18%</span>
              <span class="dim" style="font-size:.78rem">${money(q.gst)}</span></div>
            <div class="srow srow--total"><span>Payable</span><b>${money(q.total)}</b></div>
          </div>
        </div>
      </div>`;
  }

  /* ---------------- main form ---------------- */
  function render() {
    const saved = Store.read('taw_address', {});
    const method = saved.pay || 'upi';
    const q = Pricing.quote({ cod: method === 'cod' });

    $('#page').innerHTML = `
      ${stepsHTML(2)}
      <div class="cart-layout">
        <form id="coForm" novalidate>
          <div class="card" style="padding:22px;margin-bottom:18px">
            <h4 style="margin-bottom:18px">Delivery Address</h4>
            <div class="formgrid">
              <div class="field"><label for="name">Full Name *</label>
                <input id="name" name="name" required autocomplete="name"
                       value="${esc(saved.name || '')}"></div>
              <div class="field"><label for="phone">Mobile Number *</label>
                <input id="phone" name="phone" required inputmode="numeric" maxlength="10"
                       placeholder="10 digits" autocomplete="tel"
                       value="${esc(saved.phone || '')}"></div>
              <div class="field full"><label for="email">Email (for the invoice)</label>
                <input id="email" name="email" type="email" autocomplete="email"
                       value="${esc(saved.email || '')}"></div>
              <div class="field full"><label for="addr">Street Address *</label>
                <textarea id="addr" name="addr" required
                  placeholder="House / shop number, street, area">${esc(saved.addr || '')}</textarea></div>
              <div class="field"><label for="city">City *</label>
                <input id="city" name="city" required value="${esc(saved.city || '')}"></div>
              <div class="field"><label for="pin">PIN Code *</label>
                <input id="pin" name="pin" required inputmode="numeric" maxlength="6"
                       value="${esc(saved.pin || '')}"></div>
              <div class="field full"><label for="state">State *</label>
                <select id="state" name="state" required>
                  ${['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana',
                     'Maharashtra', 'Gujarat', 'Delhi', 'Uttar Pradesh', 'West Bengal', 'Other']
                    .map(s => `<option ${saved.state === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select></div>
            </div>
          </div>

          <div class="card" style="padding:22px;margin-bottom:18px">
            <h4 style="margin-bottom:18px">Payment Method</h4>
            ${PAY.map(([v, title, sub]) => `
              <label class="payopt ${method === v ? 'is-on' : ''}">
                <input type="radio" name="pay" value="${v}" ${method === v ? 'checked' : ''}>
                <span><b>${title}</b><small>${sub}</small></span>
              </label>`).join('')}
            <p class="mono dim" style="font-size:.66rem;margin-top:12px">
              Demo storefront — no payment is processed and no card details are collected.
            </p>
          </div>

          <div class="card" style="padding:22px">
            <label class="fopt"><input type="checkbox" id="saveAddr" checked>
              Remember this address on this device</label>
          </div>
        </form>

        <div>
          ${summary(q)}
          <button class="btn btn--primary btn--block" id="placeBtn"
                  style="height:52px;margin-top:14px">Place Order · ${money(q.total)}</button>
          <a class="btn btn--ghost btn--block" href="cart.html" style="margin-top:10px">Back to Cart</a>
        </div>
      </div>`;
  }

  /* ---------------- confirmation ---------------- */
  function confirmed(order) {
    $('#page').innerHTML = `
      ${stepsHTML(3)}
      <div class="card" style="max-width:720px;margin-inline:auto;overflow:hidden">
        <div style="padding:34px 30px;text-align:center;background:var(--green-dim);
                    border-bottom:1px solid rgba(23,178,106,.22)">
          <span style="display:block;width:52px;height:52px;margin:0 auto 16px;color:var(--green)">
            ${ICO.checkCircle}</span>
          <h2 style="margin-bottom:8px">Order Confirmed</h2>
          <p class="muted" style="font-size:.9rem">
            Thanks ${esc(order.name.split(' ')[0])} — we have your order and it will be packed today.
          </p>
        </div>
        <div style="padding:26px 30px">
          <table class="spectable" style="margin-bottom:22px">
            <tr><th>Order Number</th><td class="mono">${esc(order.id)}</td></tr>
            <tr><th>Items</th><td>${order.items} part${order.items > 1 ? 's' : ''}</td></tr>
            <tr><th>Amount</th><td><b>${money(order.total)}</b></td></tr>
            <tr><th>Payment</th><td>${esc(order.payLabel)}</td></tr>
            <tr><th>Deliver To</th><td>${esc(order.name)}, ${esc(order.city)} – ${esc(order.pin)}</td></tr>
            <tr><th>Expected By</th><td>${esc(order.eta)}</td></tr>
          </table>
          <p class="muted" style="font-size:.85rem;margin-bottom:22px">
            A tracking link reaches your mobile once the consignment leaves our Kolumam
            counter. Keep this order number for any warranty claim.
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <a class="btn btn--primary" href="products.html">Continue Shopping</a>
            <a class="btn btn--ghost" href="index.html">Back to Home</a>
          </div>
        </div>
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- events (delegated: #page is re-rendered) ---------------- */
  $('#page').addEventListener('change', (e) => {
    if (e.target.name !== 'pay') return;
    /* persist the choice, then re-render so COD fee and total stay in step */
    const form = $('#coForm');
    const data = form ? Object.fromEntries(new FormData(form).entries()) : {};
    Store.write('taw_address', { ...Store.read('taw_address', {}), ...data, pay: e.target.value });
    render();
  });

  $('#page').addEventListener('click', (e) => {
    if (!e.target.closest('#placeBtn')) return;

    const data = Object.fromEntries(new FormData($('#coForm')).entries());

    const bad = [];
    if (!data.name?.trim())                       bad.push(['name',  'Enter your name']);
    if (!/^[6-9]\d{9}$/.test(data.phone || ''))   bad.push(['phone', 'Enter a valid 10-digit mobile number']);
    if (!data.addr?.trim())                       bad.push(['addr',  'Enter your street address']);
    if (!data.city?.trim())                       bad.push(['city',  'Enter your city']);
    if (!/^\d{6}$/.test(data.pin || ''))          bad.push(['pin',   'Enter a valid 6-digit PIN code']);
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email))
                                                  bad.push(['email', 'Enter a valid email address']);

    $$('#coForm input, #coForm textarea').forEach(i => i.style.borderColor = '');

    if (bad.length) {
      bad.forEach(([id]) => { const el = $('#' + id); if (el) el.style.borderColor = 'var(--red)'; });
      toast('Check the highlighted fields', bad[0][1], 'err');
      const first = $('#' + bad[0][0]);
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      first?.focus({ preventScroll: true });
      return;
    }

    const cod = data.pay === 'cod';
    const q = Pricing.quote({ cod });
    const eta = new Date(Date.now() + (cod ? 5 : 4) * 864e5)
      .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

    const order = {
      id: 'TAW-' + Date.now().toString(36).toUpperCase().slice(-7),
      at: new Date().toISOString(),
      name: data.name.trim(), phone: data.phone, email: data.email || '',
      addr: data.addr.trim(), city: data.city.trim(), pin: data.pin, state: data.state,
      pay: data.pay,
      payLabel: (PAY.find(p => p[0] === data.pay) || [, 'UPI'])[1],
      items: q.items, total: q.total, eta,
      lines: q.lines.map(l => ({
        sku: l.part.sku, name: l.part.shortName, qty: l.qty, price: l.part.price
      }))
    };

    Store.write('taw_address', $('#saveAddr')?.checked ? { ...data } : {});
    Store.addOrder(order);
    Store.clearCart();
    Pricing.setCoupon(null);
    toast('Order placed', order.id);
    confirmed(order);
  });

  render();
})();
