import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BranchFormMode = "create" | "edit" | "invite";

interface BranchFormSheetProps {
  mode: BranchFormMode;
  trigger: React.ReactElement;
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

const GeneralDetails = ({ edit = false }: { edit?: boolean }) => (
  <div className="space-y-8.5">
    <div className="space-y-3">
      <SectionTitle>General details</SectionTitle>
      <Field label="Branch Name" required>
        <Input defaultValue={edit ? "TCC Ikeja" : undefined} placeholder="E.g. TCC Ikeja" className={fieldClass} />
      </Field>
    </div>
    <div className="space-y-3">
      <SectionTitle>Contact details</SectionTitle>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <Field label="Email"><Input defaultValue={edit ? "ikeja@tcc.org" : undefined} placeholder="youremail@gmail.com" className={fieldClass} /></Field>
        <Field label="Phone Number">
          <div className={`${fieldClass} flex items-center gap-1.5 rounded-lg`}><span>🇳🇬⌄</span><span className="text-crozier-text-body-light">+234&nbsp; 81 0011 2345</span></div>
        </Field>
        <div className="col-span-2"><Field label="Country"><FakeSelect /></Field></div>
        <Field label="Address Line 1"><Input defaultValue={edit ? "1, Allen Road" : undefined} placeholder="E.g. 1, Allen Road" className={fieldClass} /></Field>
        <Field label="City"><Input defaultValue={edit ? "Lagos" : undefined} placeholder="E.g. Lagos" className={fieldClass} /></Field>
        <Field label="State"><FakeSelect /></Field>
        <Field label="Postcode"><Input defaultValue={edit ? "200211" : undefined} placeholder="E.g. 200211" className={fieldClass} /></Field>
      </div>
    </div>
    {edit && <div className="space-y-3"><SectionTitle>Parent branch details</SectionTitle><Field label="Update parent branch"><FakeSelect /></Field></div>}
  </div>
);

const ParentDetails = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <SectionTitle>Parent branch details</SectionTitle>
      <Field label="Select a parent branch if the branch is a sub branch"><FakeSelect /></Field>
    </div>
    <div>
      <p className="text-sm text-crozier-text-placeholder">Is this branch your headquarters?</p>
      <div className="mt-2 flex items-center gap-3 text-sm text-crozier-text-body">
        <span className="flex h-5 w-10 items-center rounded-full bg-crozier-surface-disabled-light px-0.5"><span className="size-4.5 rounded-full bg-crozier-icon-disabled" /></span>No
      </div>
    </div>
  </div>
);

const InviteDetails = ({ branch = false }: { branch?: boolean }) => (
  <div className="space-y-3">
    <SectionTitle admin>{branch ? "Branch admin details" : "Invite branch super admin"}</SectionTitle>
    <Field label="Email" required><Input placeholder="youremail@gmail.com" className={fieldClass} /></Field>
    {branch && <div className="pt-3"><Field label="Role" required><FakeSelect /></Field></div>}
  </div>
);

const BranchFormSheet = ({ mode, trigger }: BranchFormSheetProps) => {
  const [step, setStep] = useState(0);
  const title = mode === "edit" ? "Edit branch details" : mode === "invite" ? "Invite branch admin" : "Add branch";
  const isCreate = mode === "create";
  const submitLabel = mode === "edit" ? "Save" : mode === "invite" ? "Send invite" : step === 2 ? "Create branch" : "Next";

  return (
    <SideFormSheet
      title={title}
      submitLabel={submitLabel}
      trigger={trigger}
      cancelLabel={isCreate && step > 0 ? "Back" : "Cancel"}
      onCancel={isCreate && step > 0 ? () => setStep((value) => value - 1) : undefined}
      onSubmit={(event) => {
        event.preventDefault();
        if (isCreate && step < 2) setStep((value) => value + 1);
      }}
    >
      {mode === "edit" && <GeneralDetails edit />}
      {mode === "invite" && <InviteDetails branch />}
      {mode === "create" && step === 0 && <GeneralDetails />}
      {mode === "create" && step === 1 && <ParentDetails />}
      {mode === "create" && step === 2 && <InviteDetails />}
    </SideFormSheet>
  );
};

export default BranchFormSheet;
