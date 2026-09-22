import { useState } from "react";
import BranchDetails from "./BranchDetails";
import EditBranchDetailsSheet from "./EditBranchDetailsSheet";
import { useBranchSettings } from "../hooks/useBranchSettings";
import type { BranchContact } from "../types/branch.types";

const Settings = () => {
  const { data: branch, isLoading, isError } = useBranchSettings();
  const [profileChanges, setProfileChanges] = useState<Partial<BranchContact>>({});

  if (isLoading) return <div className="p-8">Loading settings...</div>;
  if (isError || !branch) return <div className="p-8">Unable to load settings.</div>;

  const profile = { ...branch, ...profileChanges };

  return (
    <section className="px-5 pt-4 max-md:px-4" aria-label="Profile and brand settings">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-crozier-text-body">Profile &amp; brand</h1>
        <EditBranchDetailsSheet branch={profile} onSave={setProfileChanges} />
      </div>
      <BranchDetails branch={profile} />
    </section>
  );
};

export default Settings;
