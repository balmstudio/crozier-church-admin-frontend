import { useState } from "react";
import ConfirmationSideSheet from "@/components/common/ConfirmationSideSheet";
import SideSheet from "@/components/common/SideSheet";
import TableRowActions from "@/components/common/TableRowActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RolePermissionDetails from "@/features/admin-users/components/RolePermissionDetails";
import { useAdminRoles } from "@/features/admin-users/hooks/useAdminRoles";
import { useRoleWorkers } from "@/features/admin-users/hooks/useRoleWorkers";
import type { AdminRoleRecord } from "@/features/admin-users/types/admin-role.types";
import type { PermissionGroup } from "@/features/admin-users/types/permission.types";
import { getInitials } from "@/utils/getInitials";
import { CROZIERICONS, Icon } from "@/components/icons";

type RoleAction =
  "view" | "edit" | "deactivate" | "delete" | "reassign-deactivate" | "reassign-delete" | null;

const countLabels = ["zero", "one", "two", "three"];

const RoleActions = ({ role }: { role: AdminRoleRecord }) => {
  const [action, setAction] = useState<RoleAction>(null);
  const [permissions, setPermissions] = useState(new Set(role.permissionIds));
  const { data: adminRoles = [] } = useAdminRoles();
  const { data: roleWorkers = [] } = useRoleWorkers();
  const workers = roleWorkers.filter((worker) => role.assignedWorkerIds.includes(worker.id));
  const hasWorkers = workers.length > 0;
  const close = () => setAction(null);
  const closeAction = (expectedAction: Exclude<RoleAction, null>) => {
    setAction((current) => (current === expectedAction ? null : current));
  };
  const openAction = (nextAction: Exclude<RoleAction, null>) => {
    window.setTimeout(() => setAction(nextAction), 0);
  };

  const togglePermission = (id: string) =>
    setPermissions((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleGroup = (group: PermissionGroup) =>
    setPermissions((current) => {
      const next = new Set(current);
      const all = group.permissions.every((item) => next.has(item.id));
      group.permissions.forEach((item) => (all ? next.delete(item.id) : next.add(item.id)));
      return next;
    });

  const detailsPanel = (editable: boolean) => (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-7 py-5">
        <div
          className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary
          px-3 text-sm font-medium text-crozier-text-heading"
        >
          <Icon type={CROZIERICONS.AdminUsers} size={12} className="text-crozier-icon-accent" />
          Role details
        </div>
        <label className="grid gap-2 text-sm text-crozier-text-disabled font-normal">
          Name{editable && <span className="sr-only"> required</span>}
          <Input
            defaultValue={role.name}
            readOnly={!editable}
            className="h-10.5 border-0 bg-crozier-surface-primary-tint shadow-none"
          />
        </label>
        <RolePermissionDetails
          selected={permissions}
          editable={editable}
          onToggleGroup={toggleGroup}
          onTogglePermission={togglePermission}
        />
      </div>
      <div className="flex justify-between border-t border-crozier-border-primary px-7 py-4">
        <Button
          variant="outline"
          className="h-9 border-crozier-text-accent px-5
          text-crozier-text-action"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="h-9 bg-crozier-text-action px-6 text-neutral-white"
          onClick={() => (editable ? close() : setAction("edit"))}
        >
          {editable ? "Save" : "Edit"}
        </Button>
      </div>
    </div>
  );

  const assignedWorkersPanel = (kind: "deactivate" | "delete") => (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="space-y-3 px-7 py-4">
        <p className="text-sm leading-5 text-crozier-text-heading">
          {workers.length} members are currently assigned to the {role.name} role.
          {kind === "delete" && " Deleting the role will also disable their platform access."}
          {kind === "deactivate" && " Deactivating the role will disable their platform access."}
        </p>
        <div
          className="flex h-7 items-center gap-2 rounded-lg
            bg-crozier-surface-disabled-lightest px-3 text-sm font-medium
            text-crozier-text-heading"
        >
          <Icon type={CROZIERICONS.Hierarchy} size={8} className="text-crozier-icon-accent" />
          Existing workers assigned to the role
        </div>
        {workers.map((worker) => (
          <div key={worker.id} className="flex items-center gap-3 py-1">
            <span
              className="grid size-7.5 place-items-center rounded-full
              bg-crozier-surface-primary-tint text-xs text-crozier-text-heading"
            >
              {getInitials(worker.name)}
            </span>
            <span className="text-sm">
              <strong
                className="block font-normal
              text-crozier-text-body"
              >
                {worker.name}
              </strong>
              <span className="text-crozier-text-placeholder">{worker.email}</span>
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-auto flex justify-between border-t border-crozier-border-primary
        px-7 py-4"
      >
        <Button
          variant="outline"
          className="h-9 border-crozier-border-error px-5
          text-crozier-text-error"
          onClick={close}
        >
          {kind === "delete" ? "Delete" : "Deactivate"}
        </Button>
        <Button
          className="h-9 bg-crozier-text-action px-5 text-neutral-white"
          onClick={() => setAction(kind === "delete" ? "reassign-delete" : "reassign-deactivate")}
        >
          Reassign workers
        </Button>
      </div>
    </div>
  );

  const reassignPanel = (kind: "deactivate" | "delete") => {
    const reassignmentRoles = adminRoles.slice().sort((first, second) => {
      const order = ["Admin", "Branch super admin", "Worker"];
      return order.indexOf(first.name) - order.indexOf(second.name);
    });

    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="space-y-2 px-7 py-4">
          <p className="text-sm text-crozier-text-heading">
            Reassign the {countLabels[workers.length] ?? workers.length} members to other roles.
          </p>
          <div
            className="flex h-7 items-center gap-2 rounded-lg
              bg-crozier-surface-disabled-lightest px-3 text-sm font-medium
              text-crozier-text-heading"
          >
            <Icon type={CROZIERICONS.Hierarchy} size={8} className="text-crozier-icon-accent" />
            Existing workers to be reassigned
          </div>
          {workers.map((worker) => (
            <div key={worker.id} className="flex min-h-12.5 items-center gap-2">
              <span
                className="grid size-7.5 place-items-center rounded-full
                bg-crozier-surface-primary-tint text-xs text-crozier-text-heading"
              >
                {getInitials(worker.name)}
              </span>
              <span className="min-w-0 text-sm">
                <strong
                  className="block truncate
                font-normal text-crozier-text-body"
                >
                  {worker.name}
                </strong>
                <span
                  className="block
                truncate text-crozier-text-placeholder"
                >
                  {worker.email}
                </span>
              </span>
              <Select
                items={reassignmentRoles.map((item) => ({
                  label: item.name === "Branch super admin" ? "Branch admin" : item.name,
                  value: item.id,
                }))}
                defaultValue={role.id}
              >
                <SelectTrigger
                  className="ml-auto h-6.5! w-16.5 rounded-[10px] border-0
                    bg-crozier-surface-primary-tint px-2 py-0 text-xs
                    text-crozier-text-body shadow-none"
                >
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  sideOffset={4}
                  className="h-28 w-30 min-w-30 rounded-[10px] border
                    border-crozier-border-primary bg-crozier-surface-white-black p-1
                    text-crozier-text-body shadow-md ring-0"
                >
                  {reassignmentRoles.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="h-8 rounded-lg px-2 py-0 text-xs text-crozier-text-body
                        focus:bg-crozier-surface-primary-tint focus:text-crozier-text-body"
                    >
                      {item.name === "Branch super admin" ? "Branch admin" : item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div
          className="mt-auto flex justify-between border-t border-crozier-border-primary
          px-7 py-4"
        >
          <Button
            variant="outline"
            className="h-9 border-crozier-text-accent
          px-5 text-crozier-text-action"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            className="h-9
          bg-crozier-text-error px-5 text-neutral-white hover:bg-crozier-text-error"
            onClick={close}
          >
            {kind === "delete" ? "Delete" : "Deactivate"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <TableRowActions
        label={`Open actions for ${role.name}`}
        actions={[
          { label: "View", onSelect: () => openAction("view") },
          { label: "Edit", onSelect: () => openAction("edit") },
          { label: "Deactivate", onSelect: () => openAction("deactivate") },
          { label: "Delete", onSelect: () => openAction("delete") },
        ]}
      />
      <SideSheet
        title="View role"
        open={action === "view"}
        onOpenChange={(open) => !open && closeAction("view")}
      >
        {detailsPanel(false)}
      </SideSheet>
      <SideSheet
        title="Edit role"
        open={action === "edit"}
        onOpenChange={(open) => !open && closeAction("edit")}
      >
        {detailsPanel(true)}
      </SideSheet>
      {hasWorkers ? (
        <>
          <SideSheet
            title="Confirm role deactivation"
            open={action === "deactivate"}
            onOpenChange={(open) => !open && closeAction("deactivate")}
          >
            {assignedWorkersPanel("deactivate")}
          </SideSheet>
          <SideSheet
            title="Confirm role deletion"
            open={action === "delete"}
            onOpenChange={(open) => !open && closeAction("delete")}
          >
            {assignedWorkersPanel("delete")}
          </SideSheet>
        </>
      ) : (
        <>
          <ConfirmationSideSheet
            open={action === "deactivate"}
            onOpenChange={(open) => !open && closeAction("deactivate")}
            title="Confirm role deactivation"
            heading="Confirm delete action"
            description="Please confirm you want to deactivate the admin role."
            actionLabel="Deactivate"
            onConfirm={close}
          />
          <ConfirmationSideSheet
            open={action === "delete"}
            onOpenChange={(open) => !open && closeAction("delete")}
            title="Confirm role deletion"
            heading="Confirm delete action"
            description="Please confirm you want to delete the admin role."
            actionLabel="Delete"
            onConfirm={close}
          />
        </>
      )}
      <SideSheet
        title="Reassign and deactivate"
        open={action === "reassign-deactivate"}
        onOpenChange={(open) => !open && closeAction("reassign-deactivate")}
      >
        {reassignPanel("deactivate")}
      </SideSheet>
      <SideSheet
        title="Reassign and delete"
        open={action === "reassign-delete"}
        onOpenChange={(open) => !open && closeAction("reassign-delete")}
      >
        {reassignPanel("delete")}
      </SideSheet>
    </>
  );
};

export default RoleActions;
