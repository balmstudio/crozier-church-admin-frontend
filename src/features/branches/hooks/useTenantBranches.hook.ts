import { useQuery } from "@tanstack/react-query";
import { getTenantBranches } from "../api/branches.service";
import type { TenantBranchesParams } from "../types/branch.types";

export const useTenantBranches = (
  tenantId: string | undefined,
  params: TenantBranchesParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "tenant",
      tenantId,
      params.pageNumber,
      params.limit,
      params.search ?? "",
    ],
    queryFn: () => {
      if (!tenantId) throw new Error("A tenant ID is required to load branches.");
      return getTenantBranches(tenantId, params);
    },
    enabled: Boolean(tenantId),
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
