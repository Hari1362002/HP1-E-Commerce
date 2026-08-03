"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-cream-300 py-5 last:border-none">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-200 sm:h-24 sm:w-24"
      >
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="font-display text-sm font-semibold text-ink-900 transition hover:text-brand-600 sm:text-base"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-ink-400">
              {formatPrice(item.price)} each
            </p>
          </div>
          <p className="whitespace-nowrap font-display text-sm font-semibold text-ink-900 sm:text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full bg-white ring-1 ring-cream-300">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="px-3 py-1 text-ink-500 transition hover:text-brand-600"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="px-3 py-1 text-ink-500 transition hover:text-brand-600"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

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
  );
}
