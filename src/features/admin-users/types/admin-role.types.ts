export type AdminRoleType = "System default" | "Custom";

export interface AdminRoleRecord {
  id: string;
  name: string;
  permissions: string;
  type: AdminRoleType;
  permissionIds: string[];
  assignedWorkerIds: string[];
}

export interface RoleWorker {
  id: string;
  name: string;
  email: string;
}
