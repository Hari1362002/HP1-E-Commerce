# Vel Hospital

Website for a 220-bed multi-speciality hospital in Palani, Dindigul district.
Glassmorphism UI, built for organic search.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies —
open `index.html` and it runs.

> **Vel Hospital is fictional.** The hospital, its doctors, prices, address and
> phone numbers were invented for this portfolio piece. Every page carries that
> disclosure in the footer. Do not present it as a real medical provider.

---

## Pages

| File | What it does |
|---|---|
| `index.html` | Hero, quick actions, six lead departments, why-us, about strip, stats, four consultants, three packages, testimonials, FAQ |
| `about.html` | History, 2004–2025 timeline, working rules, facility gallery, accreditations, job openings, village camps |
| `departments.html` | Ten departments in detail with anchors, plus the remaining eight in a table |
| `doctors.html` | Twelve consultants, filterable by speciality, with qualifications and OPD days |
| `services.html` | 24×7 services, ten health check packages, room tariff, insurance, support services |
| `contact.html` | Phone numbers, appointment form, map, OPD and visiting hours, department extensions |
| `404.html` | Not-found page with the four routes people actually want |

Every page is self-contained — the header and footer are inlined rather than
injected by JavaScript, so the markup a crawler sees is the markup a visitor sees.

---

## The glass look

One stylesheet, `css/style.css`, driven by custom properties at the top. To
rebrand, change the tokens and nothing else.

The frosted effect is a single reusable recipe:

```css
background: rgba(255,255,255,.58);
backdrop-filter: saturate(180%) blur(20px);
border: 1px solid rgba(255,255,255,.75);
box-shadow: 0 18px 44px -20px rgba(10,45,100,.38);
```

Behind it, `.bg` is a fixed layer of four stacked radial gradients with a grid
pattern masked to fade out at the edges. That texture is what the blur has to
chew on — without something behind it, frosted glass just looks grey.

Type is **Outfit** for display and **Inter** for body copy. Accents: deep blue
`#0f5fd6` for actions, mint `#22cc78` for the circular arrow chips, coral
`#ff6b5e` reserved for emergency numbers only.

Breakpoints at 1080px, 900px (nav collapses to a burger) and 680px.

---

## SEO

Per page: a unique title under 65 characters, a meta description, canonical URL,
Open Graph and Twitter card tags, and JSON-LD.

Structured data:

| Type | Where |
|---|---|
| `Hospital` | `index.html` — address, geo, opening hours, specialities, bed count, payment methods |
| `WebSite` | `index.html` |
| `FAQPage` | `index.html` — the six questions, matching the visible accordion |
| `ItemList` of `MedicalClinic` | `departments.html` |
| `ItemList` of `Physician` | `doctors.html` |
| `OfferCatalog` of `Offer` | `services.html` — package names and prices |
| `ContactPage` with `ContactPoint` | `contact.html` — reception, emergency, ambulance, appointments, HR |
| `BreadcrumbList` | every inner page |
| `AboutPage` | `about.html` |

The `Hospital` node is declared once with `@id`, and the other pages reference it
rather than redeclaring it.

Also: `sitemap.xml`, `robots.txt`, `site.webmanifest`, geo meta tags, one `<h1>`
per page, descriptive `alt` text on every image, and `width`/`height` on every
`<img>` so nothing shifts while loading.

---

## JavaScript

`js/main.js`, about 150 lines, no dependencies:

- Burger menu — toggles `aria-expanded`, closes on link click and on Escape
- Header gets a solid background past 12px of scroll
- Reveal-on-scroll via `IntersectionObserver`
- Counters that animate to `data-count` on first view
- Speciality filter on the doctors page, with an empty-state message
- Appointment form validation and its success panel
- `data-year` in the footer

Two things are deliberate:

**Reveal animations are opt-in.** The hidden state is scoped to `.js .reveal`,
and `.js` is added by a one-line inline script in `<head>`. No JavaScript means no
animation and all content visible, rather than a blank page. There is also a 4s
fallback that reveals everything if the observer never fires.

**Counters degrade to real text.** `<b data-count="180000">1,80,000+</b>` — the
markup already holds the final figure, so it reads correctly if the script
never runs.

---

## Images

29 photographs in `images/`, downloaded from Pexels and served locally. They were
each checked by eye before use — several candidates were rejected for carrying
another hospital's signage or branding.

`hero-doctor.jpg` is the one to keep in mind if you swap images: it is cropped to
a tall arch with `object-position: 50% 18%`, so it needs a portrait shot with the
subject's head near the top.

---

## The form

`contact.html` has a working appointment form — required-field validation, a
date input clamped to the next 90 days, and a personalised confirmation panel.

**It transmits nothing.** `preventDefault()` runs, the panel appears, the fields
reset. To make it live, post the `FormData` to a real endpoint in the submit
handler in `js/main.js`. The note under the button says so on the page too.

---

## Running it

Open `index.html` directly, or serve the folder:

```bash
node .claude/serve.js
```

Then visit `http://localhost:8125`.

---

## Deploying

Live on GitHub Pages:

**https://hari1362002.github.io/HP1-E-Commerce/velhospital/**

Pages serves this repo from `main` at the root, so the site sits in the
`/velhospital/` subdirectory. Every internal path is relative (`css/style.css`,
`images/…`, `about.html`), and `site.webmanifest` uses `./` for `start_url` and
`scope`, so the subdirectory works without a base tag.

Canonical URLs, `og:url`, the JSON-LD `@id`s, `sitemap.xml` and `robots.txt` all
point at that Pages host. **If you move the site, change the host in all six
indexable pages plus `sitemap.xml` and `robots.txt`** — a canonical pointing at
the old host tells Google to index that one instead of this one.

`vercel.json` is kept for the alternative: `cleanUrls`, no-cache on HTML, a year
of immutable caching on assets, and `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options` and `Permissions-Policy` headers. GitHub Pages ignores it and
sets its own headers.

---

## Notes

- The map is an OpenStreetMap iframe, lazy-loaded. It is the only external
  request besides Google Fonts
- Coordinates (10.4497, 77.5211) are approximate Palani, not a real address. The
  OpenStreetMap iframe bbox in `contact.html` is derived from them — move both together
- Doctor photographs are stock models; the names attached to them are invented
- `prefers-reduced-motion` is honoured — animations and smooth scrolling are cut
