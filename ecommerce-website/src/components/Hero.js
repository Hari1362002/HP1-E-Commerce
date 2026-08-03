"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATS = [
  { value: "1.3 M+", label: "Customer reviews" },
  { value: "4.7 M+", label: "Active members" },
  { value: "3 day", label: "Delivery time" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-cream-300/70">
      {/* Warm arc behind the photo, echoing the brand mark */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[34rem] w-[34rem] rounded-full bg-brand-500/90 lg:block"
        aria-hidden="true"
      />

      <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
            New collection
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
            Make you
            <br />
            <span className="text-brand-500">feel luxury</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
            Sofas, chairs and lighting made from materials that age well —
            designed in-house, built to last, and delivered to your door in
            three days.
          </p>

          <form onSubmit={handleSearch} className="mt-7 max-w-md">
            <div className="flex items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-cream-300 focus-within:ring-2 focus-within:ring-brand-500/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="ml-3 h-4 w-4 shrink-0 text-ink-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you searching for?"
                aria-label="Search furniture"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-ink-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Shop now
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream-300 px-7 py-3 text-sm font-semibold text-ink-600 transition hover:border-brand-400 hover:text-brand-600"
            >
              Our story
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-cream-300 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs text-ink-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200 shadow-2xl shadow-brand-900/10 lg:aspect-[5/6]">
            <Image
              src="/images/site/hero.jpg"
              alt="A mustard armchair beside a brass floor lamp in a bright modern room"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
