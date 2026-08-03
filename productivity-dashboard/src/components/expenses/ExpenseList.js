"use client";

import { formatCurrency, formatDate } from "@/lib/format";

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
        No expenses logged yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 last:border-none"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {expense.note || expense.category}
            </p>
            <p className="text-xs text-slate-400">
              {expense.category} · {formatDate(expense.date)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">
              {formatCurrency(expense.amount)}
            </span>
            <button
              type="button"
              onClick={() => onDelete(expense._id)}
              className="text-xs text-slate-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
