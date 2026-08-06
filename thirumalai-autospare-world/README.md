# Thirumalai Autospare World

Two-wheeler spare parts storefront. Pick your bike brand → pick your model → see
only the parts that actually fit it.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies —
open `index.html` and it runs.

---

## The core idea

The site works the way a parts counter works: you say what you ride, and you get
handed the right part. That drill-down is the spine of the whole thing.

```
index.html ──▶ brands.html ──▶ brand.html?b=hero ──▶ model.html?b=hero&m=splendor-plus
                                                            │
                                                            ▼
                                           product-details.html?p=TAW-HRSPL-CL10
```

Every bike model has a picture, its specs, and its full parts list grouped by
system — engine and oil, clutch and cables, brakes, chain and sprocket, filters,
electricals, lighting, suspension, tyres, bearings, body.

---

## Pages

| File | What it does |
|---|---|
| `index.html` | Landing — hero, fitment finder, brands, categories, bestsellers, offers |
| `brands.html` | All eight brands with their full model line-ups |
| `brand.html?b=<brand>` | One brand, models grouped by body style |
| `model.html?b=&m=<model>` | **One bike** — specs plus every part that fits it |
| `products.html` | Full catalogue with faceted filters |
| `product-details.html?p=<sku>` | One part — gallery, fitment list, specs, related |
| `cart.html` | Quantities, coupons, totals |
| `checkout.html` | Address, payment method, order confirmation |
| `admin/` | Dealer back office — dashboard, inventory, orders |

`products.html` accepts `q`, `brand`, `model`, `cat`, `deals=1`, `wish=1`, `sort`.

---

## How the catalogue works

The catalogue is **generated**, not hand-written. `js/data.js` holds:

- **8 brands** and **57 bike models** with real specs (cc, power, torque, brake
  type, tyre sizes)
- **~70 part templates** — a clutch cable, a chain kit, an air filter and so on

Each template is expanded against every bike it fits, producing **~3,060 SKUs**.
Templates carry fitment rules, so the result stays honest:

```js
{ key: 'clutch-cable', cat: 'clutch', scope: 'model',
  exclude: ['scooter'],          // scooters have no clutch cable
  base: 175, ccRate: 0.35 }

{ key: 'brake-pad-f',  cat: 'brakes', scope: 'model',
  needs: 'disc',                 // only bikes with a front disc
  base: 380, ccRate: 1.1 }
```

So a **Splendor** gets a clutch cable but no CVT belt and no disc pads; an
**Activa** gets a CVT belt and gear oil but no chain kit. Universal items (engine
oil, mirrors, horn) honour the same rules — scooter gear oil never shows up on a
KTM.

Prices scale with engine capacity. Ratings, stock levels and discounts come from
a hash of the SKU, so they are varied but **stable across reloads**.

---

## Artwork

There are no image files. `js/art.js` generates everything as SVG at runtime:

- **Five bike silhouettes** — commuter, sport, cruiser, scooter, adventure —
  drawn from wheels, frame, tank, seat and bodywork, tinted with the brand's
  colour
- **22 part graphics** — oil bottle, cable, brake disc, chain and sprocket,
  piston, camshaft, valves, battery, shock absorber and so on

Gradient IDs are namespaced per instance, so a page full of bikes keeps each
one's own colour.

**To use real photos instead**, add an `image` field — the renderers prefer it:

```js
{ id: 'splendor-plus', …, image: 'img/splendor-plus.jpg' }   // a model
{ key: 'clutch-cable', …, image: 'img/clutch-cable.jpg' }    // a part
```

---

## Design

Industrial workshop, not generic e-commerce: near-black graphite surfaces,
hairline rules, sharp 2px corners, hazard-stripe dividers, and mono type for
part numbers.

- **Barlow Condensed** — headings and buttons, uppercase and tight
- **Inter** — body copy
- **Roboto Mono** — SKUs, specs, measurements

Everything is driven by CSS custom properties in `css/style.css`. To rebrand,
change the tokens at the top of that file.

---

## State

All client-side, in `localStorage`:

| Key | Holds |
|---|---|
| `taw_cart` | Cart lines |
| `taw_wish` | Wishlist |
| `taw_garage` | The customer's saved bike |
| `taw_orders` | Placed orders |
| `taw_address` | Remembered delivery address |
| `taw_coupon` | Applied coupon |
| `taw_admin_overrides` | Dealer price / stock edits |

Coupons: `RIDE10` (10% off), `FIRST500` (₹100 off over ₹500), `SERVICE20`
(20% off over ₹2,500), `FREESHIP`.

Free shipping over ₹999, otherwise ₹79. Cash on delivery adds ₹49. Listed
prices include GST, shown as an 18% component.

---

## Back office

`admin/login.html` — demo credentials are printed on the sign-in card:

```
dealer@thirumalaiautospare.in
demo1234
```

This is a **client-side gate for the prototype, not authentication**. Nothing is
transmitted or verified. Don't enter a real password.

Inventory edits (price and stock) are stored as overrides and applied on top of
the generated catalogue at page load, so changes show up on the storefront
immediately. "Reset All Edits" clears them.

---

## Running it

Open `index.html` directly, or serve the folder to keep query strings intact:

```bash
node .claude/serve.js
```

Then visit `http://localhost:8123`.

---

## Notes

- Checkout takes no payment — it is a front-end demo
- Orders and stock live in the browser, so they are per-device
- Brand and vehicle names are used for fitment identification only; all
  trademarks belong to their owners
