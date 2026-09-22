export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const CROZIERICONS = {
  Dashboard: "Dashboard",
  AdminUsers: "AdminUsers",
  Settings: "Settings",
  Logout: "Logout",
  Hierarchy: "Hierarchy",
  SystemDefault: "SystemDefault",
  CustomRole: "CustomRole",
} as const;

export type CROZIERICONS = (typeof CROZIERICONS)[keyof typeof CROZIERICONS];
