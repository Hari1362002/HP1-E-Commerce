"use client";

import { formatDate } from "@/lib/format";

export default function WorkoutList({ workouts, onDelete }) {
  if (workouts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
        No workouts logged yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {workouts.map((workout) => (
        <div
          key={workout._id}
          className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 last:border-none"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {workout.type}
            </p>
            <p className="text-xs text-slate-400">
              {formatDate(workout.date)} · {workout.duration} min
              {workout.calories ? ` · ${workout.calories} kcal` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(workout._id)}
            className="shrink-0 text-xs text-slate-400 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
