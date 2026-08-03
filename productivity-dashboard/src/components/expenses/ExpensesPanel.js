"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

export default function ExpensesPanel() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(payload) {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setExpenses((prev) => [created, ...prev]);
  }

  async function handleDelete(id) {
    setExpenses((prev) => prev.filter((e) => e._id !== id));
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Expense Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Log day-to-day spending and see where it goes.
        </p>
      </div>

      <ExpenseForm onAdd={handleAdd} />
      <ExpenseSummary expenses={expenses} />

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      )}
    </div>
  );
}
