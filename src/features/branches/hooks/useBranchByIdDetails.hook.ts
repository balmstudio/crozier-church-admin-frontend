import { useQuery } from "@tanstack/react-query";
import { getBranchByIdDetails } from "../api/branches.service";

export const useBranchByIdDetails = (
  branchId: string | undefined,
  enabled = true,
) =>
  useQuery({
    queryKey: ["branches", "branch-by-id", branchId, "details"],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load branch details.");
      return getBranchByIdDetails(branchId);
    },
    enabled: Boolean(branchId) && enabled,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
