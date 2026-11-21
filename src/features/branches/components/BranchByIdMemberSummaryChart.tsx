import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartTooltip from "@/components/charts/ChartTooltip";
import type { BranchByIdMemberSummaryData } from "../types/branch.types";

interface BranchByIdMemberSummaryChartProps {
  summary: BranchByIdMemberSummaryData;
}

const BranchByIdMemberSummaryChart = ({ summary }: BranchByIdMemberSummaryChartProps) => {
  const segments = [
    { name: "Visitors", value: summary.visitors.total, color: "var(--chart-1)" },
    { name: "New converts", value: summary.new_converts.total, color: "var(--chart-4)" },
    { name: "Members", value: summary.members.total, color: "var(--chart-2)" },
    { name: "Workers", value: summary.workers.total, color: "var(--chart-5)" },
    { name: "Others", value: summary.others.total, color: "var(--crozier-text-placeholder)" },
  ];
  const total =
    summary.visitors.total +
    summary.new_converts.total +
    summary.members.total +
    summary.workers.total +
    summary.others.total;

  return (
    <div>
      <div className="relative mx-auto h-87.5 max-w-102.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="86%"
              stroke="none"
            >
              {segments.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-crozier-text-body">
          <strong className="text-[40px] leading-none font-normal">{total.toLocaleString()}</strong>
          <span className="mt-1 text-base">People</span>
        </div>
      </div>
      <ul className="mt-1 grid grid-cols-3 gap-x-5 gap-y-4">
        {segments.map((segment) => (
          <li key={segment.name} className="flex items-center gap-2 text-sm text-crozier-text-body-light">
            <span className="size-5 shrink-0 rounded-md" style={{ backgroundColor: segment.color }} aria-hidden="true" />
            {segment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchByIdMemberSummaryChart;
