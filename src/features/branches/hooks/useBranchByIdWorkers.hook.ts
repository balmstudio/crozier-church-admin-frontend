import { useQuery } from "@tanstack/react-query";
import { getBranchByIdWorkers } from "../api/branches.service";
import type { BranchByIdWorkersParams } from "../types/branch.types";

export const useBranchByIdWorkers = (
  branchId: string | undefined,
  params: BranchByIdWorkersParams,
) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "workers",
      params.pageNumber,
      params.limit,
      params.search ?? "",
      params.filter ?? "",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load branch workers.");
      return getBranchByIdWorkers(branchId, params);
    },
    enabled: Boolean(branchId),
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
