"use client";

import { useState } from "react";
import { todayInputValue } from "@/lib/format";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
];

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    note: "",
    date: todayInputValue(),
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    setSubmitting(true);
    await onAdd({ ...form, amount: Number(form.amount) });
    setForm({ amount: "", category: "Food", note: "", date: todayInputValue() });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <label className="text-xs font-medium text-slate-500">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          min="0"
          step="0.01"
          required
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Date</label>
        <input
          type="date"
          name="date"
          required
          value={form.date}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Note (optional)</label>
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="e.g. Lunch with team"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-60 sm:col-span-2"
      >
        {submitting ? "Adding…" : "Add Expense"}
      </button>
    </form>
  );
}
