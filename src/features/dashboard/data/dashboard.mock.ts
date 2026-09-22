import type {
  AreaChartDatum,
  DashboardMetric,
  DashboardStat,
  DonutChartDatum,
  StackedBarDatum,
} from "../types/dashboard.types";

export const visitorMetrics: DashboardMetric[] = [
  {
    id: "first-timers",
    label: "First timers",
    value: "90",
    trend: { direction: "up", value: "20%" },
  },
  {
    id: "second-timers",
    label: "Second timers",
    value: "60",
    trend: { direction: "down", value: "10%" },
  },
  {
    id: "regular",
    label: "Regular",
    value: "300",
    trend: { direction: "neutral", value: "0%" },
  },
];

export const convertMetrics: DashboardMetric[] = [
  {
    id: "saved",
    label: "Saved",
    value: "90",
    trend: { direction: "up", value: "20%" },
  },
  {
    id: "filled",
    label: "Filled",
    value: "60",
    trend: { direction: "down", value: "10%" },
  },
  {
    id: "planted",
    label: "Planted",
    value: "300",
    trend: { direction: "neutral", value: "0%" },
  },
  {
    id: "regular-converts",
    label: "Regular",
    value: "5K",
    trend: { direction: "neutral", value: "0%" },
  },
];

export const monthlyBarData: StackedBarDatum[] = [
  { label: "Jan 26", primary: 20, secondary: 49 },
  { label: "Feb 26", primary: 20, secondary: 58 },
  { label: "Mar 26", primary: 25, secondary: 49 },
  { label: "Apr 26", primary: 14, secondary: 77 },
  { label: "May 26", primary: 7, secondary: 37 },
  { label: "Jun 26", primary: 15, secondary: 62 },
];

export const memberGrowthData: AreaChartDatum[] = [
  { label: "Jan", value: 1920 },
  { label: "Feb", value: 1910 },
  { label: "Mar", value: 1900 },
  { label: "Apr", value: 1710 },
  { label: "May", value: 1560 },
  { label: "Jun", value: 1600 },
  { label: "Jul", value: 2050 },
  { label: "Aug", value: 2740 },
  { label: "Sep", value: 2660 },
  { label: "Oct", value: 2240 },
  { label: "Nov", value: 1870 },
  { label: "Dec", value: 1900 },
];

export const memberDistributionData: DonutChartDatum[] = [
  { name: "Visitors", value: 7, color: "var(--chart-1)" },
  { name: "New converts", value: 7, color: "var(--chart-4)" },
  { name: "Members", value: 24, color: "var(--chart-2)" },
  { name: "Workers", value: 18, color: "var(--chart-5)" },
  { name: "Others", value: 44, color: "var(--crozier-text-placeholder)" },
];

export const workerOverviewStats: DashboardStat[] = [
  {
    id: "units",
    label: "Units",
    value: "12",
    description: "Functional administrative units in the church",
    icon: "units",
  },
  {
    id: "workers",
    label: "Workers",
    value: "1.2K",
    description: "Members serving in units",
    icon: "workers",
  },
];

export const unitWorkerStats: DashboardStat[] = [
  { id: "discipleship", label: "Discipleship", value: "34" },
  { id: "follow-up", label: "Follow Up", value: "25" },
  { id: "sanctuary", label: "Sanctuary", value: "13" },
  { id: "media", label: "Media", value: "43" },
  { id: "choir", label: "Choir", value: "43" },
];
