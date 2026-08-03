# AurelStore — Demo E-commerce Website

A basic e-commerce storefront built as a portfolio project: product catalogue with category
filtering, product detail pages, a persistent cart, and a guest checkout flow.

**Stack:** Next.js (App Router) · React · Tailwind CSS · MongoDB (Mongoose)

## Features

- Home page with category filtering and a responsive product grid
- Product detail page with quantity selector, Add to Cart / Buy Now
- Cart persisted in `localStorage`, quantity updates, item removal
- Checkout with a shipping form and demo "Cash on Delivery" placement (no real payment
  gateway — orders are saved to MongoDB)
- Fully responsive: mobile nav collapses to a hamburger menu, grid adapts from 2 columns on
  mobile up to 4 on desktop

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MongoDB

Create a `.env.local` file in the project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/aurelstore
```

Use a local MongoDB instance, or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
cluster — copy the connection string Atlas gives you into `MONGODB_URI`.

Products are seeded automatically the first time the home page loads (see
`src/data/seedProducts.js`) — no manual seed script needed.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Folder structure

```
src/
├── app/
│   ├── page.js                  Home — product grid
│   ├── products/[id]/page.js    Product detail
│   ├── cart/page.js             Cart
│   ├── checkout/page.js         Checkout + order confirmation
│   └── api/                     Route handlers (products, orders)
├── components/                  Navbar, Footer, ProductCard, CartItem, etc.
├── context/CartContext.js       Cart state (localStorage-backed)
├── lib/
│   ├── mongodb.js                MongoDB connection helper
│   ├── format.js                 Currency formatting
│   └── models/                   Mongoose schemas (Product, Order)
└── data/seedProducts.js         Seed catalogue
```

## Deploying (so it's viewable on any device)

The easiest option for a Next.js app is [Vercel](https://vercel.com):

1. Push this repo to GitHub (see the top-level README for the git workflow).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with your GitHub account, and
   import this repository. When prompted for the project's root directory, select
   `ecommerce-website`.
3. Add an environment variable `MONGODB_URI` in the Vercel project settings, pointing to a
   MongoDB Atlas connection string (a local `mongodb://127.0.0.1` URI won't work once
   deployed — Atlas's free tier works fine).
4. Deploy. Vercel gives you a public `https://…vercel.app` URL that works from any phone,
   tablet, or computer.
