import type { ApiResponse } from "@/features/dashboard/types/dashboard.types";
import type { AnalyticsFilter } from "@/features/dashboard/types/dashboard.types";

export interface BranchUserCustomStatus {
  Worker: string;
  Regular: string;
  Inactive: string;
  First_Timer: string;
  Second_Timer: string;
}

export interface TenantBranch {
  id: string;
  tenantId: string;
  userCustomStatus: BranchUserCustomStatus;
  parentBranchId: string | null;
  name: string;
  logo: string | null;
  address: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenantBranchesMeta {
  page: number;
  pageSize: number;
  totalRecord: number;
  totalPages: number;
}

export interface TenantBranchesData {
  meta: TenantBranchesMeta;
  docs: TenantBranch[];
}

export interface TenantBranchesParams {
  pageNumber: number;
  limit: number;
  search?: string;
}

export type TenantBranchesResponse = ApiResponse<{
  message: string;
  data: TenantBranchesData;
}>;

export interface CreateBranchPayload {
  name: string;
  address: string;
  slug: string;
  isCellGroup?: boolean;
  logo?: string;
  parentBranchId?: string;
}

export interface CreatedBranch {
  id: string;
  tenantId: string;
  name: string;
  address: string;
  slug: string;
  logo: string | null;
  parentBranchId: string | null;
  customVisitorsStatus: Record<"0" | "1" | "2", string>;
  customNewConvertStatus: Record<"0" | "1" | "2" | "3", string>;
  customDesignation: Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", string>;
  activeMemberSettings: {
    status: string;
    numberOfServices: number;
    timeRange: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchSuccessResponse {
  success: true;
  status: 201;
  message: string;
  error: false;
  data: CreatedBranch;
}

export interface CreateBranchSlugTakenResponse {
  success: true;
  status: 200;
  message: string;
  error: true;
  data: {
    suggestion: string;
  };
}

export type CreateBranchResponse =
  | CreateBranchSuccessResponse
  | CreateBranchSlugTakenResponse;

export interface BranchByIdTenantTheme {
  primaryColour: string;
  generatedTheme: Record<string, string>;
}

export interface BranchByIdTenant {
  id: string;
  name: string;
  abbreviatedName: string;
  logo: string | null;
  email: string;
  phoneNumber: string | null;
  organizationEmail: string;
  organizationPhoneNumber: string;
  subscriptionPlan: string;
  isVerified: boolean;
  theme: BranchByIdTenantTheme;
}

export interface BranchByIdDetails {
  id: string;
  tenantId: string;
  customVisitorsStatus: Record<"0" | "1" | "2" | "3" | "4", string>;
  customNewConvertStatus: Record<"0" | "1" | "2" | "3", string>;
  customDesignation: Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", string>;
  activeMemberSettings: {
    status: string;
    timeRange: number;
    numberOfServices: number;
  };
  parentBranchId: string | null;
  name: string;
  logo: string | null;
  address: string;
  email: string;
  phoneNumber: string;
  addressCountry: string;
  addressLine1: string;
  addressCity: string;
  addressState: string;
  addressPostcode: string;
  isHq: boolean;
  residentPastor: null;
  isPrimaryBranch: boolean;
  isSubBranch: boolean;
  isCellGroup: boolean;
  theme: BranchByIdTenantTheme | null;
  slug: string;
  roleId: string | null;
  TenantModel: BranchByIdTenant;
}

export type BranchByIdDetailsResponse = ApiResponse<{
  message: string;
  data: BranchByIdDetails;
}>;

export type EditBranchByIdStatus = "active" | "inactive";

export interface EditBranchByIdAddress {
  country?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  postcode?: string;
}

export interface EditBranchByIdActiveMemberSettings {
  status?: EditBranchByIdStatus;
  numberOfServices?: number;
  timeRange?: number;
}

export interface EditBranchByIdTheme {
  primaryColour: string;
  generatedTheme?: Record<`${number}`, string>;
}

export type EditBranchByIdCustomLabels = {
  [index: `${number}`]: string | null;
};

export interface EditBranchByIdPayload {
  branchName?: string;
  isHq?: boolean;
  email?: string;
  residentPastor?: string;
  phoneNumber?: string;
  address?: EditBranchByIdAddress;
  activeMemberSettings?: EditBranchByIdActiveMemberSettings;
  theme?: EditBranchByIdTheme;
  customDesignation?: EditBranchByIdCustomLabels;
  customVisitorsStatus?: EditBranchByIdCustomLabels;
  customNewConvertStatus?: EditBranchByIdCustomLabels;
}

export interface EditBranchByIdResult {
  id: string;
  branchName: string;
  isHq: boolean;
  email: string;
  phoneNumber: string;
  address: {
    country: string;
    addressLine1: string;
    city: string;
    state: string;
    postcode: string;
  };
  activeMemberSettings: {
    status: EditBranchByIdStatus;
    numberOfServices: number;
    timeRange: number;
  };
  theme: EditBranchByIdTheme;
  customDesignation: EditBranchByIdCustomLabels;
  customVisitorsStatus: EditBranchByIdCustomLabels;
  customNewConvertStatus: EditBranchByIdCustomLabels;
}

export interface EditBranchByIdResponse {
  success: true;
  status: 200;
  message: string;
  data: EditBranchByIdResult;
}

export interface EditBranchByIdVariables {
  branchId: string;
  payload: EditBranchByIdPayload;
}

export interface BranchByIdVisitorStatusParams {
  filter: AnalyticsFilter;
  year?: string;
}

export interface BranchByIdVisitorStatusPeriod {
  start: string;
  end: string;
}

export interface BranchByIdVisitorStatusMetadata {
  filter: AnalyticsFilter;
  year: string;
  current_period: BranchByIdVisitorStatusPeriod;
}

export interface BranchByIdVisitorStatusCategory {
  status_label: string;
  status_index: number;
  count: number;
  previous_count: number;
  percentage_change: number | null;
}

export interface BranchByIdVisitorStatusData {
  metadata: BranchByIdVisitorStatusMetadata;
  categories: BranchByIdVisitorStatusCategory[];
}

export type BranchByIdVisitorStatusResponse = ApiResponse<{
  message: string;
  data: BranchByIdVisitorStatusData;
}>;

export interface BranchByIdVisitorConversionPeriod {
  start_date: string;
  end_date: string;
  total_visitors: number;
  converted_visitors: number;
  unconverted_visitors: number;
}

export interface BranchByIdVisitorConversionData {
  metadata: {
    filter: "6_months";
  };
  analytics: BranchByIdVisitorConversionPeriod[];
}

export interface BranchByIdVisitorConversionResponse {
  success: true;
  status: 200;
  message: string;
  data: BranchByIdVisitorConversionData;
}

export interface BranchByIdNewConvertStatusParams {
  filter: AnalyticsFilter;
  year?: string;
}

export interface BranchByIdNewConvertStatusMetadata {
  filter: AnalyticsFilter;
  year: string;
  current_period: {
    start: string;
    end: string;
  };
}

export interface BranchByIdNewConvertStatusCategory {
  status_label: string;
  status_index: number;
  count: number;
  previous_count: number;
  percentage_change: number | null;
}

export interface BranchByIdNewConvertStatusData {
  metadata: BranchByIdNewConvertStatusMetadata;
  categories: BranchByIdNewConvertStatusCategory[];
}

export interface BranchByIdNewConvertStatusResponse {
  success: true;
  status: 200;
  message: string;
  data: BranchByIdNewConvertStatusData;
}

export interface BranchByIdMemberGrowthParams {
  filter: AnalyticsFilter;
}

export interface BranchByIdMemberGrowthPeriod {
  start_date: string;
  end_date: string;
  value: number;
  previous_period_value: number;
  percentage_change: number | null;
}

export interface BranchByIdMemberGrowthData {
  metadata: {
    filter: AnalyticsFilter;
    overall: {
      total: number;
    };
  };
  analytics: BranchByIdMemberGrowthPeriod[];
}

export type BranchByIdMemberGrowthResponse = ApiResponse<{
  message: string;
  data: BranchByIdMemberGrowthData;
}>;

export type BranchByIdMemberSummaryActivityStatus = "all" | "active" | "inactive";

export interface BranchByIdMemberSummaryParams {
  activityStatus: BranchByIdMemberSummaryActivityStatus;
}

export interface BranchByIdMemberSummaryTotal {
  total: number;
}

export interface BranchByIdMemberSummaryData {
  visitors: BranchByIdMemberSummaryTotal;
  new_converts: BranchByIdMemberSummaryTotal;
  members: BranchByIdMemberSummaryTotal;
  workers: BranchByIdMemberSummaryTotal;
  others: BranchByIdMemberSummaryTotal;
}

export interface BranchByIdMemberSummaryResponse {
  success: true;
  status: 200;
  message: string;
  data: BranchByIdMemberSummaryData;
}

export interface BranchByIdUnitAnalyticsData {
  total_units: number;
  total_workers: number;
}

export interface BranchByIdUnitAnalyticsResponse {
  success: true;
  status: 200;
  message: string;
  data: BranchByIdUnitAnalyticsData;
}

export interface BranchByIdUnitWorkerAnalyticsEntry {
  unitId: string;
  unitName: string;
  workerCount: number;
}

export interface BranchByIdUnitWorkerAnalyticsResponse {
  success: true;
  status: 200;
  message: string;
  data: BranchByIdUnitWorkerAnalyticsEntry[];
}

export type BranchByIdWorkerRole = "Admin" | "Worker";

export interface BranchByIdWorkerUnit {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
}

export interface BranchByIdWorkerProfile {
  id: string;
  unitId: string | null;
  isLoggedIn: boolean;
  status: string;
  role: BranchByIdWorkerRole;
  lastSeen: string;
  isSuperAdmin: boolean;
  unit: BranchByIdWorkerUnit | null;
}

export interface BranchByIdWorker {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  status: string;
  gender: string | null;
  profileImage: string | null;
  workerProfile?: BranchByIdWorkerProfile[];
}

export interface BranchByIdWorkersMeta {
  page: number;
  pageSize: number;
  totalRecord: number;
  totalPages: number;
}

export interface BranchByIdWorkersData {
  meta: BranchByIdWorkersMeta;
  docs: BranchByIdWorker[];
}

export interface BranchByIdWorkersParams {
  pageNumber: number;
  limit: number;
  search?: string;
  filter?: BranchByIdWorkerRole;
}

export type BranchByIdWorkersResponse = ApiResponse<{
  message: string;
  data: BranchByIdWorkersData;
}>;

export type EditBranchByIdWorkerRole = "Worker" | "Admin" | "Member";

export interface EditBranchByIdWorkerPayload {
  role: EditBranchByIdWorkerRole;
  unitId?: string;
}

export interface EditBranchByIdWorkerVariables {
  workerId: string;
  payload: EditBranchByIdWorkerPayload;
}

export type EditBranchByIdWorkerResponse = ApiResponse<{
  message: string;
  data: {
    id: string;
    role: EditBranchByIdWorkerRole;
    unitId: string | null;
  };
}>;

export interface BranchByIdUnitHead {
  userId: string;
  imageUrl: string | null;
  firstName: string;
  lastName: string;
  primaryPhonenumber: string | null;
  secondaryPhonenumber: string | null;
  emailAddress: string;
}

export interface BranchByIdUnit {
  id: string;
  name: string;
  avatar: string | null;
  workerCount: number;
  unitHead: BranchByIdUnitHead | null;
}

export interface BranchByIdUnitsParams {
  pageNumber: number;
  limit: number;
  search?: string;
}

export interface BranchByIdUnitsData {
  meta: BranchByIdWorkersMeta;
  docs: BranchByIdUnit[];
}

export type BranchByIdUnitsResponse = ApiResponse<{
  message: string;
  data: BranchByIdUnitsData;
}>;
