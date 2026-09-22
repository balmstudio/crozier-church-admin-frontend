export type BreadcrumbSection =
  | "dashboard"
  | "units"
  | "admin-users"
  | "settings"
  | "profile";

export interface BreadcrumbRouteHandle {
  breadcrumb: {
    section: BreadcrumbSection;
  };
}

const breadcrumbSections: ReadonlySet<string> = new Set([
  "dashboard",
  "units",
  "admin-users",
  "settings",
  "profile",
]);

const createHandle = (section: BreadcrumbSection): BreadcrumbRouteHandle => ({
  breadcrumb: { section },
});

export const breadcrumbHandles = {
  dashboard: createHandle("dashboard"),
  units: createHandle("units"),
  adminUsers: createHandle("admin-users"),
  settings: createHandle("settings"),
  profile: createHandle("profile"),
} as const;

export const isBreadcrumbRouteHandle = (value: unknown): value is BreadcrumbRouteHandle => {
  if (!value || typeof value !== "object" || !("breadcrumb" in value)) {
    return false;
  }

  const breadcrumb = value.breadcrumb;
  return Boolean(
    breadcrumb &&
    typeof breadcrumb === "object" &&
    "section" in breadcrumb &&
    typeof breadcrumb.section === "string" &&
    breadcrumbSections.has(breadcrumb.section),
  );
};

export const tabLabels = {
  "admin-users": {
    roles: "Roles",
    default: "Church admin users",
  },
} as const;

export type TabbedBreadcrumbSection = keyof typeof tabLabels;

export const getTabLabel = (section: TabbedBreadcrumbSection, tab: string | null): string => {
  const labels: Readonly<Record<string, string>> = tabLabels[section];
  return tab ? (labels[tab] ?? labels.default) : labels.default;
};
