import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "@/components/charts/ChartTooltip";
import type { BranchByIdMemberGrowthPeriod } from "../types/branch.types";

interface BranchByIdMemberGrowthChartProps {
  analytics: BranchByIdMemberGrowthPeriod[];
}

const formatPeriod = (startDate: string) =>
  new Date(`${startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const BranchByIdMemberGrowthChart = ({ analytics }: BranchByIdMemberGrowthChartProps) => (
  <div className="h-107.5" role="img" aria-label="Member growth">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={analytics} margin={{ top: 40, right: 26, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="branchMemberGrowthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--crozier-text-placeholder)" stopOpacity={0.65} />
            <stop offset="100%" stopColor="var(--crozier-border-primary)" stopOpacity={0.65} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--crozier-surface-disabled-lighter)" />
        <XAxis
          dataKey="start_date"
          tickFormatter={formatPeriod}
          axisLine={{ stroke: "var(--crozier-border-primary)" }}
          tickLine={false}
          tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
          tickMargin={14}
        />
        <YAxis
          allowDecimals={false}
          domain={[0, "auto"]}
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
          fill="url(#branchMemberGrowthArea)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default BranchByIdMemberGrowthChart;
