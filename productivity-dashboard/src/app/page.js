"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import ExpensesPanel from "@/components/expenses/ExpensesPanel";
import TasksPanel from "@/components/tasks/TasksPanel";
import FitnessPanel from "@/components/fitness/FitnessPanel";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <DashboardShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "expenses" && <ExpensesPanel />}
      {activeTab === "tasks" && <TasksPanel />}
      {activeTab === "fitness" && <FitnessPanel />}
    </DashboardShell>
  );
}
