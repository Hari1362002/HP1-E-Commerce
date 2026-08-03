"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, hydrated } = useCart();
  const { user } = useAuth();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-3xl">
          🛋️
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Nothing here yet — go find something you love.
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-ink-900">
        Your cart
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 ring-1 ring-cream-300/70">
          <h2 className="font-display text-base font-semibold text-ink-900">
            Order summary
          </h2>

          <div className="mt-5 flex justify-between text-sm text-ink-500">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink-500">
            <span>Shipping</span>
            <span className="text-emerald-600">Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-cream-300 pt-4 font-display text-lg font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link
            href={user ? "/checkout" : "/login?next=/checkout"}
            className="mt-6 block rounded-full bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            {user ? "Proceed to checkout" : "Log in to checkout"}
          </Link>

          {!user && (
            <p className="mt-3 text-center text-xs text-ink-400">
              New here?{" "}
              <Link
                href="/signup?next=/checkout"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                Create an account
              </Link>
            </p>
          )}

          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-ink-400 transition hover:text-ink-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
