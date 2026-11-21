import { useQuery } from "@tanstack/react-query";
import { getBranchByIdNewConvertStatus } from "../api/branches.service";
import type { BranchByIdNewConvertStatusParams } from "../types/branch.types";

export const useBranchByIdNewConvertStatus = (
  branchId: string | undefined,
  params: BranchByIdNewConvertStatusParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "new-convert-status",
      params.filter,
      params.year ?? "",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load new convert analytics.");
      return getBranchByIdNewConvertStatus(branchId, params);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
