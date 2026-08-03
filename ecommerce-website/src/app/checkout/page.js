"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: subtotal,
          customer: form,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      setOrderId(data.orderId);
      clearCart();
    } catch {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl text-teal-600">
          ✓
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-slate-900">
          Order placed!
        </h1>
        <p className="mt-2 text-slate-500">
          Order ID: <span className="font-mono text-slate-700">{orderId}</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">
          This is a demo checkout — no real payment was processed.
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

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Your cart is empty
        </h1>
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
        Checkout
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:col-span-2">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="address">
              Delivery address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="Street, city, state, PIN code"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Payment: Cash on Delivery (demo — no real payment gateway is
            connected).
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-2">
                <span className="truncate">
                  {item.name} × {item.quantity}
                </span>
                <span className="whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
