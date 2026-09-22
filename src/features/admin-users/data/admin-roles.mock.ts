import type { AdminRoleRecord } from "@/features/admin-users/types/admin-role.types";

export const adminRoles: AdminRoleRecord[] = [
  {
    id: "role-1",
    name: "Branch super admin",
    permissions: "All branch permissions",
    type: "System default",
    permissionIds: ["dashboard.view", "branches.view", "admins.view"],
    assignedWorkerIds: [],
  },
  {
    id: "role-2",
    name: "Admin",
    permissions: "All",
    type: "Custom",
    permissionIds: [
      "dashboard.view",
      "branches.create",
      "branches.admins",
      "branches.invite",
      "templates.view",
      "templates.add",
      "templates.create",
      "templates.edit",
      "templates.delete",
      "admins.invite",
      "admins.view",
    ],
    assignedWorkerIds: ["worker-1", "worker-2", "worker-3"],
  },
  {
    id: "role-3",
    name: "Worker",
    permissions: "20",
    type: "Custom",
    permissionIds: ["dashboard.view", "branches.view"],
    assignedWorkerIds: [],
  },
];

export const roleWorkers = [
  { id: "worker-1", name: "Sofia Martinez", email: "sofia.martinez@example.com" },
  { id: "worker-2", name: "Tochi Ifeanyi", email: "tochiifeanyi@gmail.com" },
  { id: "worker-3", name: "Esther Oyewole", email: "eniotoaadesanwo@gmail.com" },
];
