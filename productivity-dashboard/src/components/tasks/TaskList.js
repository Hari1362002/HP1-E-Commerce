"use client";

import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";

const FILTERS = ["All", "Active", "Completed"];

export default function TaskList({ tasks, onToggle, onDelete }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "Active") return tasks.filter((t) => !t.completed);
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1 rounded-full bg-slate-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === f
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400">{remaining} remaining</span>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
          No tasks here.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {filtered.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
