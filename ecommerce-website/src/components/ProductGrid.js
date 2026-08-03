"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  initialCategory = "All",
  initialQuery = "",
}) {
  const router = useRouter();

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );

  // Searching happens in the header; this page just reflects the ?q= it set.
  const query = initialQuery.trim();

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
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
      <div className="flex flex-wrap items-center gap-2">
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

      {query && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-500">
          <span>
            Results for{" "}
            <span className="font-medium text-ink-900">
              &ldquo;{query}&rdquo;
            </span>
          </span>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2.5 py-1 text-xs font-medium text-ink-600 transition hover:bg-cream-300"
          >
            Clear
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              className="h-3 w-3"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <p className="mt-5 text-sm text-ink-400">
        Showing {filtered.length} of {products.length} pieces
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
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
