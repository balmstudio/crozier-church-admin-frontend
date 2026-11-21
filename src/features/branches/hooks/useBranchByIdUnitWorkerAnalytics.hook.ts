import { useQuery } from "@tanstack/react-query";
import { getBranchByIdUnitWorkerAnalytics } from "../api/branches.service";

export const useBranchByIdUnitWorkerAnalytics = (branchId: string | undefined) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "unit-workers",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load unit workers.");
      return getBranchByIdUnitWorkerAnalytics(branchId);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
