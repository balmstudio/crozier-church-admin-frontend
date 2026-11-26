import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "@/components/charts/ChartTooltip";
import type { BranchByIdVisitorConversionPeriod } from "../types/branch.types";

interface BranchByIdVisitorConversionChartProps {
  analytics: BranchByIdVisitorConversionPeriod[];
}

const formatMonth = (startDate: string) =>
  new Date(`${startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });

const BranchByIdVisitorConversionChart = ({
  analytics,
}: BranchByIdVisitorConversionChartProps) => (
  <div
    className="h-83.25 rounded-[20px] bg-crozier-surface-white-black pt-2"
    role="img"
    aria-label="Monthly converted visitors"
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={analytics} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke="var(--crozier-border-primary)" />
        <XAxis
          dataKey="start_date"
          tickFormatter={formatMonth}
          axisLine={{ stroke: "var(--crozier-border-primary)" }}
          tickLine={false}
          tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
          tickMargin={16}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
          width={58}
        />
        <Tooltip
          cursor={{ fill: "var(--crozier-surface-disabled-lightest)" }}
          content={(
            <ChartTooltip
              labels={{
                converted_visitors: "Converted",
                unconverted_visitors: "Unconverted",
              }}
            />
          )}
        />
        <Bar
          dataKey="converted_visitors"
          stackId="total"
          fill="var(--crozier-surface-accent-4)"
          barSize={34}
        />
        <Bar
          dataKey="unconverted_visitors"
          stackId="total"
          fill="var(--crozier-surface-accent-1)"
          radius={[9, 9, 0, 0]}
          barSize={34}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BranchByIdVisitorConversionChart;
