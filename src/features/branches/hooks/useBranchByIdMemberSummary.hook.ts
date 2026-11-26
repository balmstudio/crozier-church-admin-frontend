import { useQuery } from "@tanstack/react-query";
import { getBranchByIdMemberSummary } from "../api/branches.service";
import type { BranchByIdMemberSummaryParams } from "../types/branch.types";

export const useBranchByIdMemberSummary = (
  branchId: string | undefined,
  params: BranchByIdMemberSummaryParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "member-summary",
      params.activityStatus,
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load member summary.");
      return getBranchByIdMemberSummary(branchId, params);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
