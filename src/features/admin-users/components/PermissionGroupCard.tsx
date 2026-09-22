import type { PermissionGroup } from "@/features/admin-users/types/permission.types";

interface PermissionGroupCardProps {
  group: PermissionGroup;
  selected: Set<string>;
  onToggleGroup: (group: PermissionGroup) => void;
  onTogglePermission: (permissionId: string) => void;
}

const PermissionCheckbox = ({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) => (
  <label
    className="flex cursor-pointer items-center gap-2 text-sm
    text-crozier-text-body-light"
  >
    <span>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="size-4 cursor-pointer rounded border-crozier-text-placeholder
        accent-crozier-text-action"
    />
  </label>
);

const PermissionGroupCard = ({
  group,
  selected,
  onToggleGroup,
  onTogglePermission,
}: PermissionGroupCardProps) => {
  const allSelected = group.permissions.every((permission) => selected.has(permission.id));

  return (
    <fieldset
      className="rounded-lg border border-crozier-border-primary bg-crozier-surface-primary px-3
      py-3 even:bg-crozier-surface-disabled-lightest"
    >
      <legend className="sr-only">{group.label} permissions</legend>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-crozier-text-body">{group.label}</span>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => onToggleGroup(group)}
          aria-label={`Select all ${group.label} permissions`}
          className="size-4 cursor-pointer rounded border-crozier-text-placeholder
            accent-crozier-text-action"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
        {group.permissions.map((permission) => (
          <PermissionCheckbox
            key={permission.id}
            label={permission.label}
            checked={selected.has(permission.id)}
            onChange={() => onTogglePermission(permission.id)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default PermissionGroupCard;
