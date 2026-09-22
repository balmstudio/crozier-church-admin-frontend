export const adminUserKeys = {
  all: ["admin-users"] as const,
  lists: () => [...adminUserKeys.all, "list"] as const,
  roles: () => [...adminUserKeys.all, "roles"] as const,
  roleWorkers: () => [...adminUserKeys.all, "role-workers"] as const,
};
