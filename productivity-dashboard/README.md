# DailyBase — Expenses, Tasks & Fitness Dashboard

A single dashboard app combining an **Expense Tracker**, **Task Manager**, and **Fitness
Tracker** behind one tab-switching UI — everything runs on the same page with no full reload
between sections.

**Stack:** Next.js (App Router) · React · Tailwind CSS · MongoDB (Mongoose)

## Features

- Tab switching (Expenses / Tasks / Fitness) is instant client-side state — no page navigation
- **Expenses:** log spend by category and date, running total, category breakdown bar chart
- **Tasks:** add tasks with priority and due date, mark complete/incomplete, filter
  All / Active / Completed
- **Fitness:** log workouts by type/duration/calories, weekly summary (workouts, minutes,
  calories)
- Fully responsive: horizontal tab bar on desktop, fixed bottom icon nav on mobile

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MongoDB

Create a `.env.local` file in the project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/productivity-dashboard
```

Use a local MongoDB instance, or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
cluster — copy the connection string Atlas gives you into `MONGODB_URI`.

### 3. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Folder structure

```
src/
├── app/
│   ├── page.js               Dashboard shell — holds the active-tab state
│   └── api/
│       ├── expenses/         GET/POST + [id] DELETE
│       ├── tasks/             GET/POST + [id] PATCH/DELETE
│       └── workouts/          GET/POST + [id] DELETE
├── components/
│   ├── DashboardShell.js     Tab nav (desktop bar / mobile bottom nav)
│   ├── expenses/              Form, List, Summary, Panel
│   ├── tasks/                 Form, List, Item, Panel
│   └── fitness/                Form, List, Summary, Panel
└── lib/
    ├── mongodb.js              MongoDB connection helper
    ├── format.js                Currency/date formatting
    ├── tabs.js                  Tab config (id, label, icon)
    └── models/                  Mongoose schemas (Expense, Task, Workout)
```

## Deploying (so it's viewable on any device)

The easiest option for a Next.js app is [Vercel](https://vercel.com):

1. Push this repo to GitHub (see the top-level README for the git workflow).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with your GitHub account, and
   import this repository. When prompted for the project's root directory, select
   `productivity-dashboard`.
3. Add an environment variable `MONGODB_URI` in the Vercel project settings, pointing to a
   MongoDB Atlas connection string (a local `mongodb://127.0.0.1` URI won't work once
   deployed — Atlas's free tier works fine).
4. Deploy. Vercel gives you a public `https://…vercel.app` URL that works from any phone,
   tablet, or computer.
