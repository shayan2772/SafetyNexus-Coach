"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { AnimatedSection } from "@/components/ui";
import { KPICard } from "@/components/analytics/KPICard";
import { SessionsChart } from "@/components/analytics/SessionsChart";
import { ModuleUsageChart } from "@/components/analytics/ModuleUsageChart";
import { TeamActivityChart } from "@/components/analytics/TeamActivityChart";
import { DateRangeFilter } from "@/components/analytics/DateRangeFilter";
import { KPI_DATA } from "@/data/analytics-data";

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium"
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onDismiss} className="text-slate-400 hover:text-white">
          &times;
        </button>
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");
  const [toast, setToast] = useState<string | null>(null);

  const handleExport = useCallback((type: "pdf" | "csv") => {
    setToast(`${type.toUpperCase()} export started. Your file will download shortly.`);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-sm text-slate-500">
              Track usage metrics, practice fidelity, and team activity
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Date Range Filter */}
      <AnimatedSection delay={0.1}>
        <DateRangeFilter
          selected={selectedRange}
          onSelect={setSelectedRange}
          onExport={handleExport}
        />
      </AnimatedSection>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, index) => (
          <AnimatedSection key={kpi.label} delay={index * 0.1}>
            <KPICard
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              color={kpi.color}
              suffix={kpi.suffix}
              decimals={kpi.decimals}
              delay={index * 0.1}
            />
          </AnimatedSection>
        ))}
      </div>

      {/* Sessions Chart */}
      <AnimatedSection delay={0.2}>
        <SessionsChart />
      </AnimatedSection>

      {/* Module Usage + Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedSection delay={0.1}>
          <ModuleUsageChart />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <TeamActivityChart />
        </AnimatedSection>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
