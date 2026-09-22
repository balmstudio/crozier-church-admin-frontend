import type { PermissionGroup } from "@/features/admin-users/types/permission.types";

export const rolePermissionGroups: PermissionGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    permissions: [{ id: "dashboard.view", label: "View dashboard" }],
  },
  {
    id: "branches",
    label: "Branches",
    permissions: [
      { id: "branches.create", label: "Create branch" },
      { id: "branches.view", label: "View branches" },
      { id: "branches.details", label: "View branch details" },
      { id: "branches.analytics", label: "View branch analytics" },
      { id: "branches.admins", label: "View branch admin users" },
      { id: "branches.invite", label: "Invite branch admin" },
      { id: "branches.edit", label: "Edit branch admin" },
      { id: "branches.delete", label: "Delete branch admin" },
      { id: "branches.apps.view", label: "View apps" },
      { id: "branches.apps.manage", label: "Manage apps" },
    ],
  },
  {
    id: "templates",
    label: "Templates",
    permissions: [
      { id: "templates.view", label: "View templates" },
      { id: "templates.add", label: "Add template" },
      { id: "templates.create", label: "Create template" },
      { id: "templates.edit", label: "Edit template" },
      { id: "templates.delete", label: "Delete template" },
    ],
  },
  {
    id: "admin-users",
    label: "Admin users",
    permissions: [
      { id: "admins.invite", label: "Invite church admin user" },
      { id: "admins.view", label: "View admin users" },
      { id: "admins.edit", label: "Edit admin user" },
      { id: "admins.delete", label: "Delete admin user" },
    ],
  },
  {
    id: "roles",
    label: "Roles",
    permissions: [
      { id: "roles.create", label: "Create role" },
      { id: "roles.view", label: "View roles" },
      { id: "roles.edit", label: "Edit role" },
      { id: "roles.delete", label: "Delete role" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    permissions: [
      { id: "settings.profile.view", label: "View profile & brand details" },
      { id: "settings.profile.edit", label: "Edit profile & brand details" },
      { id: "settings.defaults.add", label: "Add branch default roles" },
      { id: "settings.defaults.view", label: "View branch default roles" },
      { id: "settings.defaults.edit", label: "Edit branch default roles" },
      { id: "settings.defaults.delete", label: "Delete branch default roles" },
      { id: "settings.templates.view", label: "View template configurations" },
      { id: "settings.templates.update", label: "Update template configurations" },
    ],
  },
];
