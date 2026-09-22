export type TrendDirection = "up" | "down" | "neutral";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: {
    direction: TrendDirection;
    value: string;
  };
}

export interface StackedBarDatum {
  label: string;
  primary: number;
  secondary: number;
}

export interface AreaChartDatum {
  label: string;
  value: number;
}

export interface DonutChartDatum {
  name: string;
  value: number;
  color: string;
}

export type DashboardPeriod = "1y" | "6m" | "3m" | "30d";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: "units" | "workers";
}
