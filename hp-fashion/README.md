# HP Fashion

A dress store front for **HP Fashion** — a family clothing shop on Cross Cut Road, Coimbatore.
Static HTML, CSS and vanilla JavaScript. No build step, no dependencies.

**Live:** https://hari1362002.github.io/HP1-E-Commerce/hp-fashion/

## What's here

Three departments, five varieties each, five pieces per variety — **75 products** in total.

| Department | Varieties |
| --- | --- |
| Men | Formal Shirts · T-Shirts · Denim & Trousers · Ethnic & Wedding · Blazers & Jackets |
| Women | Sarees · Kurtis & Salwar Sets · Dresses · Tops & Blouses · Lehengas & Bridal |
| Kids | Boys' Shirts · Girls' Dresses · Everyday T-Shirts · Festive & Ethnic · Winterwear |

Every product carries a price, an earlier price, fabric and fit specs, colours, sizes and a
short piece of copy.

## Files

```
index.html          Home — hero, departments, featured, editorial
men.html            Department page (filter rail + five variety blocks)
women.html
kids.html
product.html        Detail view, reads ?id= from the catalogue
about.html          The shop, the rules, the exchange policy
contact.html        Store details and a fitting-appointment form
404.html
css/style.css       Cream and orange palette; the responsive layer lives at the end
js/catalogue.js     SECTIONS + PRODUCTS — the single source of truth
js/main.js          Rendering, filters, search, bag (localStorage), panels
js/stage.js         WebGL dress form on the landing hero (three.js, ES module)
images/             85 photographs
```

Pages hold no product markup. Everything on a grid is rendered from `js/catalogue.js`, so
adding a piece means adding one object to `PRODUCTS`.

## Running locally

No build, no install:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Notes

- The palette is cream and orange: `#fdf9f4` paper, `#f6eee4` bands, and one orange
  doing all the pointing. It ships as two values — `--accent` (`#e2661c`) for fills and
  graphics, and `--accent-deep` (`#b4490c`) for anything small enough to need 4.5:1 on
  cream. Never use the bright one for body-size text.

## The landing hero

`js/stage.js` lathes a tailor's dress form from one spline profile and stands it in front
of a flat CSS disc. three.js arrives from a CDN through an import map, and only
`index.html` carries it.

It fails soft on purpose. The stage keeps a still photograph underneath and only earns
`.is-live` once a frame has actually rendered, so no WebGL means no blank rectangle. The
loop also idles when the hero scrolls out of view or the tab is hidden.

On touch devices the canvas is `pointer-events: none` with `touch-action: pan-y`, so a
swipe over the hero is always a scroll and never a drag.

## Mobile

- Filters collapse to a single swipeable row that bleeds to the screen edge, so the
  sticky bar stays shallow.
- Hero heights use `svh` — a `vh` hero resizes as the URL bar hides, which reads as the
  page juddering while you scroll.
- Reveals fade without translating; hover zooms are dropped entirely.
- Every control clears a 44px hit area, icon buttons by size and text links by an
  invisible `::after`.
- The bag persists in `localStorage` under `hpf.bag.v1`. Checkout is deliberately inert:
  this is a portfolio build and takes no payments.
- Photographs are from [Unsplash](https://unsplash.com) under the Unsplash licence.
- Fonts are Bodoni Moda and Inter, served by Google Fonts.
