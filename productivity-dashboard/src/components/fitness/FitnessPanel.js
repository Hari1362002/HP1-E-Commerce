"use client";

import { useEffect, useState } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import FitnessSummary from "./FitnessSummary";

export default function FitnessPanel() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(payload) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setWorkouts((prev) => [created, ...prev]);
  }

  async function handleDelete(id) {
    setWorkouts((prev) => prev.filter((w) => w._id !== id));
    await fetch(`/api/workouts/${id}`, { method: "DELETE" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Fitness Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Log workouts and track your weekly activity.
        </p>
      </div>

      <WorkoutForm onAdd={handleAdd} />
      <FitnessSummary workouts={workouts} />

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <WorkoutList workouts={workouts} onDelete={handleDelete} />
      )}
    </div>
  );
}
