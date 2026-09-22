import type { DataTableColumn } from "@/components/ui/data-table";
import RoleActions from "@/features/admin-users/components/RoleActions";
import type { AdminRoleRecord } from "@/features/admin-users/types/admin-role.types";

export const adminRoleColumns: DataTableColumn<AdminRoleRecord>[] = [
  {
    id: "role",
    header: "Role",
    headerClassName: "w-[45%]",
    cell: (role) => role.name,
  },
  {
    id: "permissions",
    header: "Permissions",
    headerClassName: "w-[36%]",
    cell: (role) => role.permissions,
  },
  {
    id: "type",
    header: "Type",
    cell: (role) => role.type,
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    headerClassName: "w-14",
    className: "text-right",
    cell: (role) => <RoleActions role={role} />,
  },
];
