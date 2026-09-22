import type { DataTableColumn } from "@/components/ui/data-table";
import AdminUserActions from "@/features/admin-users/components/AdminUserActions";
import type { AdminUser } from "@/features/admin-users/types/admin-user.types";
import { getInitials } from "@/utils/getInitials";

export const adminUserColumns: DataTableColumn<AdminUser>[] = [
  {
    id: "personal-details",
    header: "Personal details",
    headerClassName: "w-[56%]",
    className: "px-2",
    cell: (user) => (
      <div className="flex items-center gap-2">
        {user.avatar ? (
          <img src={user.avatar} alt="" className="size-7.5 shrink-0 rounded-full object-cover" />
        ) : (
          <span
            className="grid size-7.5 shrink-0 place-items-center rounded-full
            bg-crozier-surface-primary-tint text-sm font-medium text-crozier-text-heading"
          >
            {getInitials(user.name)}
          </span>
        )}
        <span className="min-w-0 leading-4">
          <strong className="block truncate font-normal text-crozier-text-body">{user.name}</strong>
          <span className="block truncate text-crozier-text-placeholder">{user.email}</span>
        </span>
      </div>
    ),
  },
  {
    id: "role",
    header: "Role",
    headerClassName: "w-[25%]",
    cell: (user) => user.role,
  },
  {
    id: "last-active",
    header: "Last active",
    headerClassName: "w-[15%]",
    cell: (user) => user.lastActive,
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    headerClassName: "w-[4%]",
    className: "text-right",
    cell: (user) => <AdminUserActions user={user} />,
  },
];
