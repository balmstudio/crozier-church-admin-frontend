import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SideSheet from "@/components/common/SideSheet";
import SideFormSheet from "@/components/common/SideFormSheet";
import ConfirmationSideSheet from "@/components/common/ConfirmationSideSheet";
import { Button } from "@/components/ui/button";
import { CROZIERICONS, Icon } from "@/components/icons";
import { getInitials } from "@/utils/getInitials";

export interface BranchAdminRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  unit: string;
  active: string;
  avatar?: string;
  deactivated?: boolean;
}

export type BranchAdminAction = "view" | "edit" | "deactivate" | "delete" | null;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary px-3 text-sm font-medium text-crozier-text-heading">
    <Icon type={CROZIERICONS.Hierarchy} size={12} className="text-crozier-text-accent" />
    {children}
  </div>
);

const AdminIdentity = ({ admin }: { admin: BranchAdminRecord }) => (
  <div className="flex items-center gap-3">
    {admin.avatar ? (
      <img src={admin.avatar} alt="" className="size-12 rounded-full object-cover" />
    ) : (
      <span className="grid size-12 place-items-center rounded-full bg-crozier-surface-primary-tint text-2xl text-crozier-text-heading">
        {getInitials(admin.name)}
      </span>
    )}
    <span className="min-w-0">
      <strong className="block text-base font-normal leading-5 text-crozier-text-body">{admin.name}</strong>
      <span className="block truncate text-sm text-crozier-text-placeholder">{admin.email}</span>
    </span>
  </div>
);

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <p className="text-sm text-crozier-text-placeholder">{label}</p>
    <div className="flex h-10.5 items-center rounded-lg bg-crozier-surface-primary px-3 text-sm text-crozier-text-body">
      {value}
    </div>
  </div>
);

const RoleField = ({ value, onChange }: { value: string; onChange: (role: string) => void }) => (
  <div className="space-y-2">
    <label htmlFor="branch-admin-role" className="text-sm text-crozier-text-placeholder">
      Role <span className="text-crozier-text-heading">*</span>
    </label>
    <div className="relative">
      <select
        id="branch-admin-role"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="h-10.5 w-full appearance-none rounded-lg border-0 bg-crozier-surface-primary-tint px-3 pr-10 text-sm text-crozier-text-body outline-none focus:ring-1 focus:ring-crozier-text-accent"
      >
        <option value="" disabled>Select</option>
        <option value="Branch super admin">Branch super admin</option>
        <option value="Branch admin">Branch admin</option>
        <option value="Admin">Admin</option>
        <option value="Worker">Worker</option>
      </select>
      <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  </div>
);

interface BranchAdminSheetsProps {
  admin: BranchAdminRecord | null;
  action: BranchAdminAction;
  onActionChange: (action: BranchAdminAction) => void;
  onSave: (admin: BranchAdminRecord) => void;
  onDeactivate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const BranchAdminSheets = ({ admin, action, onActionChange, onSave, onDeactivate, onDelete }: BranchAdminSheetsProps) => {
  const [role, setRole] = useState("");
  const close = () => onActionChange(null);

  return (
    <>
      <SideSheet title="Admin details" open={Boolean(admin) && action === "view"} onOpenChange={(open) => !open && close()}>
        {admin && <div className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-7 px-7 py-4">
            <AdminIdentity admin={admin} />
            <div className="space-y-3"><SectionTitle>Branch details</SectionTitle><DetailField label="Branch" value="TCC Lagos" /></div>
            <div className="space-y-3"><SectionTitle>Access details</SectionTitle><DetailField label="Role" value={admin.role} /></div>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-crozier-border-primary px-7 py-4">
            <Button variant="outline" className="h-9 rounded-lg border-crozier-text-accent px-5 text-crozier-text-action" onClick={close}>Cancel</Button>
            <Button className="h-9 rounded-lg bg-crozier-text-action px-5 text-white" onClick={() => { setRole(admin.role); onActionChange("edit"); }}>Edit</Button>
          </div>
        </div>}
      </SideSheet>

      <SideFormSheet
        title="Edit admin details"
        submitLabel="Save"
        open={Boolean(admin) && action === "edit"}
        onOpenChange={(open) => !open && close()}
        onSubmit={(event) => {
          event.preventDefault();
          if (admin && role) { onSave({ ...admin, role }); close(); }
        }}
      >
        {admin && <div className="space-y-7">
          <AdminIdentity admin={admin} />
          <div className="space-y-3"><SectionTitle>Access details</SectionTitle><RoleField value={role || admin.role} onChange={setRole} /></div>
        </div>}
      </SideFormSheet>

      <ConfirmationSideSheet
        open={Boolean(admin) && action === "deactivate"}
        onOpenChange={(open) => !open && close()}
        title={admin?.deactivated ? "Confirm reactivation" : "Confirm deactivation"}
        heading={admin?.deactivated ? "Confirm reactivation action" : "Confirm deactivation action"}
        description={admin?.deactivated ? "Please confirm you want to reactivate this member’s account." : "Please confirm you want to deactivate this member. They will be unable to access the application until they are reactivated."}
        actionLabel={admin?.deactivated ? "Reactivate" : "Deactivate"}
        onConfirm={() => { if (admin) onDeactivate(admin.id); close(); }}
      />
      <ConfirmationSideSheet
        open={Boolean(admin) && action === "delete"}
        onOpenChange={(open) => !open && close()}
        title="Confirm deletion"
        heading="Confirm delete action"
        description="Please confirm you want to delete this member’s account. Their personal records will be deleted and they’d be unable to access their account."
        actionLabel="Delete"
        onConfirm={() => { if (admin) onDelete(admin.id); close(); }}
      />
    </>
  );
};

export const InviteBranchAdminSheet = ({ open, onOpenChange, onInvite }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string, role: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  return <SideFormSheet
    title="Invite branch admin"
    submitLabel="Send invite"
    open={open}
    onOpenChange={onOpenChange}
    onSubmit={(event) => {
      event.preventDefault();
      if (email.trim() && role) { onInvite(email.trim(), role); setEmail(""); setRole(""); onOpenChange(false); }
    }}
  >
    <div className="space-y-3">
      <SectionTitle>Branch admin details</SectionTitle>
      <div className="space-y-2">
        <label htmlFor="invite-admin-email" className="text-sm text-crozier-text-placeholder">Email <span className="text-crozier-text-heading">*</span></label>
        <input id="invite-admin-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="youremail@gmail.com" className="h-10.5 w-full rounded-lg border-0 bg-crozier-surface-primary-tint px-3 text-sm outline-none placeholder:text-crozier-text-placeholder focus:ring-1 focus:ring-crozier-text-accent" />
      </div>
      <div className="pt-3"><RoleField value={role} onChange={setRole} /></div>
    </div>
  </SideFormSheet>;
};
