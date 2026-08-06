/* ==========================================================================
   admin.js — Dealer back-office shell
   Demo only: the sign-in is a client-side gate for the prototype, not
   authentication. Nothing is transmitted or verified anywhere.
   ========================================================================== */

const Admin = {
  DEMO_USER: 'dealer@thirumalaiautospare.in',
  DEMO_PASS: 'demo1234',

  isIn()    { return Store.read('taw_admin_in', false); },
  signIn()  { Store.write('taw_admin_in', true); },
  signOut() { Store.write('taw_admin_in', false); },

  /** Bounce to the login screen unless signed in. */
  guard() {
    if (this.isIn()) return true;
    location.replace('login.html');
    return false;
  },

  /* --- price / stock edits layered over the generated catalogue --- */
  overrides() { return Store.read('taw_admin_overrides', {}); },

  setOverride(sku, patch) {
    const o = this.overrides();
    o[sku] = { ...(o[sku] || {}), ...patch };
    Store.write('taw_admin_overrides', o);
    this.apply();
  },

  clearOverrides() { Store.write('taw_admin_overrides', {}); },

  /** Fold saved edits into the in-memory catalogue (shared with the storefront). */
  apply() { applyDealerEdits(); },

  NAV: [
    ['dashboard.html', 'Dashboard'],
    ['products.html',  'Inventory'],
    ['orders.html',    'Orders']
  ],

  mount(active) {
    const host = $('[data-shell="admin"]');
    if (!host) return;

    host.outerHTML = `
      <div class="topbar">
        <div class="wrap topbar__in">
          <div class="topbar__l"><span>${ICO.lock} Dealer Back Office · demo environment</span></div>
          <div class="topbar__r"><span>${esc(this.DEMO_USER)}</span></div>
        </div>
      </div>
      <header class="header">
        <div class="wrap header__in">
          <a class="logo" href="../index.html">
            <span class="logo__mark">${ICO.gear}</span>
            <span class="logo__txt">
              <span class="logo__name">Thirumalai</span>
              <span class="logo__sub">Back Office</span>
            </span>
          </a>
          <nav class="nav" style="display:flex">
            ${this.NAV.map(([href, label]) => `
              <a class="nav__link ${active === href ? 'is-active' : ''}" href="${href}">${label}</a>`).join('')}
          </nav>
          <div class="hactions" style="margin-left:auto;gap:8px">
            <a class="btn btn--ghost btn--sm" href="../index.html">View Storefront</a>
            <button class="btn btn--outline-red btn--sm" id="signOut">Sign Out</button>
          </div>
        </div>
      </header>`;

    $('#signOut').addEventListener('click', () => {
      this.signOut();
      location.href = 'login.html';
    });
  },

  /* --- shared bits --- */
  statCard(label, value, sub, tone = '') {
    return `
      <div class="card" style="padding:20px">
        <span class="kicker" style="display:block;margin-bottom:10px">${esc(label)}</span>
        <b style="font-family:'Barlow Condensed',sans-serif;font-size:2.4rem;font-weight:800;
                  line-height:1;display:block;margin-bottom:6px${tone ? ';color:' + tone : ''}">${value}</b>
        <span class="mono dim" style="font-size:.66rem">${esc(sub)}</span>
      </div>`;
  }
};
