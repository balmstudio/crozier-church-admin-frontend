import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { StackedBarDatum } from "@/features/dashboard/types/dashboard.types";
import ChartTooltip from "./ChartTooltip";

interface StackedBarChartProps {
  data: StackedBarDatum[];
  ariaLabel: string;
}

const StackedBarChart = ({ data, ariaLabel }: StackedBarChartProps) => {
  return (
    <div
      className="h-83.25 rounded-[20px] bg-crozier-surface-white-black pt-2"
      role="img"
      aria-label={ariaLabel}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid vertical={false} stroke="var(--crozier-border-primary)" />
          <XAxis
            dataKey="label"
            axisLine={{ stroke: "var(--crozier-border-primary)" }}
            tickLine={false}
            tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
            tickMargin={16}
          />
          <YAxis
            domain={[0, 140]}
            ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--crozier-text-body-light)", fontSize: 12 }}
            width={58}
          />
          <Tooltip
            cursor={{ fill: "var(--crozier-surface-disabled-lightest)" }}
            content={
              <ChartTooltip
                labels={{ primary: "Visitors", secondary: "Retained" }}
                trends={{
                  primary: { direction: "up", value: "+22%" },
                  secondary: { direction: "down", value: "+34%" },
                }}
              />
            }
          />
          <Bar
            dataKey="primary"
            stackId="total"
            fill="var(--crozier-surface-accent-4)"
            barSize={34}
          />
          <Bar
            dataKey="secondary"
            stackId="total"
            fill="var(--crozier-surface-accent-1)"
            radius={[9, 9, 0, 0]}
            barSize={34}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
