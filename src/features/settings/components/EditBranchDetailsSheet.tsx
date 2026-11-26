import { useState } from "react";
import { CROZIERICONS, Icon } from "@/components/icons";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BranchByIdDetails } from "@/features/branches/types/branch.types";
import type { SettingsUpdateTenantPayload } from "@/features/settings/types/settings.types";
import { useUpdateSettingsTenant } from "@/features/settings/hooks/useUpdateSettingsTenant";
import { getErrorMessage } from "@/helpers/getErrorMessage";

const SectionTitle = ({ children }: { children: string }) => (
  <div className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary px-3 text-sm font-medium text-crozier-text-heading">
    <Icon type={CROZIERICONS.Hierarchy} size={12} className="text-crozier-icon-accent" />
    {children}
  </div>
);

const EditBranchDetailsSheet = ({ branch }: { branch: BranchByIdDetails }) => {
  const tenant = branch.TenantModel;
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(tenant.logo ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const updateTenant = useUpdateSettingsTenant(branch.id);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setLogo(tenant.logo ?? "");
      setErrorMessage("");
      updateTenant.reset();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (logo && !logo.startsWith("https://")) {
      setErrorMessage("Logo must be an HTTPS URL.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const payload: SettingsUpdateTenantPayload = {
      name: String(data.get("name") ?? "").trim(),
      abbreviatedName: String(data.get("abbreviatedName") ?? "").trim(),
      organizationEmail: String(data.get("organizationEmail") ?? "").trim(),
      organizationPhoneNumber: String(data.get("organizationPhoneNumber") ?? "").trim(),
      ...(logo ? { logo } : {}),
    };

    try {
      await updateTenant.mutateAsync(payload);
      setOpen(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to update church details."));
    }
  };

  return (
    <SideFormSheet
      title="Edit church details"
      submitLabel="Save"
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
      isSubmitting={updateTenant.isPending}
      contentClassName="space-y-0"
      trigger={
        <Button variant="outline" className="h-8.5 rounded-[10px] border-crozier-text-accent px-5 text-sm text-crozier-text-action">
          Edit
        </Button>
      }
    >
      <SectionTitle>General details</SectionTitle>
      <div className="mt-3 grid gap-2">
        <Label htmlFor="settings-tenant-name" className="text-sm font-normal text-crozier-text-placeholder">Church Name <span className="text-crozier-text-heading">*</span></Label>
        <Input id="settings-tenant-name" name="name" defaultValue={tenant.name} required className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>
      <div className="mt-5.5 grid gap-2">
        <Label htmlFor="settings-abbreviated-name" className="text-sm font-normal text-crozier-text-placeholder">Abbreviated Name <span className="text-crozier-text-heading">*</span></Label>
        <Input id="settings-abbreviated-name" name="abbreviatedName" defaultValue={tenant.abbreviatedName} minLength={1} maxLength={12} required className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>
      <div className="mt-5.5 grid gap-2">
        <Label htmlFor="settings-organization-email" className="text-sm font-normal text-crozier-text-placeholder">Organization email</Label>
        <Input id="settings-organization-email" name="organizationEmail" type="email" defaultValue={tenant.organizationEmail} className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>
      <div className="mt-5.5 grid gap-2">
        <Label htmlFor="settings-organization-phone" className="text-sm font-normal text-crozier-text-placeholder">Organization phone number</Label>
        <Input id="settings-organization-phone" name="organizationPhoneNumber" type="tel" defaultValue={tenant.organizationPhoneNumber} className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>

      <div className="mt-9">
        <SectionTitle>Brand details</SectionTitle>
        <div className="mt-3 grid gap-2">
          <Label htmlFor="settings-logo" className="text-sm font-normal text-crozier-text-placeholder">Logo HTTPS URL</Label>
          <Input id="settings-logo" name="logo" type="url" value={logo} onChange={(event) => setLogo(event.target.value)} placeholder="https://cdn.example.com/logo.png" className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
        </div>
        {logo.startsWith("https://") && <img src={logo} alt="Church logo preview" className="mt-3 size-14 rounded-full object-cover" />}
        <div className="mt-5.5 grid gap-2">
          <span className="text-sm text-crozier-text-placeholder">Primary colour</span>
          <div className="flex h-10.5 items-center gap-3 rounded-lg bg-crozier-surface-primary-tint px-3 text-sm">
            <span className="size-6 rounded-sm" style={{ backgroundColor: tenant.theme.primaryColour }} />
            {tenant.theme.primaryColour}
          </div>
          <p className="text-xs text-crozier-text-placeholder">Primary colour is not part of the tenant details endpoint.</p>
        </div>
      </div>

      {errorMessage && <p role="alert" className="mt-4 text-sm text-crozier-text-error">{errorMessage}</p>}
    </SideFormSheet>
  );
};

export default EditBranchDetailsSheet;
