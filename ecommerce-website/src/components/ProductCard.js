"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isSaved, toggleItem } = useWishlist();
  const [added, setAdded] = useState(false);

  const saved = isSaved(product._id);

  function handleAdd(e) {
    // The card is a link — keep the click from navigating away.
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-cream-300/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10 hover:ring-brand-200"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-600 backdrop-blur">
          {product.category}
        </span>

        {/* Wishlist toggle — always visible so it works on touch devices too */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
            saved
              ? "bg-brand-500 text-white"
              : "bg-white/90 text-ink-500 hover:bg-white hover:text-brand-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5"
            style={{ height: "1.1rem", width: "1.1rem" }}
          >
            <path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z" />
          </svg>
        </button>

        {/*
          Quick add. Hidden until hover on pointer devices; on touch screens
          there is no hover, so it stays visible below the sm breakpoint.
        */}
        <div className="absolute inset-x-3 bottom-3 sm:translate-y-3 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg transition sm:text-sm ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-ink-900 text-white hover:bg-brand-600"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-sm font-semibold text-ink-900 sm:text-base">
          {product.name}
        </h3>
        {product.material && (
          <p className="text-xs text-ink-400">{product.material}</p>
        )}
        <p className="mt-auto pt-2 font-display text-base font-semibold text-brand-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
