import { useMatches, useSearchParams } from "react-router-dom";
import type { NavbarBreadcrumb } from "@/layout/components/Navbar/Navbar.types";
import { getTabLabel, isBreadcrumbRouteHandle } from "@/routing/breadcrumbs";

export const useBreadcrumbs = (): NavbarBreadcrumb[] => {
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const routeMatch = [...matches].reverse().find((match) => isBreadcrumbRouteHandle(match.handle));
  const section = isBreadcrumbRouteHandle(routeMatch?.handle)
    ? routeMatch.handle.breadcrumb.section
    : undefined;
  const unitId = section === "units" ? routeMatch?.params.unitId : undefined;

  switch (section) {
    case "dashboard":
      return [{ label: "Dashboard" }];
    case "profile":
      return [{ label: "Profile" }];
    case "settings":
      return [{ label: "Settings", path: "/settings" }, { label: "Profile & brand" }];
    case "admin-users":
      return [{ label: "Admin users", path: "/admin-users" }, { label: getTabLabel(section, tab) }];
    case "units":
      if (!unitId) return [{ label: "Branch" }];
      return [
        { label: "Branch", path: "/units" },
        { label: "TCC Lagos", path: `/units/${unitId}` },
        {
          label:
            tab === "analytics"
              ? "Analytics"
              : tab === "admins"
                ? "Branch admin users"
                : tab === "apps"
                  ? "Apps"
                  : "Details",
        },
      ];
    default:
      return [];
  }
};
