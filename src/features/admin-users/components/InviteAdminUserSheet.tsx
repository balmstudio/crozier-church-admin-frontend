import SideFormSheet from "@/components/common/SideFormSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminRole } from "@/features/admin-users/types/admin-user.types";
import { CROZIERICONS, Icon } from "@/components/icons";

const roleOptions: Array<{ label: AdminRole; value: AdminRole }> = [
  { label: "Church super admin", value: "Church super admin" },
  { label: "Branch super admin", value: "Branch super admin" },
  { label: "Admin", value: "Admin" },
  { label: "Church admin", value: "Church admin" },
  { label: "Worker", value: "Worker" },
];

const InviteAdminUserSheet = () => (
  <SideFormSheet
    title="Invite admin"
    submitLabel="Invite"
    trigger={
      <Button
        className="h-8.5 rounded-[10px] bg-crozier-text-action px-5 text-sm
        text-neutral-white hover:bg-crozier-text-action"
      >
        Invite admin
      </Button>
    }
    onSubmit={(event) => event.preventDefault()}
    contentClassName="space-y-0"
  >
    <div
      className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary
      px-3 text-sm font-medium text-crozier-text-heading"
    >
      <Icon
        type={CROZIERICONS.AdminUsers}
        size={12}
        className="text-crozier-icon-accent"
      />
      Church admin details
    </div>

    <div className="mt-3 grid gap-2">
      <Label
        htmlFor="invite-admin-email"
        className="text-sm font-normal text-crozier-text-placeholder"
      >
        Email <span className="text-crozier-text-heading">*</span>
      </Label>
      <Input
        id="invite-admin-email"
        name="email"
        type="email"
        placeholder="youremail@gmail.com"
        className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm shadow-none
          placeholder:text-crozier-text-placeholder focus-visible:ring-1
          focus-visible:ring-crozier-text-accent"
        required
      />
    </div>

    <div className="mt-5 grid gap-2">
      <Label className="text-sm font-normal text-crozier-text-placeholder">
        Role <span className="text-crozier-text-heading">*</span>
      </Label>
      <Select items={roleOptions} required>
        <SelectTrigger
          className="h-10.5 w-full border-0 bg-crozier-surface-primary-tint px-3 text-sm data-[size=default]:h-10.5
            shadow-none focus-visible:ring-1 focus-visible:ring-crozier-text-accent"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </SideFormSheet>
);

export default InviteAdminUserSheet;
