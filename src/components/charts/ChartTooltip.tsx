import type { TooltipContentProps } from "recharts";

interface TooltipTrend {
  direction: "up" | "down";
  value: string;
}

interface ChartTooltipProps extends Partial<TooltipContentProps<number, string>> {
  labels?: Record<string, string>;
  trends?: Record<string, TooltipTrend>;
}

const ChartTooltip = ({ active, payload, labels = {}, trends = {} }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="h-13.5 w-[145.4px] rounded-[10px] bg-crozier-surface-action-hover
        overflow-hidden px-3 py-1 font-sans text-xs text-neutral-white shadow-lg"
    >
      {payload.map((entry) => {
        const key = String(entry.dataKey ?? entry.name);
        const trend = trends[key];

        return (
          <div
            key={key}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-1
              leading-5.75 whitespace-nowrap"
          >
            <span className="min-w-0 truncate">{labels[key] ?? entry.name}</span>
            <span className="min-w-4.5 text-right tabular-nums">
              {Number(entry.value).toLocaleString()}
            </span>
            {trend ? (
              <span
                className={`min-w-9.75 text-right tabular-nums ${
                  trend.direction === "up"
                    ? "text-crozier-text-success-light"
                    : "text-crozier-text-error"
                }`}
              >
                {trend.direction === "up" ? "↗" : "↘"}
                {trend.value}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default ChartTooltip;
