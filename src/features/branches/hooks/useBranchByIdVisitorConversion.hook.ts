import { useQuery } from "@tanstack/react-query";
import { getBranchByIdVisitorConversion } from "../api/branches.service";

export const useBranchByIdVisitorConversion = (branchId: string | undefined) =>
  useQuery({
    queryKey: [
      "branches",
      "branch-by-id",
      branchId,
      "analytics",
      "visitor-conversion",
    ],
    queryFn: () => {
      if (!branchId) throw new Error("A branch ID is required to load visitor conversions.");
      return getBranchByIdVisitorConversion(branchId);
    },
    enabled: Boolean(branchId),
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
