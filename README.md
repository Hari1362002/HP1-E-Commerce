# Portfolio Websites

Two full-stack demo projects built with Next.js, Tailwind CSS and MongoDB.

## Projects

### [`ecommerce-website/`](./ecommerce-website) — AurelStore

A basic e-commerce storefront: product catalogue, cart, and guest checkout.
See [ecommerce-website/README.md](./ecommerce-website/README.md) for setup.

### [`productivity-dashboard/`](./productivity-dashboard) — DailyBase

An Expense Tracker + Task Manager + Fitness Tracker combined into one tab-switching
dashboard. See [productivity-dashboard/README.md](./productivity-dashboard/README.md) for
setup.

## Running locally

Each project is independent — install and run them separately:

```bash
cd ecommerce-website && npm install && npm run dev   # http://localhost:3000
cd productivity-dashboard && npm install && npm run dev -- -p 3001   # http://localhost:3001
```

Both need their own `MONGODB_URI` in a `.env.local` file inside that project's folder — see
each project's README for details.

## Deploying

Both are standard Next.js apps and deploy cleanly to [Vercel](https://vercel.com) — import
this repo, set the project's root directory to `ecommerce-website` or
`productivity-dashboard`, add the `MONGODB_URI` environment variable, and deploy. Full steps
are in each project's README.
