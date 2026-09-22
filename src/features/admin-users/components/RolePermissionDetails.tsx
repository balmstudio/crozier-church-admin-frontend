import PermissionGroupCard from "@/features/admin-users/components/PermissionGroupCard";
import { rolePermissionGroups } from "@/features/admin-users/data/role-permissions";
import type { PermissionGroup } from "@/features/admin-users/types/permission.types";
import { CROZIERICONS, Icon } from "@/components/icons";

interface RolePermissionDetailsProps {
  selected: Set<string>;
  editable?: boolean;
  onToggleGroup?: (group: PermissionGroup) => void;
  onTogglePermission?: (permissionId: string) => void;
}

const SectionTitle = ({ children }: { children: string }) => (
  <div
    className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary
    px-3 text-sm font-medium text-crozier-text-heading"
  >
    <Icon type={CROZIERICONS.AdminUsers} size={12} className="text-crozier-icon-accent" />
    {children}
  </div>
);

const RolePermissionDetails = ({
  selected,
  editable = false,
  onToggleGroup,
  onTogglePermission,
}: RolePermissionDetailsProps) => {
  const groups = editable
    ? rolePermissionGroups
    : rolePermissionGroups
        .map((group) => ({
          ...group,
          permissions: group.permissions.filter((permission) => selected.has(permission.id)),
        }))
        .filter((group) => group.permissions.length);

  return (
    <>
      <SectionTitle>Role permissions</SectionTitle>
      {editable && (
        <p className="text-sm text-crozier-text-placeholder">
          Select permissions <span className="text-crozier-text-heading">*</span>
        </p>
      )}
      <div className="space-y-3">
        {groups.map((group) =>
          editable ? (
            <PermissionGroupCard
              key={group.id}
              group={group}
              selected={selected}
              onToggleGroup={() => onToggleGroup?.(group)}
              onTogglePermission={(id) => onTogglePermission?.(id)}
            />
          ) : (
            <div
              key={group.id}
              className="rounded-lg border border-crozier-border-primary
            bg-crozier-surface-primary px-3 py-3"
            >
              <p className="text-sm font-medium text-crozier-text-body">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {group.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="flex items-center gap-2
                  text-sm text-crozier-text-body-light"
                  >
                    {permission.label}
                    <span
                      className="grid size-4 place-items-center rounded
                    bg-crozier-text-accent text-[11px] text-neutral-white"
                    >
                      ✓
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default RolePermissionDetails;
