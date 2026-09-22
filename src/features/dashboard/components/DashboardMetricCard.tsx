import memberMetricIcon from "@/assets/icons/dashboard/member-metric.svg";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "../types/dashboard.types";

interface DashboardMetricCardProps {
  metric: DashboardMetric;
}

const trendStyles = {
  up: "border-crozier-border-success text-crozier-text-success",
  down: "border-crozier-border-error text-crozier-text-error",
  neutral: "border-crozier-border-primary text-crozier-text-body-light",
};

const trendSymbols = {
  up: "↑",
  down: "↓",
  neutral: "",
};

const DashboardMetricCard = ({ metric }: DashboardMetricCardProps) => {
  const direction = metric.trend.direction;

  return (
    <article
      className="min-h-25.5 rounded-[20px] bg-crozier-surface-primary
        px-5 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.025)]"
    >
      <div className="flex items-center gap-2 text-sm text-crozier-text-body">
        <span
          className="grid size-7 place-items-center rounded-lg bg-crozier-surface-disabled-lighter
            text-crozier-text-heading"
        >
          <img src={memberMetricIcon} alt="" aria-hidden="true" className="h-3 w-13.5" />
        </span>
        <span>{metric.label}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <strong
          className="font-sans text-[30px] leading-none font-normal
            text-crozier-text-body"
        >
          {metric.value}
        </strong>
        <span
          className={cn(
            "rounded border px-1.5 py-0.5 text-[10px] leading-none",
            trendStyles[direction],
          )}
        >
          {trendSymbols[direction]} {metric.trend.value}
        </span>
      </div>
    </article>
  );
};

export default DashboardMetricCard;
