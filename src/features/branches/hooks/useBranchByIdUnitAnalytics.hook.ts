import { useQuery } from "@tanstack/react-query";
import { getBranchByIdUnitAnalytics } from "../api/branches.service";

export const useBranchByIdUnitAnalytics = (branchId: string | undefined) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "units-overview",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load unit analytics.");
      return getBranchByIdUnitAnalytics(branchId);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
