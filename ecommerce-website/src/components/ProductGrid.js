"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  initialCategory = "All",
  initialQuery = "",
}) {
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "All" || p.category === active;
      const matchesQuery =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [products, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === category
                  ? "bg-ink-900 text-white"
                  : "bg-white text-ink-500 ring-1 ring-cream-300 hover:text-brand-600 hover:ring-brand-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-cream-300 focus-within:ring-2 focus-within:ring-brand-500/40 sm:w-64">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            className="h-4 w-4 shrink-0 text-ink-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-400">
          Nothing matched that search. Try a different word or category.
        </p>
      )}
    </div>
  );
}
