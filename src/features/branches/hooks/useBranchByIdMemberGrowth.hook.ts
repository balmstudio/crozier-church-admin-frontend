import { useQuery } from "@tanstack/react-query";
import { getBranchByIdMemberGrowth } from "../api/branches.service";
import type { BranchByIdMemberGrowthParams } from "../types/branch.types";

export const useBranchByIdMemberGrowth = (
  branchId: string | undefined,
  params: BranchByIdMemberGrowthParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "member-growth",
      params.filter,
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load member growth.");
      return getBranchByIdMemberGrowth(branchId, params);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
