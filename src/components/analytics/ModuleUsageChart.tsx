"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui";
import { MODULE_USAGE } from "@/data/analytics-data";

const total = MODULE_USAGE.reduce((sum, item) => sum + item.value, 0);

export function ModuleUsageChart() {
  return (
    <Card hover={false} className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Module Usage</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={MODULE_USAGE}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            stroke="none"
          >
            {MODULE_USAGE.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {/* Center label */}
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-900 text-2xl font-bold"
            fontSize={28}
            fontWeight={700}
          >
            {total}
          </text>
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-400"
            fontSize={12}
          >
            total %
          </text>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {MODULE_USAGE.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-slate-600 truncate">{item.name}</span>
            <span className="text-sm font-semibold text-slate-900 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
