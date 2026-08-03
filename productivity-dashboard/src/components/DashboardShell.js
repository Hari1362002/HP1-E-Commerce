"use client";

import { TABS } from "@/lib/tabs";

function TabIcon({ path, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

export default function DashboardShell({ activeTab, onTabChange, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            Daily<span className="text-violet-600">Base</span>
          </p>

          <nav className="hidden gap-1 rounded-full bg-slate-100 p-1 sm:flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <TabIcon path={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pb-10">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white sm:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition ${
              activeTab === tab.id ? "text-violet-600" : "text-slate-400"
            }`}
          >
            <TabIcon path={tab.icon} className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
