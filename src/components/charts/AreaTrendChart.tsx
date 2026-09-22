import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AreaChartDatum } from "@/features/dashboard/types/dashboard.types";
import ChartTooltip from "./ChartTooltip";

interface AreaTrendChartProps {
  data: AreaChartDatum[];
  ariaLabel: string;
}

const AreaTrendChart = ({ data, ariaLabel }: AreaTrendChartProps) => {
  return (
    <div className="h-107.5" role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 40, right: 26, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="memberArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--crozier-text-placeholder)" stopOpacity={0.65} />
              <stop offset="100%" stopColor="var(--crozier-border-primary)" stopOpacity={0.65} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--crozier-surface-disabled-lighter)" />
          <XAxis
            dataKey="label"
            axisLine={{ stroke: "var(--crozier-border-primary)" }}
            tickLine={false}
            tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
            tickMargin={14}
          />
          <YAxis
            domain={[1000, 4000]}
            ticks={[1000, 2000, 3000, 4000]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
            tickFormatter={(value: number) => value.toLocaleString()}
            width={56}
          />
          <Tooltip content={<ChartTooltip labels={{ value: "Members" }} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--crozier-text-accent)"
            strokeWidth={1.5}
            fill="url(#memberArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaTrendChart;
