import { useRef, useState } from "react";
import { CROZIERICONS, Icon } from "@/components/icons";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BranchContact } from "@/features/settings/types/branch.types";

const SectionTitle = ({ children }: { children: string }) => (
  <div className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary px-3 text-sm font-medium text-crozier-text-heading">
    <Icon type={CROZIERICONS.Hierarchy} size={12} className="text-crozier-icon-accent" />
    {children}
  </div>
);

const EditBranchDetailsSheet = ({
  branch,
  onSave,
}: {
  branch: BranchContact;
  onSave: (details: Pick<BranchContact, "name" | "abbreviatedName" | "logo" | "primaryColour">) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(branch.logo);
  const [colour, setColour] = useState(branch.primaryColour);
  const [marker, setMarker] = useState({ x: 56.5, y: 46 });
  const fileRef = useRef<HTMLInputElement>(null);

  const updateLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <SideFormSheet
      title="Edit church details"
      submitLabel="Add"
      cancelLabel="Add"
      open={open}
      onOpenChange={setOpen}
      contentClassName="space-y-0"
      trigger={
        <Button variant="outline" className="h-8.5 rounded-[10px] border-crozier-text-accent px-5 text-sm text-crozier-text-action">
          Edit
        </Button>
      }
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSave({
          name: String(data.get("church-name") || "").trim(),
          abbreviatedName: String(data.get("abbreviated-name") || "").trim(),
          logo,
          primaryColour: colour,
        });
        setOpen(false);
      }}
    >
      <SectionTitle>General details</SectionTitle>
      <div className="mt-3 grid gap-2">
        <Label htmlFor="church-name" className="text-sm font-normal text-crozier-text-placeholder">
          Church Name <span className="text-crozier-text-heading">*</span>
        </Label>
        <Input id="church-name" name="church-name" defaultValue={branch.name} required className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>
      <div className="mt-5.5 grid gap-2">
        <Label htmlFor="abbreviated-name" className="text-sm font-normal text-crozier-text-placeholder">
          Abbreviated Name <span className="text-crozier-text-heading">*</span>
        </Label>
        <Input id="abbreviated-name" name="abbreviated-name" defaultValue={branch.abbreviatedName} required className="h-10.5 border-0 bg-crozier-surface-primary-tint px-3 text-sm font-normal shadow-none" />
      </div>

      <div className="mt-9">
        <SectionTitle>Brand details</SectionTitle>
        <p className="mt-2.5 text-sm text-crozier-text-placeholder">Upload logo</p>
        <div className="mt-3 flex items-center gap-4">
          <img src={logo} alt="Church logo preview" className="size-14 rounded-full object-cover" />
          <Button type="button" variant="outline" className="h-7 rounded-xl px-2 text-sm font-normal text-crozier-text-body-light" onClick={() => fileRef.current?.click()}>
            Update
          </Button>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" aria-label="Upload church logo" onChange={(event) => updateLogo(event.target.files?.[0])} />
        </div>
        <p className="mt-3 text-sm text-crozier-text-placeholder">Primary colour</p>
        <div className="mt-3 rounded-[18px] bg-crozier-surface-primary-tint p-4">
          <button
            type="button"
            aria-label="Choose primary colour from gradient"
            className="relative block h-65 w-full overflow-hidden rounded-lg"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,255,255,0) 80%), linear-gradient(0deg, rgba(0,0,0,.75), transparent 85%), #20527c" }}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
              setMarker({ x: x * 100, y: y * 100 });
              const light = [235, 246, 255];
              const dark = [19, 58, 86];
              const channels = light.map((start, index) =>
                Math.round((start * (1 - x) + dark[index] * x) * (1 - y * 0.5)),
              );
              setColour(`#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`);
            }}
          >
            <span className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-sm" style={{ left: `${marker.x}%`, top: `${marker.y}%` }} />
          </button>
        </div>
      </div>
    </SideFormSheet>
  );
};

export default EditBranchDetailsSheet;
