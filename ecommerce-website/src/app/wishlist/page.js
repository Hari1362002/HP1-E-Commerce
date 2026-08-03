"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, hydrated } = useWishlist();
  const { addItem } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z" />
          </svg>
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900">
          Your wishlist is empty
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Tap the heart on any product to save it for later.
        </p>
        <Link
          href="/products"
          className="mt-7 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Saved
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">
            Your wishlist
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {items.length} {items.length === 1 ? "piece" : "pieces"} saved for
            later.
          </p>
        </div>
        <button
          type="button"
          onClick={clearWishlist}
          className="text-sm font-medium text-ink-400 transition hover:text-red-500"
        >
          Clear all
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-cream-300/70"
          >
            <Link
              href={`/products/${item.slug}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/products/${item.slug}`}
                className="font-display text-sm font-semibold text-ink-900 transition hover:text-brand-600"
              >
                {item.name}
              </Link>
              <p className="mt-0.5 text-xs text-ink-400">{item.category}</p>
              <p className="mt-1 font-display text-sm font-semibold text-brand-600">
                {formatPrice(item.price)}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addItem({ ...item, _id: item.productId }, 1);
                    removeItem(item.productId);
                  }}
                  className="rounded-full bg-ink-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
                >
                  Move to cart
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-ink-400 transition hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
