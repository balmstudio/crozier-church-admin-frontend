import DashboardIcon from "./svg/DashboardIcon";
import AppGridIcon from "./svg/AppGridIcon";
import AdminUsersIcon from "./svg/AdminUsersIcon";
import LogoutIcon from "./svg/LogoutIcon";
import SettingsIcon from "./svg/SettingsIcon";
import HierarchyIcon from "./svg/HierarchyIcon";
import SystemDefaultIcon from "./svg/SystemDefaultIcon";
import CustomRoleIcon from "./svg/CustomRoleIcon";
import { CROZIERICONS, type IconProps } from "./@type";

interface AppIconProps extends IconProps {
  type: CROZIERICONS;
}

const icons = {
  [CROZIERICONS.Dashboard]: DashboardIcon,
  [CROZIERICONS.AppGrid]: AppGridIcon,
  [CROZIERICONS.AdminUsers]: AdminUsersIcon,
  [CROZIERICONS.Settings]: SettingsIcon,
  [CROZIERICONS.Logout]: LogoutIcon,
  [CROZIERICONS.Hierarchy]: HierarchyIcon,
  [CROZIERICONS.SystemDefault]: SystemDefaultIcon,
  [CROZIERICONS.CustomRole]: CustomRoleIcon,
} satisfies Record<CROZIERICONS, React.ComponentType<IconProps>>;

export default function Icon({
  type,
  size = 20,
  width,
  height,
  color,
  className = "",
}: AppIconProps) {
  const SvgIcon = icons[type];
  const iconClasses = `${color ?? ""} ${className}`.trim();

  return <SvgIcon size={size} width={width} height={height} className={iconClasses} />;
}
