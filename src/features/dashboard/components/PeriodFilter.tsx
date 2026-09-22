import { Button } from "@/components/ui/button";
import type { DashboardPeriod } from "../types/dashboard.types";

const periodOptions: Array<{
  label: string;
  value: DashboardPeriod;
}> = [
  { label: "1 year", value: "1y" },
  { label: "6 months", value: "6m" },
  { label: "3 months", value: "3m" },
  { label: "30 days", value: "30d" },
];

interface PeriodFilterProps {
  value: DashboardPeriod;
  onChange: (period: DashboardPeriod) => void;
}

const PeriodFilter = ({ value, onChange }: PeriodFilterProps) => {
  return (
    <div
      className="inline-flex rounded-lg bg-crozier-surface-disabled-lighter p-1"
      role="group"
      aria-label="Select reporting period"
    >
      {periodOptions.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className="h-7 rounded-md px-3 text-xs font-normal
            text-crozier-text-placeholder hover:bg-crozier-surface-white-black hover:text-crozier-text-body
            data-[active=true]:bg-crozier-border-primary
            data-[active=true]:text-crozier-text-body"
          data-active={value === option.value}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default PeriodFilter;
