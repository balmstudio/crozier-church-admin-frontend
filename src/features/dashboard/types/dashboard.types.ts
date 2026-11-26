export type TrendDirection = "up" | "down" | "neutral";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: {
    direction: TrendDirection;
    value: string;
  };
}

export interface StackedBarDatum {
  label: string;
  primary: number;
  secondary: number;
}

export interface AreaChartDatum {
  label: string;
  value: number;
}

export interface DonutChartDatum {
  name: string;
  value: number;
  color: string;
}

export type AnalyticsFilter =
  | "recent_month"
  | "3_months"
  | "6_months"
  | "year";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: "units" | "workers";
}

// API integration types
export interface ApiResponseMetadata {
  success: boolean;
  status: number;
  timestamp: string;
}

export type ApiResponse<T extends object> = ApiResponseMetadata & T;

export interface BranchCountSummary {
  parentBranchCount: number;
  subBranchCount: number;
  cellGroupCount: number;
  totalBranchCount: number;
}

export type BranchCountSummaryResponse = ApiResponse<BranchCountSummary>;

export interface TenantCongregantsOverview {
  totalMembers: number;
  totalWorkers: number;
}

export type TenantCongregantsOverviewResponse = ApiResponse<TenantCongregantsOverview>;

export type BranchMemberRankingStatus = "all" | "active" | "inactive";

export interface BranchMemberRankingParams {
  status: BranchMemberRankingStatus;
  page: number;
  pageSize: number;
}

export interface BranchMemberRankingResult {
  branchId: string;
  branchName: string;
  memberCount: number;
  rank: number;
}

export interface BranchMemberRanking {
  status: BranchMemberRankingStatus;
  count: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  results: BranchMemberRankingResult[];
}

// The endpoint's activity filter overwrites the numeric envelope status at runtime.
export type BranchMemberRankingResponse = Omit<ApiResponseMetadata, "status"> &
  BranchMemberRanking;
