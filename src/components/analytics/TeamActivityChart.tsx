"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui";
import { TEAM_ACTIVITY } from "@/data/analytics-data";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium text-slate-900">{label}</p>
      <p className="text-sm text-blue-600 font-semibold">{payload[0].value} sessions</p>
    </div>
  );
}

export function TeamActivityChart() {
  return (
    <Card hover={false} className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Team Activity</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={TEAM_ACTIVITY}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 13, fill: "#475569" }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="sessions"
            fill="#3b82f6"
            radius={[0, 6, 6, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
