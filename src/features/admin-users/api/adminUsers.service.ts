import { adminRoles, roleWorkers } from "../data/admin-roles.mock";
import { adminUsers } from "../data/admin-users.mock";
import type { AdminRoleRecord, RoleWorker } from "../types/admin-role.types";
import type { AdminUser } from "../types/admin-user.types";

export const getAdminUsers = async (): Promise<AdminUser[]> => adminUsers;
export const getAdminRoles = async (): Promise<AdminRoleRecord[]> => adminRoles;
export const getRoleWorkers = async (): Promise<RoleWorker[]> => roleWorkers;
