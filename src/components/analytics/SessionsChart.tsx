"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui";
import { SESSIONS_DATA } from "@/data/analytics-data";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium text-slate-900">{label}</p>
      <p className="text-sm text-blue-600 font-semibold">{payload[0].value} sessions</p>
    </div>
  );
}

export function SessionsChart() {
  return (
    <Card hover={false} className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Sessions Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={SESSIONS_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorSessions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
