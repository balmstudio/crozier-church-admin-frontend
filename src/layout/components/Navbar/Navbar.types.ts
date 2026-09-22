export interface NavbarBreadcrumb {
  label: string;
  path?: string;
}

export interface NavbarProps {
  breadcrumbs: NavbarBreadcrumb[];
  brand?: { name: string; logo: string };
  hasUnreadNotifications?: boolean;
  className?: string;
  onNotificationsClick?: () => void;
}
