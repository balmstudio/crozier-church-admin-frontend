export const BRANCH_ENDPOINTS = {
  CREATE: "/branch",
  BRANCH_BY_ID_DETAILS: (branchId: string) => `/branch/find/${branchId}`,
  EDIT_BRANCH_BY_ID: (branchId: string) => `/branch/${branchId}`,
  BRANCH_BY_ID_VISITOR_STATUS: (branchId: string) =>
    `/analytics/visitor-status/${branchId}`,
  BRANCH_BY_ID_VISITOR_CONVERSION: (branchId: string) =>
    `/analytics/visitor-conversion/${branchId}`,
  BRANCH_BY_ID_NEW_CONVERT_STATUS: (branchId: string) =>
    `/analytics/new-convert-status/${branchId}`,
  BRANCH_BY_ID_MEMBER_GROWTH: (branchId: string) =>
    `/analytics/member-growth/${branchId}`,
  BRANCH_BY_ID_MEMBER_SUMMARY: (branchId: string) =>
    `/analytics/branch-member-summary/${branchId}`,
  BRANCH_BY_ID_UNIT_ANALYTICS: (branchId: string) =>
    `/analytics/units/${branchId}`,
  BRANCH_BY_ID_UNIT_WORKER_ANALYTICS: (branchId: string) =>
    `/analytics/units/workers/${branchId}`,
  BRANCH_BY_ID_WORKERS: (branchId: string) => `/workers/branch/${branchId}`,
  EDIT_BRANCH_BY_ID_WORKER: (workerId: string) => `/workers/edit-details/${workerId}`,
  BRANCH_BY_ID_UNITS: (branchId: string) => `/units/${branchId}`,
  TENANT_BRANCHES: (tenantId: string) => `/branch/tenant/${tenantId}`,
} as const;
