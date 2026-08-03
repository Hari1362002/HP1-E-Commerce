"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import FormField from "@/components/FormField";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  // Checkout requires an account — bounce guests to login and send them back.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?next=/checkout");
    }
  }, [authLoading, user, router]);

  // Prefill the name once we know who is signed in.
  useEffect(() => {
    if (user) setForm((prev) => ({ ...prev, name: prev.name || user.name }));
  }, [user]);

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

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm text-ink-400">Loading…</p>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900">
          Order placed
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          Thanks {user.name.split(" ")[0]} — we&apos;ll email you when it ships.
        </p>
        <p className="mt-4 rounded-xl bg-white px-4 py-2.5 font-mono text-sm text-ink-600 ring-1 ring-cream-300">
          {orderId}
        </p>
        <p className="mt-3 text-xs text-ink-400">
          Demo checkout — no real payment was processed.
        </p>
        <Link
          href="/products"
          className="mt-7 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          Your cart is empty
        </h1>
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
        Checkout
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Signed in as <span className="font-medium text-ink-600">{user.email}</span>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:col-span-2">
          <FormField
            label="Full name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-ink-600"
            >
              Delivery address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              autoComplete="street-address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, city, state, PIN code"
              className="mt-1.5 w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <FormField
            label="Phone number"
            name="phone"
            required
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={handleChange}
          />

          <div className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
            Payment: Cash on Delivery (demo — no real payment gateway is
            connected).
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-white p-6 ring-1 ring-cream-300/70">
          <h2 className="font-display text-base font-semibold text-ink-900">
            Order summary
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-500">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">
                  {item.name} × {item.quantity}
                </span>
                <span className="whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-cream-300 pt-4 font-display text-lg font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
