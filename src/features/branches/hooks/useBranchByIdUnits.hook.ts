import { useQuery } from "@tanstack/react-query";
import { getBranchByIdUnits } from "../api/branches.service";
import type { BranchByIdUnitsParams } from "../types/branch.types";

export const useBranchByIdUnits = (
  branchId: string | undefined,
  params: BranchByIdUnitsParams,
  enabled = true,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "units",
      params.pageNumber,
      params.limit,
      params.search ?? "",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load units.");
      return getBranchByIdUnits(branchId, params);
    },
    enabled: Boolean(branchId) && enabled,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
