import api from "@/services/api";
import type {
  BranchByIdDetailsResponse,
  BranchByIdVisitorStatusParams,
  BranchByIdVisitorStatusResponse,
  BranchByIdVisitorConversionResponse,
  BranchByIdNewConvertStatusParams,
  BranchByIdNewConvertStatusResponse,
  BranchByIdMemberGrowthParams,
  BranchByIdMemberGrowthResponse,
  BranchByIdMemberSummaryParams,
  BranchByIdMemberSummaryResponse,
  BranchByIdUnitAnalyticsResponse,
  BranchByIdUnitWorkerAnalyticsResponse,
  BranchByIdWorkersParams,
  BranchByIdWorkersResponse,
  BranchByIdUnitsParams,
  BranchByIdUnitsResponse,
  EditBranchByIdWorkerResponse,
  EditBranchByIdWorkerVariables,
  CreateBranchPayload,
  CreateBranchResponse,
  EditBranchByIdResponse,
  EditBranchByIdVariables,
  TenantBranchesParams,
  TenantBranchesResponse,
} from "../types/branch.types";
import { BRANCH_ENDPOINTS } from "./branches.api";

export const getBranchByIdDetails = async (
  branchId: string,
): Promise<BranchByIdDetailsResponse> => {
  const { data } = await api.get<BranchByIdDetailsResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_DETAILS(branchId),
  );

  return data;
};

export const editBranchById = async ({
  branchId,
  payload,
}: EditBranchByIdVariables): Promise<EditBranchByIdResponse> => {
  const { data } = await api.patch<EditBranchByIdResponse>(
    BRANCH_ENDPOINTS.EDIT_BRANCH_BY_ID(branchId),
    payload,
  );

  return data;
};

export const getBranchByIdVisitorStatus = async (
  branchId: string,
  params: BranchByIdVisitorStatusParams,
): Promise<BranchByIdVisitorStatusResponse> => {
  const { data } = await api.get<BranchByIdVisitorStatusResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_VISITOR_STATUS(branchId),
    { params },
  );

  return data;
};

export const getBranchByIdVisitorConversion = async (
  branchId: string,
): Promise<BranchByIdVisitorConversionResponse> => {
  const { data } = await api.get<BranchByIdVisitorConversionResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_VISITOR_CONVERSION(branchId),
  );

  return data;
};

export const getBranchByIdNewConvertStatus = async (
  branchId: string,
  params: BranchByIdNewConvertStatusParams,
): Promise<BranchByIdNewConvertStatusResponse> => {
  const { data } = await api.get<BranchByIdNewConvertStatusResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_NEW_CONVERT_STATUS(branchId),
    { params },
  );

  return data;
};

export const getBranchByIdMemberGrowth = async (
  branchId: string,
  params: BranchByIdMemberGrowthParams,
): Promise<BranchByIdMemberGrowthResponse> => {
  const { data } = await api.get<BranchByIdMemberGrowthResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_MEMBER_GROWTH(branchId),
    { params },
  );

  return data;
};

export const getBranchByIdMemberSummary = async (
  branchId: string,
  params: BranchByIdMemberSummaryParams,
): Promise<BranchByIdMemberSummaryResponse> => {
  const { data } = await api.get<BranchByIdMemberSummaryResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_MEMBER_SUMMARY(branchId),
    { params },
  );

  return data;
};

export const getBranchByIdUnitAnalytics = async (
  branchId: string,
): Promise<BranchByIdUnitAnalyticsResponse> => {
  const { data } = await api.get<BranchByIdUnitAnalyticsResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_UNIT_ANALYTICS(branchId),
  );

  return data;
};

export const getBranchByIdUnitWorkerAnalytics = async (
  branchId: string,
): Promise<BranchByIdUnitWorkerAnalyticsResponse> => {
  const { data } = await api.get<BranchByIdUnitWorkerAnalyticsResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_UNIT_WORKER_ANALYTICS(branchId),
  );

  return data;
};

export const getBranchByIdWorkers = async (
  branchId: string,
  params: BranchByIdWorkersParams,
): Promise<BranchByIdWorkersResponse> => {
  const { data } = await api.get<BranchByIdWorkersResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_WORKERS(branchId),
    { params },
  );

  return data;
};

export const editBranchByIdWorker = async ({
  workerId,
  payload,
}: EditBranchByIdWorkerVariables): Promise<EditBranchByIdWorkerResponse> => {
  const { data } = await api.post<EditBranchByIdWorkerResponse>(
    BRANCH_ENDPOINTS.EDIT_BRANCH_BY_ID_WORKER(workerId),
    payload,
  );

  return data;
};

export const getBranchByIdUnits = async (
  branchId: string,
  params: BranchByIdUnitsParams,
): Promise<BranchByIdUnitsResponse> => {
  const { data } = await api.get<BranchByIdUnitsResponse>(
    BRANCH_ENDPOINTS.BRANCH_BY_ID_UNITS(branchId),
    { params },
  );

  return data;
};

export const createBranch = async (
  payload: CreateBranchPayload,
): Promise<CreateBranchResponse> => {
  const { data } = await api.post<CreateBranchResponse>(
    BRANCH_ENDPOINTS.CREATE,
    payload,
  );

  return data;
};

export const getTenantBranches = async (
  tenantId: string,
  params: TenantBranchesParams,
): Promise<TenantBranchesResponse> => {
  const { data } = await api.get<TenantBranchesResponse>(
    BRANCH_ENDPOINTS.TENANT_BRANCHES(tenantId),
    { params },
  );

  return data;
};
