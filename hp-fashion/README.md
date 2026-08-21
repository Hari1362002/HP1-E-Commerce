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
css/style.css       Dark green palette with a lime accent; responsive layer last
js/catalogue.js     SECTIONS + PRODUCTS — the single source of truth
js/main.js          Rendering, filters, search, bag + wishlist (localStorage), panels
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

- The palette is dark green with lime: `#0f1613` paper, `#16201b` raised surfaces, and one
  lime doing all the pointing. It ships as three values — `--accent` (`#c6f24e`) for fills
  and glows, `--accent-deep` (`#cdf566`) for small text, and `--on-accent` (`#0f1613`) for
  anything sitting *on* a lime fill. Never put white on lime.

## The home page

Ordered the way someone actually shops: hero, then **You are looking for…** (three
department tabs that render that department's whole rail in place), then the modern-wear
edit, then upcoming designs, then a made-to-order brief, then reviews, then the footer.

The department tabs and their lists are rendered by `renderLooking()` in `js/main.js` from
the same `PRODUCTS` array everything else uses — there is no second copy of the catalogue.

One trap worth knowing: `<img width>`/`<img height>` map to used values, so `aspect-ratio`
is ignored on an image unless `height: auto` is set alongside it. Three rules here need it.

## Mobile

- Filters collapse to a single swipeable row that bleeds to the screen edge, so the
  sticky bar stays shallow.
- Hero heights use `svh` — a `vh` hero resizes as the URL bar hides, which reads as the
  page juddering while you scroll.
- Reveals fade without translating; hover zooms are dropped entirely.
- Every control clears a 44px hit area, icon buttons by size and text links by an
  invisible `::after`.
- The bag persists in `localStorage` under `hpf.bag.v1`, the wishlist under `hpf.wish.v1`.
  Checkout is deliberately inert: this is a portfolio build and takes no payments.

## Wishlist

Every product card carries a heart, and so does the detail view. `paintWish()` is the single
place that reflects the stored list onto the page — it repaints every `[data-wish]` control
wherever it happens to be drawn, so the header pip, the cards, the detail button and the
panel can never disagree. Anything that re-renders cards (a filter, a department tab) calls
it again.

The heart needs `z-index` to clear `.card__link::after`, which covers the whole card so the
title link is clickable anywhere. The click handler checks `[data-wish]` before `[data-add]`
and calls `preventDefault()`, so tapping a heart never follows the card through to the
product page.
- Photographs are from [Unsplash](https://unsplash.com) under the Unsplash licence.
- Type is one family, Plus Jakarta Sans, worked at both ends: 800 for headings, 400 for
  copy, 300 for lede paragraphs. No display serif.
