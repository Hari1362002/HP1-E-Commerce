"use client";

import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    await onAdd(form);
    setForm({ title: "", description: "", dueDate: "", priority: "Medium" });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 sm:gap-4"
    >
      <div className="sm:col-span-2">
        <label className="text-xs font-medium text-slate-500">Title</label>
        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to get done?"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="text-xs font-medium text-slate-500">
          Description (optional)
        </label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add more detail"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Due date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-60 sm:col-span-2"
      >
        {submitting ? "Adding…" : "Add Task"}
      </button>
    </form>
  );
}
