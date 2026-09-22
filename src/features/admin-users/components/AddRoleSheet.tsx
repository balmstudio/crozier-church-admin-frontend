import { useState } from "react";
import SideSheet from "@/components/common/SideSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PermissionGroupCard from "@/features/admin-users/components/PermissionGroupCard";
import { rolePermissionGroups } from "@/features/admin-users/data/role-permissions";
import type { PermissionGroup } from "@/features/admin-users/types/permission.types";
import { CROZIERICONS, Icon } from "@/components/icons";

const AddRoleSheet = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Set<string>>(new Set());

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setStep(1);
  };

  const togglePermission = (permissionId: string) => {
    setPermissions((current) => {
      const next = new Set(current);
      if (next.has(permissionId)) next.delete(permissionId);
      else next.add(permissionId);
      return next;
    });
  };

  const toggleGroup = (group: PermissionGroup) => {
    setPermissions((current) => {
      const next = new Set(current);
      const allSelected = group.permissions.every((permission) => next.has(permission.id));
      group.permissions.forEach((permission) => {
        if (allSelected) next.delete(permission.id);
        else next.add(permission.id);
      });
      return next;
    });
  };

  return (
    <SideSheet
      title="Add role"
      open={open}
      onOpenChange={handleOpenChange}
      trigger={
        <Button
          className="h-8.5 rounded-[10px] bg-crozier-text-action px-5 text-sm
          text-neutral-white hover:bg-crozier-text-action"
        >
          Add
        </Button>
      }
    >
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 1) setStep(2);
        }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-5">
          <div
            className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary
            px-3 text-sm font-medium text-crozier-text-heading"
          >
            <Icon type={CROZIERICONS.AdminUsers} size={12} className="text-crozier-icon-accent" />
            {step === 1 ? "Role details" : "Role permissions"}
          </div>

          {step === 1 ? (
            <div className="mt-4 grid gap-2">
              <Label
                htmlFor="role-name"
                className="text-sm font-normal
                text-crozier-text-placeholder"
              >
                Name <span className="text-crozier-text-heading">*</span>
              </Label>
              <Input
                id="role-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter role name"
                className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm
                  shadow-none placeholder:text-crozier-text-placeholder focus-visible:ring-1
                  focus-visible:ring-crozier-text-accent"
                required
              />
            </div>
          ) : (
            <div className="mt-4">
              <p className="mb-2 text-sm text-crozier-text-placeholder">
                Select permissions <span className="text-crozier-text-heading">*</span>
              </p>
              <div className="space-y-3">
                {rolePermissionGroups.map((group) => (
                  <PermissionGroupCard
                    key={group.id}
                    group={group}
                    selected={permissions}
                    onToggleGroup={toggleGroup}
                    onTogglePermission={togglePermission}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between border-t
          border-crozier-border-primary px-7 py-4"
        >
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-lg border-crozier-text-accent px-5 text-crozier-text-action
              hover:bg-crozier-surface-primary-tint"
            onClick={() => (step === 1 ? setOpen(false) : setStep(1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            type={step === 1 ? "submit" : "button"}
            className="h-9 rounded-lg bg-crozier-text-action px-6 text-neutral-white
              hover:bg-crozier-text-action"
            disabled={step === 1 ? !name.trim() : permissions.size === 0}
          >
            {step === 1 ? "Next" : "Create role"}
          </Button>
        </div>
      </form>
    </SideSheet>
  );
};

export default AddRoleSheet;
