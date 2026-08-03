"use client";

import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function TasksPanel() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(payload) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setTasks((prev) => [created, ...prev]);
  }

  async function handleToggle(id, completed) {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed } : t))
    );
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }

  async function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Task Manager
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep track of what needs to get done.
        </p>
      </div>

      <TaskForm onAdd={handleAdd} />

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
}
