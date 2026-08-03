"use client";

import { useState } from "react";
import { todayInputValue } from "@/lib/format";

const TYPES = ["Cardio", "Strength", "Yoga", "Sports", "Other"];

export default function WorkoutForm({ onAdd }) {
  const [form, setForm] = useState({
    type: "Cardio",
    duration: "",
    calories: "",
    date: todayInputValue(),
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.duration || !form.date) return;
    setSubmitting(true);
    await onAdd({
      ...form,
      duration: Number(form.duration),
      calories: Number(form.calories) || 0,
    });
    setForm({ type: "Cardio", duration: "", calories: "", date: todayInputValue() });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <label className="text-xs font-medium text-slate-500">Workout type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
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
        <label className="text-xs font-medium text-slate-500">
          Duration (minutes)
        </label>
        <input
          type="number"
          name="duration"
          min="1"
          required
          value={form.duration}
          onChange={handleChange}
          placeholder="30"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">
          Calories (optional)
        </label>
        <input
          type="number"
          name="calories"
          min="0"
          value={form.calories}
          onChange={handleChange}
          placeholder="200"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-60 sm:col-span-2"
      >
        {submitting ? "Logging…" : "Log Workout"}
      </button>
    </form>
  );
}
