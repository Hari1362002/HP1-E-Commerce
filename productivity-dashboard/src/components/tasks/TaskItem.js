"use client";

import { formatDate } from "@/lib/format";

const PRIORITY_STYLES = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-3.5 last:border-none">
      <button
        type="button"
        onClick={() => onToggle(task._id, !task.completed)}
        aria-label="Toggle complete"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          task.completed
            ? "border-violet-600 bg-violet-600 text-white"
            : "border-slate-300 text-transparent hover:border-violet-400"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-sm font-medium ${
              task.completed ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${PRIORITY_STYLES[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="mt-0.5 text-xs text-slate-500">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="mt-0.5 text-xs text-slate-400">
            Due {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(task._id)}
        className="shrink-0 text-xs text-slate-400 hover:text-red-500"
      >
        Remove
      </button>
    </div>
  );
}
