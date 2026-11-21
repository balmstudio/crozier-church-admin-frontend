import { useQuery } from "@tanstack/react-query";
import { getBranchMemberRanking } from "../api/dashboard.service";
import type { BranchMemberRankingParams } from "../types/dashboard.types";

export const useBranchMemberRanking = (params: BranchMemberRankingParams) =>
  useQuery({
    queryKey: [
      "dashboard",
      "branch-member-ranking",
      params.status,
      params.page,
      params.pageSize,
    ],
    queryFn: () => getBranchMemberRanking(params),
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
