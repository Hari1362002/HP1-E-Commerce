"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, hydrated } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-slate-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-600"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-slate-200 p-6">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-teal-600 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="mt-3 block text-center text-sm text-slate-500 hover:text-slate-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
