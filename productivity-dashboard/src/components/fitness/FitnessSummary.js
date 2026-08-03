"use client";

import { useMemo } from "react";

function isWithinLast7Days(date) {
  const diff = Date.now() - new Date(date).getTime();
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
}

export default function FitnessSummary({ workouts }) {
  const stats = useMemo(() => {
    const thisWeek = workouts.filter((w) => isWithinLast7Days(w.date));
    return {
      count: thisWeek.length,
      duration: thisWeek.reduce((sum, w) => sum + w.duration, 0),
      calories: thisWeek.reduce((sum, w) => sum + (w.calories || 0), 0),
    };
  }, [workouts]);

  const cards = [
    { label: "Workouts this week", value: stats.count },
    { label: "Minutes trained", value: stats.duration },
    { label: "Calories burned", value: stats.calories },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
        >
          <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
