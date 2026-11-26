import api from "@/services/api";
import type {
  BranchCountSummaryResponse,
  BranchMemberRankingParams,
  BranchMemberRankingResponse,
  TenantCongregantsOverviewResponse,
} from "../types/dashboard.types";
import { DASHBOARD_ENDPOINTS } from "./dashboard.api";

export const getBranchCountSummary = async (): Promise<BranchCountSummaryResponse> => {
  const { data } = await api.get<BranchCountSummaryResponse>(
    DASHBOARD_ENDPOINTS.BRANCH_COUNT_SUMMARY,
  );

  return data;
};

export const getTenantCongregantsOverview = async (): Promise<TenantCongregantsOverviewResponse> => {
  const { data } = await api.get<TenantCongregantsOverviewResponse>(
    DASHBOARD_ENDPOINTS.TENANT_CONGREGANTS_OVERVIEW,
  );

  return data;
};

export const getBranchMemberRanking = async (
  params: BranchMemberRankingParams,
): Promise<BranchMemberRankingResponse> => {
  const { data } = await api.get<BranchMemberRankingResponse>(
    DASHBOARD_ENDPOINTS.BRANCH_MEMBER_RANKING,
    { params },
  );

  return data;
};
