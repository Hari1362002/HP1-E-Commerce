"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ size = "md", autoFocus = false, onDone }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products"
    );
    onDone?.();
  }

  const compact = size === "sm";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex w-full items-center gap-2 rounded-full bg-cream-100 ring-1 ring-cream-300 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/40 ${
          compact ? "px-3.5 py-2" : "p-1.5 pl-4"
        }`}
      >
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
          autoFocus={autoFocus}
          placeholder="Search for sofas, chairs, lighting…"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
        />

        {!compact && (
          <button
            type="submit"
            className="shrink-0 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
