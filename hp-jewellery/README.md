# HP Jewellery

A fine-jewellery storefront for a fictional house in Coimbatore, Tamil Nadu — deep forest
green and cream, hallmark gold accents, and a real WebGL ring you can spin in the hero.

Built as a static site: plain HTML, one stylesheet, two scripts. No build step, no framework,
no dependencies to install.

## Pages

| File | What's on it |
| --- | --- |
| [`index.html`](./index.html) | Hero with the 3D ring, categories, "anatomy of a solitaire", featured pieces, craft story, look book, reviews, gift guides |
| [`collections.html`](./collections.html) | All 25 pieces with a working category filter |
| [`product.html`](./product.html) | Product page — 3D viewer plus photo gallery, metal and size pickers, spec accordion |
| [`about.html`](./about.html) | The workshop, the nine finishing stages, a 1998→today timeline, sourcing policy |
| [`contact.html`](./contact.html) | Appointment form, six store cards, FAQ accordion |
| [`404.html`](./404.html) | Not-found page |

## The 3D ring

[`js/ring3d.js`](./js/ring3d.js) builds the ring from primitives rather than loading a model
file, so there is no multi-megabyte `.glb` to download:

- the band is a torus in the XY plane — a ring standing up, the way a jeweller photographs one
- the stone is a crown, girdle and pavilion stacked as low-segment cylinders with
  `flatShading`, which gives it genuine facets that catch the light
- gold is a `MeshStandardMaterial` at `metalness: 1`, lit by a `RoomEnvironment` probe — the
  environment map is what makes it read as metal rather than as yellow plastic
- the stone uses `transmission` for real refraction on desktop, and drops to a cheaper
  translucent material below 760px

Three.js loads from jsDelivr via an import map. Everything degrades: the hero keeps its poster
image until a frame has actually rendered, and the product page falls back to the photo pane if
WebGL is unavailable.

## Running it

Any static server will do:

```bash
node .claude/serve.js
```

Then open <http://localhost:8126>. Or from the repo root, `preview_start` the `hp-jewellery`
configuration in `.claude/launch.json`.

## Deploying

It is already live on GitHub Pages at
<https://hari1362002.github.io/HP1-E-Commerce/hp-jewellery/>.

`vercel.json` is included for Vercel — import the repo, set the root directory to
`hp-jewellery`, and deploy. There is nothing to build.

## Notes

- Everything is client-side. The newsletter and appointment forms validate and confirm in the
  browser; nothing is sent anywhere.
- Prices, certificate numbers, store addresses and the gold rate are invented for the demo.
- Photography is from [Unsplash](https://unsplash.com) under the
  [Unsplash License](https://unsplash.com/license). Only freely licensed photos were used — no
  Unsplash+ images.
