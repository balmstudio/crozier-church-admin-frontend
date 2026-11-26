import { useQuery } from "@tanstack/react-query";
import { getBranchCountSummary } from "../api/dashboard.service";

const branchCountSummaryQueryKey = ["dashboard", "branch-count-summary"] as const;

export const useBranchCountSummary = () =>
  useQuery({
    queryKey: branchCountSummaryQueryKey,
    queryFn: getBranchCountSummary,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
