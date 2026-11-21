import { useQuery } from "@tanstack/react-query";
import { getTenantCongregantsOverview } from "../api/dashboard.service";

const tenantCongregantsOverviewQueryKey = [
  "dashboard",
  "tenant-congregants-overview",
] as const;

export const useTenantCongregantsOverview = () =>
  useQuery({
    queryKey: tenantCongregantsOverviewQueryKey,
    queryFn: getTenantCongregantsOverview,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
