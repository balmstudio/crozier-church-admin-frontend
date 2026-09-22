import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { DonutChartDatum } from "@/features/dashboard/types/dashboard.types";
import ChartTooltip from "./ChartTooltip";

interface DonutChartProps {
  data: DonutChartDatum[];
  value: string;
  label: string;
}

const DonutChart = ({ data, value, label }: DonutChartProps) => {
  return (
    <div>
      <div className="relative mx-auto h-87.5 max-w-102.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="86%"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div
          className="pointer-events-none absolute inset-0 flex flex-col
            items-center justify-center text-crozier-text-body"
        >
          <strong className="text-[40px] leading-none font-normal">{value}</strong>
          <span className="mt-1 text-base">{label}</span>
        </div>
      </div>

      <ul className="mt-1 grid grid-cols-3 gap-x-5 gap-y-4">
        {data.map((entry) => (
          <li
            key={entry.name}
            className="flex items-center gap-2 text-sm text-crozier-text-body-light"
          >
            <span
              className="size-5 shrink-0 rounded-md"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutChart;
