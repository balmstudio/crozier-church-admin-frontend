import { useQuery } from "@tanstack/react-query";
import { getBranchByIdVisitorStatus } from "../api/branches.service";
import type { BranchByIdVisitorStatusParams } from "../types/branch.types";

export const useBranchByIdVisitorStatus = (
  branchId: string | undefined,
  params: BranchByIdVisitorStatusParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "visitor-status",
      params.filter,
      params.year ?? "",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load visitor analytics.");
      return getBranchByIdVisitorStatus(branchId, params);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
