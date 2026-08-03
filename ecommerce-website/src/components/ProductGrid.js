"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === category
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-slate-500">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
