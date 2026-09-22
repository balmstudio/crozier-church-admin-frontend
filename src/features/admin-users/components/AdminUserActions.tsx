import { useState } from "react";
import ConfirmationSideSheet from "@/components/common/ConfirmationSideSheet";
import SideFormSheet from "@/components/common/SideFormSheet";
import SideSheet from "@/components/common/SideSheet";
import TableRowActions from "@/components/common/TableRowActions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminUserAccessDetails from "@/features/admin-users/components/AdminUserAccessDetails";
import type { AdminUser, AdminRole } from "@/features/admin-users/types/admin-user.types";

type AdminAction = "view" | "edit" | "deactivate" | "delete" | null;

interface AdminUserActionsProps {
  user: AdminUser;
}

const roles: AdminRole[] = ["Church super admin", "Church admin", "Branch super admin", "Admin", "Worker"];

const FieldLabel = ({ children }: { children: string }) => (
  <Label className="text-sm font-normal text-crozier-text-placeholder">{children}</Label>
);

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1.5">
    <FieldLabel>{label}</FieldLabel>
    <div
      className="flex h-10.5 items-center rounded-lg bg-crozier-surface-primary px-3
      text-sm text-crozier-text-body font-normal"
    >
      {value}
    </div>
  </div>
);

const SelectField = ({
  label,
  value,
  options,
  required,
}: {
  label: string;
  value: string;
  options: string[];
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <FieldLabel>{`${label}${required ? " *" : ""}`}</FieldLabel>
    <Select
      defaultValue={value}
      items={options.map((option) => ({
        label: option,
        value: option,
      }))}
    >
      <SelectTrigger
        className="h-10.5 w-full border-0 bg-crozier-surface-primary px-3 data-[size=default]:h-10.5
        text-sm shadow-none font-normal focus-visible:ring-1 focus-visible:ring-crozier-text-accent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const AdminUserActions = ({ user }: AdminUserActionsProps) => {
  const [action, setAction] = useState<AdminAction>(null);
  const close = () => setAction(null);

  return (
    <>
      <TableRowActions
        label={`Open actions for ${user.name}`}
        contentClassName="w-[102px] min-w-[102px] p-1"
        itemClassName="h-[35px] px-2.5"
        actions={[
          { label: "View", onSelect: () => setAction("view") },
          { label: "Edit", onSelect: () => setAction("edit") },
          { label: "Deactivate", onSelect: () => setAction("deactivate") },
          { label: "Delete", onSelect: () => setAction("delete") },
        ]}
      />

      <SideSheet
        title="Admin details"
        open={action === "view"}
        onOpenChange={(open) => !open && close()}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="px-7 py-4">
            <AdminUserAccessDetails
              user={user}
              roleField={<ReadOnlyField label="Role" value={user.role} />}
            />
          </div>
          <div
            className="mt-auto flex justify-between border-t border-crozier-border-primary
            px-7 pt-4 pb-5"
          >
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
              onClick={() => setAction("edit")}
            >
              Edit
            </Button>
          </div>
        </div>
      </SideSheet>

      <SideFormSheet
        title="Edit admin details"
        submitLabel="Save"
        open={action === "edit"}
        onOpenChange={(open) => !open && close()}
        onSubmit={(event) => event.preventDefault()}
        contentClassName="space-y-0"
      >
        <AdminUserAccessDetails
          user={user}
          roleField={<SelectField label="Role" value={user.role} options={roles} required />}
        />
      </SideFormSheet>

      <ConfirmationSideSheet
        open={action === "deactivate"}
        onOpenChange={(open) => !open && close()}
        title="Confirm deactivation"
        heading="Confirm deactivation action"
        description="Please confirm you want to deactivate this member. They will be unable to access the application until they are reactivated."
        actionLabel="Deactivate"
        onConfirm={close}
      />
      <ConfirmationSideSheet
        open={action === "delete"}
        onOpenChange={(open) => !open && close()}
        title="Confirm deletion"
        heading="Confirm delete action"
        description="Please confirm you want to delete this member’s account. Their personal records will be deleted and they’d be unable to access their account."
        actionLabel="Delete"
        onConfirm={close}
      />
    </>
  );
};

export default AdminUserActions;
