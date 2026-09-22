import DashboardMetricCard from "./DashboardMetricCard";
import PeriodFilter from "./PeriodFilter";
import { cn } from "@/lib/utils";
import type { DashboardMetric, DashboardPeriod } from "../types/dashboard.types";

interface MetricSummarySectionProps {
  title: string;
  metrics: DashboardMetric[];
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
}

const MetricSummarySection = ({
  title,
  metrics,
  period,
  onPeriodChange,
}: MetricSummarySectionProps) => {
  return (
    <section aria-labelledby={`${title.replaceAll(" ", "-")}-heading`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2
          id={`${title.replaceAll(" ", "-")}-heading`}
          className="text-base font-semibold text-crozier-text-body-shade"
        >
          {title}
        </h2>
        <PeriodFilter value={period} onChange={onPeriodChange} />
      </div>

      <div
        className={cn(
          "mt-3 grid grid-cols-1 gap-5 md:grid-cols-2",
          metrics.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3",
        )}
      >
        {metrics.map((metric) => (
          <DashboardMetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
};

export default MetricSummarySection;
