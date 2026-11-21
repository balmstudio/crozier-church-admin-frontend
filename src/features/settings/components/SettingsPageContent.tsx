import BranchDetails from "./BranchDetails";
import EditBranchDetailsSheet from "./EditBranchDetailsSheet";
import { useBranchSettings } from "../hooks/useBranchSettings";

const Settings = () => {
  const { data, error, isPending, isError, refetch } = useBranchSettings();

  if (isPending) return <div className="p-8">Loading settings...</div>;
  if (isError || !data) return <div className="flex items-center gap-3 p-8"><span>{error instanceof Error ? error.message : "Unable to load settings."}</span><button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button></div>;
  const branch = data.data;

  return (
    <section className="px-5 pt-4 max-md:px-4" aria-label="Profile and brand settings">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-crozier-text-body">Profile &amp; brand</h1>
        <EditBranchDetailsSheet branch={branch} />
      </div>
      <BranchDetails branch={branch} />
    </section>
  );
};

export default Settings;
