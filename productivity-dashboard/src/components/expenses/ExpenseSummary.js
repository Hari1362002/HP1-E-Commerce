"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/format";

const BAR_COLORS = [
  "bg-violet-600",
  "bg-teal-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-lime-500",
  "bg-slate-400",
];

export default function ExpenseSummary({ expenses }) {
  const { total, byCategory } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const map = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] || 0) + e.amount;
    }
    const byCategory = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return { total, byCategory };
  }, [expenses]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-500">Total spent</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">
        {formatCurrency(total)}
      </p>

      {byCategory.length > 0 && (
        <div className="mt-5 flex flex-col gap-2.5">
          {byCategory.map(([category, amount], i) => (
            <div key={category}>
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>{category}</span>
                <span>{formatCurrency(amount)}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  style={{ width: `${total ? (amount / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
