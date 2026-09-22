export type AdminRole = "Branch super admin" | "Church super admin" | "Admin" | "Worker" | "Church admin";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  unit: string | null;
  lastActive: string;
  lastActiveISO: string;
  avatar?: string;
}
