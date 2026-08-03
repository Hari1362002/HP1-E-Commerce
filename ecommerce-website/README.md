# NOOK — Furniture E-commerce Website

A modern furniture storefront built as a portfolio project: product catalogue with search and
category filtering, product detail pages, a persistent cart, **email/password authentication**,
and a protected checkout flow.

**Stack:** Next.js 16 (App Router) · React · Tailwind CSS v4 · MongoDB (Mongoose) · bcryptjs · jose (JWT)

## Features

- **Sticky header** — solid bar that separates from the page with a shadow on scroll, with
  in-header search, tooltipped icon controls and a cart badge
- **Landing page** — hero with stats, feature strip, category collections, best sellers,
  about section, newsletter CTA, full footer
- **Catalogue** — 14 products across 7 categories, live search and category filters
- **Product pages** — back button, breadcrumbs, material/dimension specs, related products
- **Cart** — persisted in `localStorage`, quantity controls, live subtotal
- **Auth** — sign up, log in, log out with hashed passwords and httpOnly JWT sessions
- **Protected checkout** — guests are redirected to log in and returned to checkout afterwards
- **Responsive** — mobile hamburger nav, 2-up product grid on phones scaling to 4-up on desktop

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/nook
AUTH_SECRET=replace-with-a-long-random-string
```

Generate a strong `AUTH_SECRET` with:

```bash
openssl rand -base64 32
```

`MONGODB_URI` can point at a local MongoDB or a free
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

Products seed themselves the first time a page loads — no seed script needed.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## How the login / signup system works

There are four moving parts. Understanding them in order makes the whole flow click.

### 1. The `User` model — never store a raw password

[`src/lib/models/User.js`](src/lib/models/User.js) stores `name`, `email` (unique, lowercased)
and `passwordHash`. The plain password is never written to the database.

### 2. Hashing on signup

[`src/app/api/auth/signup/route.js`](src/app/api/auth/signup/route.js) does four things:

1. **Validates** name, email format and a minimum 8-character password.
2. **Rejects duplicates** so one email maps to one account (HTTP 409).
3. **Hashes** the password with `bcrypt.hash(password, 10)`. bcrypt salts automatically, so
   two users with the same password get different hashes, and the hash cannot be reversed.
4. **Creates a session** so the new user is logged in immediately.

### 3. Sessions — a signed JWT in an httpOnly cookie

[`src/lib/session.js`](src/lib/session.js) is the core of it:

- `createSession(userId)` signs a JWT containing **only the user id** and writes it to a
  cookie named `session`. Keep the payload minimal — anyone holding the token can read it.
- The cookie is set with:
  - `httpOnly: true` — page JavaScript cannot read it, which blocks XSS token theft
  - `secure` in production — the cookie is only sent over HTTPS
  - `sameSite: "lax"` — not sent on cross-site POSTs, which blocks basic CSRF
  - a 7-day expiry
- `getSessionUserId()` verifies the token's signature. A tampered or expired token throws and
  is treated as signed out.
- `destroySession()` deletes the cookie — that is all "log out" means here.

### 4. Login and the client

[`login/route.js`](src/app/api/auth/login/route.js) looks the user up and calls
`bcrypt.compare(password, user.passwordHash)`. Note that an unknown email and a wrong password
return the **same** message — otherwise the response tells an attacker which emails are
registered.

Because the cookie is `httpOnly`, the React app cannot read the session directly. Instead
[`AuthContext`](src/context/AuthContext.js) calls `GET /api/auth/me` once on load, and that
route resolves the cookie into a user server-side. `useAuth()` then gives any component
`{ user, loading, signup, login, logout }`.

### The end-to-end flow

```
Guest adds items → clicks "Log in to checkout"
  → /login?next=/checkout
  → POST /api/auth/login → bcrypt.compare → createSession() sets the cookie
  → redirected to /checkout
  → checkout reads `user` from AuthContext and prefills the name
  → "Place order" POSTs to /api/orders → saved to MongoDB
```

`/checkout` also guards itself: if `AuthContext` finishes loading with no user, it redirects
to `/login?next=/checkout`.

### If you extend this

For a production build you would still want: rate limiting on the login route, email
verification, a password-reset flow, and refresh-token rotation. The structure above is the
right foundation for all four.

---

## Folder structure

```
public/images/
├── products/                 14 furniture photos (Unsplash, free licence)
└── site/                     hero + about imagery

src/
├── app/
│   ├── page.js               Landing page
│   ├── products/page.js      Catalogue with filters
│   ├── products/[id]/page.js Product detail
│   ├── cart/page.js          Cart
│   ├── checkout/page.js      Protected checkout
│   ├── login/page.js         Log in
│   ├── signup/page.js        Sign up
│   ├── about/page.js         About us
│   └── api/
│       ├── auth/             signup · login · logout · me
│       ├── products/         catalogue endpoints
│       └── orders/           order creation
├── components/               Navbar, Hero, Collections, FeatureStrip,
│                             AboutSection, ContactCTA, Footer, ProductCard, …
├── context/
│   ├── AuthContext.js        Session state for the client
│   └── CartContext.js        Cart state (localStorage-backed)
├── lib/
│   ├── mongodb.js            Cached MongoDB connection
│   ├── session.js            JWT sign / verify / cookie handling
│   ├── products.js           Catalogue queries + first-run seeding
│   ├── format.js             Currency formatting
│   └── models/               Product · Order · User
└── data/seedProducts.js      Seed catalogue
```

## Deploying

Deploy to [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo and set the root directory to
   `ecommerce-website`.
3. Add **both** environment variables in the Vercel project settings:
   - `MONGODB_URI` — a MongoDB Atlas connection string (a local `127.0.0.1` URI will not work
     once deployed)
   - `AUTH_SECRET` — a long random string, the same kind you generated above
4. Deploy. You get a public `https://…vercel.app` URL that works on any phone or computer.

## Image credits

Product and site photography from [Unsplash](https://unsplash.com), used under the Unsplash
licence, downloaded into `public/images/` so the site has no external image dependencies.
