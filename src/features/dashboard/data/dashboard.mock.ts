import type {
  DashboardStat,
  StackedBarDatum,
} from "../types/dashboard.types";

export const monthlyBarData: StackedBarDatum[] = [
  { label: "Jan 26", primary: 20, secondary: 49 },
  { label: "Feb 26", primary: 20, secondary: 58 },
  { label: "Mar 26", primary: 25, secondary: 49 },
  { label: "Apr 26", primary: 14, secondary: 77 },
  { label: "May 26", primary: 7, secondary: 37 },
  { label: "Jun 26", primary: 15, secondary: 62 },
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
