import type { ReactNode } from "react";
import { getInitials } from "@/utils/getInitials";
import type { AdminUser } from "@/features/admin-users/types/admin-user.types";
import { CROZIERICONS, Icon } from "@/components/icons";
interface AdminUserAccessDetailsProps {
  user: AdminUser;
  roleField: ReactNode;
}

const AdminUserAccessDetails = ({ user, roleField }: AdminUserAccessDetailsProps) => (
  <div>
    <div className="mb-7 flex items-center gap-3">
      <span
        className="grid size-11.5 shrink-0 place-items-center rounded-full
        bg-crozier-surface-primary-tint text-2xl font-normal text-crozier-text-heading"
      >
        {getInitials(user.name)}
      </span>
      <span className="min-w-0 text-base leading-5">
        <strong className="block truncate font-normal text-crozier-text-body">{user.name}</strong>
        <span className="block truncate text-crozier-text-placeholder">{user.email}</span>
      </span>
    </div>
    <div
      className="mb-3 flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary
      px-3 text-sm font-medium text-crozier-text-heading"
    >
      <Icon type={CROZIERICONS.Hierarchy} size={12} className="text-crozier-icon-accent" />
      Access details
    </div>
    {roleField}
  </div>
);

export default AdminUserAccessDetails;
