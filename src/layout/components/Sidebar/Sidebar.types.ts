import type { ReactNode } from "react";
import type { CROZIERICONS } from "@/components/icons/@type";

export interface SidebarItem {
  label: string;
  path: string;
  icon: CROZIERICONS;
  end?: boolean;
}

export interface SidebarBrand {
  name: string;
  logo?: string;
  logoAlt?: string;
}

export interface SidebarUser {
  name: string;
  role: string;
  avatar?: string;
}

export interface SidebarWorkspace {
  name: string;
  description?: string;
  icon?: ReactNode;
}

export interface SidebarProps {
  brand: SidebarBrand;
  items: SidebarItem[];
  user: SidebarUser;
  workspace?: SidebarWorkspace;
  className?: string;
  onLogout?: () => void;
  onWorkspaceClick?: () => void;
}
