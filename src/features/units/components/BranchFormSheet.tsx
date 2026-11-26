import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBranch } from "@/features/branches/hooks/useCreateBranch.hook";
import { useEditBranchById } from "@/features/branches/hooks/useEditBranchById.hook";
import { useTenantBranches } from "@/features/branches/hooks/useTenantBranches.hook";
import type {
  BranchByIdDetails,
  CreateBranchPayload,
  EditBranchByIdAddress,
} from "@/features/branches/types/branch.types";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { useAuthStore } from "@/store/authStore";

type BranchFormMode = "create" | "edit" | "invite";

interface BranchFormSheetProps {
  mode: BranchFormMode;
  trigger: React.ReactElement;
  branchDetails?: BranchByIdDetails;
}

const SectionTitle = ({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) => (
  <div className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary px-3 text-sm font-medium text-crozier-text-heading">
    <span className="grid size-2.5 place-items-center text-[11px] font-bold text-crozier-text-accent">
      {admin ? "♟" : "↕"}
    </span>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="grid gap-2">
    <Label className="text-sm font-normal text-crozier-text-placeholder">
      {label} {required && <span className="text-crozier-text-heading">*</span>}
    </Label>
    {children}
  </div>
);

const fieldClass = "h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm shadow-none placeholder:text-crozier-text-placeholder focus-visible:ring-1 focus-visible:ring-crozier-text-accent";

const FakeSelect = ({ value = "Select" }: { value?: string }) => (
  <button type="button" className="flex h-10.5 w-full items-center justify-between rounded-lg bg-crozier-surface-primary-tint px-3 text-sm text-crozier-text-body">
    {value}<ChevronDown size={16} />
  </button>
);

interface EditBranchFormState {
  branchName: string;
  isHq: boolean;
  email: string;
  phoneNumber: string;
  address: Required<EditBranchByIdAddress>;
}

const getInitialEditForm = (branchDetails?: BranchByIdDetails): EditBranchFormState => ({
  branchName: branchDetails?.name ?? "",
  isHq: branchDetails?.isHq ?? false,
  email: branchDetails?.email ?? "",
  phoneNumber: branchDetails?.phoneNumber ?? "",
  address: {
    country: branchDetails?.addressCountry ?? "",
    addressLine1: branchDetails?.addressLine1 ?? "",
    city: branchDetails?.addressCity ?? "",
    state: branchDetails?.addressState ?? "",
    postcode: branchDetails?.addressPostcode ?? "",
  },
});

const EditBranchDetails = ({
  form,
  onChange,
  onAddressChange,
}: {
  form: EditBranchFormState;
  onChange: <Key extends keyof Omit<EditBranchFormState, "address">>(
    key: Key,
    value: EditBranchFormState[Key],
  ) => void;
  onAddressChange: (key: keyof EditBranchByIdAddress, value: string) => void;
}) => (
  <div className="space-y-8.5">
    <div className="space-y-3">
      <SectionTitle>General details</SectionTitle>
      <Field label="Branch Name" required>
        <Input
          required
          maxLength={150}
          value={form.branchName}
          onChange={(event) => onChange("branchName", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm text-crozier-text-body">
        <input
          type="checkbox"
          checked={form.isHq}
          onChange={(event) => onChange("isHq", event.target.checked)}
          className="size-4 rounded border-crozier-border-primary"
        />
        This branch is the headquarters
      </label>
    </div>
    <div className="space-y-3">
      <SectionTitle>Contact details</SectionTitle>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <Field label="Email">
          <Input
            type="email"
            maxLength={80}
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Phone Number">
          <Input
            type="tel"
            pattern="[+]?[0-9]{9,25}"
            value={form.phoneNumber}
            onChange={(event) => onChange("phoneNumber", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <div className="col-span-2">
          <Field label="Country">
            <Input value={form.address.country} onChange={(event) => onAddressChange("country", event.target.value)} className={fieldClass} />
          </Field>
        </div>
        <Field label="Address Line 1">
          <Input value={form.address.addressLine1} onChange={(event) => onAddressChange("addressLine1", event.target.value)} className={fieldClass} />
        </Field>
        <Field label="City">
          <Input value={form.address.city} onChange={(event) => onAddressChange("city", event.target.value)} className={fieldClass} />
        </Field>
        <Field label="State">
          <Input value={form.address.state} onChange={(event) => onAddressChange("state", event.target.value)} className={fieldClass} />
        </Field>
        <Field label="Postcode">
          <Input value={form.address.postcode} onChange={(event) => onAddressChange("postcode", event.target.value)} className={fieldClass} />
        </Field>
      </div>
    </div>
  </div>
);

const CreateGeneralDetails = ({
  form,
  onChange,
}: {
  form: CreateBranchPayload;
  onChange: <Key extends keyof CreateBranchPayload>(
    key: Key,
    value: CreateBranchPayload[Key],
  ) => void;
}) => (
  <div className="space-y-8.5">
    <div className="space-y-3">
      <SectionTitle>General details</SectionTitle>
      <Field label="Branch Name" required>
        <Input
          required
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="E.g. TCC Ikeja"
          className={fieldClass}
        />
      </Field>
      <Field label="Address" required>
        <Input
          required
          value={form.address}
          onChange={(event) => onChange("address", event.target.value)}
          placeholder="E.g. 1, Allen Road, Lagos"
          className={fieldClass}
        />
      </Field>
      <Field label="Slug" required>
        <Input
          required
          maxLength={40}
          value={form.slug}
          onChange={(event) => onChange("slug", event.target.value)}
          placeholder="E.g. tcc-ikeja"
          className={fieldClass}
        />
      </Field>
      <Field label="Logo URL">
        <Input
          type="url"
          pattern="https://.*"
          value={form.logo ?? ""}
          onChange={(event) => onChange("logo", event.target.value)}
          placeholder="https://cdn.example.com/logo.png"
          className={fieldClass}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm text-crozier-text-body">
        <input
          type="checkbox"
          checked={form.isCellGroup ?? false}
          onChange={(event) => onChange("isCellGroup", event.target.checked)}
          className="size-4 rounded border-crozier-border-primary"
        />
        This branch is a cell group
      </label>
    </div>
  </div>
);

const ParentDetails = ({
  parentBranchId,
  branches,
  onChange,
}: {
  parentBranchId?: string;
  branches: Array<{ id: string; name: string }>;
  onChange: (parentBranchId: string) => void;
}) => (
  <div className="space-y-3">
    <SectionTitle>Parent branch details</SectionTitle>
    <Field label="Select a parent branch if the branch is a sub branch">
      <div className="relative">
        <select
          value={parentBranchId ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className="h-10.5 w-full appearance-none rounded-lg border-0 bg-crozier-surface-primary-tint px-3 pr-10 text-sm text-crozier-text-body outline-none"
        >
          <option value="">No parent branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>
    </Field>
  </div>
);

const InviteDetails = ({ branch = false }: { branch?: boolean }) => (
  <div className="space-y-3">
    <SectionTitle admin>{branch ? "Branch admin details" : "Invite branch super admin"}</SectionTitle>
    <Field label="Email" required><Input placeholder="youremail@gmail.com" className={fieldClass} /></Field>
    {branch && <div className="pt-3"><Field label="Role" required><FakeSelect /></Field></div>}
  </div>
);

const initialCreateBranchForm: CreateBranchPayload = {
  name: "",
  address: "",
  slug: "",
  isCellGroup: false,
};

const BranchFormSheet = ({ mode, trigger, branchDetails }: BranchFormSheetProps) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateBranchPayload>(initialCreateBranchForm);
  const [editForm, setEditForm] = useState<EditBranchFormState>(() =>
    getInitialEditForm(branchDetails),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const tenantId = useAuthStore((state) => state.user?.tenantId);
  const createBranch = useCreateBranch();
  const editBranchById = useEditBranchById();
  const { data: tenantBranches } = useTenantBranches(
    mode === "create" ? tenantId : undefined,
    { pageNumber: 1, limit: 100 },
  );
  const title = mode === "edit" ? "Edit branch details" : mode === "invite" ? "Invite branch admin" : "Add branch";
  const isCreate = mode === "create";
  const submitLabel = mode === "edit" ? "Save" : mode === "invite" ? "Send invite" : step === 1 ? "Create branch" : "Next";

  const updateForm = <Key extends keyof CreateBranchPayload>(
    key: Key,
    value: CreateBranchPayload[Key],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const updateEditForm = <Key extends keyof Omit<EditBranchFormState, "address">>(
    key: Key,
    value: EditBranchFormState[Key],
  ) => setEditForm((current) => ({ ...current, [key]: value }));

  const updateEditAddress = (key: keyof EditBranchByIdAddress, value: string) =>
    setEditForm((current) => ({
      ...current,
      address: { ...current.address, [key]: value },
    }));

  const resetCreateForm = () => {
    setStep(0);
    setForm(initialCreateBranchForm);
    setErrorMessage(null);
    createBranch.reset();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && isCreate) resetCreateForm();
    if (nextOpen && mode === "edit") {
      setEditForm(getInitialEditForm(branchDetails));
      setErrorMessage(null);
      editBranchById.reset();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === "edit") {
      if (!branchDetails) {
        setErrorMessage("Branch details are unavailable.");
        return;
      }

      setErrorMessage(null);
      try {
        await editBranchById.mutateAsync({
          branchId: branchDetails.id,
          payload: {
            branchName: editForm.branchName,
            isHq: editForm.isHq,
            email: editForm.email,
            phoneNumber: editForm.phoneNumber,
            address: editForm.address,
          },
        });
        setOpen(false);
      } catch (error) {
        setErrorMessage(getErrorMessage(error, "Unable to update branch details."));
      }
      return;
    }

    if (!isCreate) return;

    if (step === 0) {
      setErrorMessage(null);
      setStep(1);
      return;
    }

    setErrorMessage(null);
    try {
      const response = await createBranch.mutateAsync({
        name: form.name,
        address: form.address,
        slug: form.slug,
        ...(form.isCellGroup ? { isCellGroup: true } : {}),
        ...(form.logo ? { logo: form.logo } : {}),
        ...(form.parentBranchId ? { parentBranchId: form.parentBranchId } : {}),
      });

      if (response.error) {
        setErrorMessage(response.message);
        updateForm("slug", response.data.suggestion);
        return;
      }

      setOpen(false);
      resetCreateForm();
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to create branch."));
    }
  };

  return (
    <SideFormSheet
      title={title}
      submitLabel={submitLabel}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      cancelLabel={isCreate && step > 0 ? "Back" : "Cancel"}
      onCancel={isCreate && step > 0 ? () => setStep((value) => value - 1) : undefined}
      onSubmit={handleSubmit}
      isSubmitting={createBranch.isPending || editBranchById.isPending}
    >
      {mode === "edit" && (
        <EditBranchDetails
          form={editForm}
          onChange={updateEditForm}
          onAddressChange={updateEditAddress}
        />
      )}
      {mode === "invite" && <InviteDetails branch />}
      {mode === "create" && step === 0 && (
        <CreateGeneralDetails form={form} onChange={updateForm} />
      )}
      {mode === "create" && step === 1 && (
        <ParentDetails
          parentBranchId={form.parentBranchId}
          branches={tenantBranches?.data.docs ?? []}
          onChange={(parentBranchId) =>
            updateForm("parentBranchId", parentBranchId || undefined)
          }
        />
      )}
      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </SideFormSheet>
  );
};

export default BranchFormSheet;
