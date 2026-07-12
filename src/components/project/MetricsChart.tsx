"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectChartPoint } from "@/types";

type MetricsChartProps = {
  data: ProjectChartPoint[];
};

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="h-80 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="currentColor" stopOpacity={0.15} />
              <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-foreground/10" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            className="text-foreground/50"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12 }}
            className="text-foreground/50"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            className="text-foreground/50"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "12px",
              fontSize: "13px",
            }}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="visitors"
            name="Visitatori"
            stroke="currentColor"
            fill="url(#visitorsGrad)"
            strokeWidth={2}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="conversions"
            name="Conversioni"
            stroke="#10b981"
            fill="transparent"
            strokeWidth={2}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="loadTime"
            name="Load Time (s)"
            stroke="#f59e0b"
            fill="transparent"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
