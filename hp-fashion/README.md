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
css/style.css       White and grey only; colour lives in the photographs
js/catalogue.js     SECTIONS + PRODUCTS — the single source of truth
js/main.js          Rendering, filters, search, bag (localStorage), panels
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

- The design is deliberately monochrome — white, grey and near-black — so garment colour
  is the only colour on screen.
- The bag persists in `localStorage` under `hpf.bag.v1`. Checkout is deliberately inert:
  this is a portfolio build and takes no payments.
- Photographs are from [Unsplash](https://unsplash.com) under the Unsplash licence.
- Fonts are Bodoni Moda and Inter, served by Google Fonts.
