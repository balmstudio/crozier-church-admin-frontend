import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profileAvatar from "@/assets/dashboard/profile-avatar.png";
import unitHeadAvatar from "@/assets/units-unit-head.png";
import BranchFormSheet from "./BranchFormSheet";

const branches = [
  { id: "casper", name: "TCC Lagos", location: "Casper, Wyoming", pastor: "Pst. Phillip Davies", avatar: profileAvatar },
  { id: "victoria-island", name: "TCC Lagos", location: "Victoria Island, Lagos", pastor: "Pst. Paul Durotoye", avatar: unitHeadAvatar, badge: "Regional HQ" },
  { id: "chelsea", name: "TCC Lagos", location: "Chelsea, London", pastor: "Pst. Filipo Mendez", avatar: profileAvatar },
  { id: "lekki", name: "TCC Lagos", location: "Lekki, Lagos", pastor: "Pst. Dada Cole", avatar: unitHeadAvatar },
];

const BranchCard = ({ branch, hq = false }: { branch: typeof branches[number]; hq?: boolean }) => (
  <Link to={`/units/${branch.id}`} className="block no-underline">
    <article className={`${hq ? "h-[162px]" : "h-[158px]"} w-[360px] rounded-[20px] border border-crozier-border-primary-shade-3 bg-crozier-surface-primary px-5 py-4 shadow-[0_2px_4px_rgba(16,35,63,0.04)]`}>
      <div className="flex items-center gap-3 text-sm font-medium text-crozier-text-body">
        <span>{branch.name}</span>{(hq || branch.badge) && <span className="rounded-full bg-crozier-surface-disabled-lighter px-1.5 py-0.5 text-[9px] font-normal">{hq ? "HQ" : branch.badge}</span>}
      </div>
      <p className="mt-4 text-xs text-crozier-text-placeholder">{branch.location}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-crozier-text-heading"><img src={branch.avatar} alt="" className="size-4 rounded-full object-cover" />{branch.pastor}</div>
      <div className="mt-5 flex items-center gap-5 text-base"><span>{hq ? "4" : "35"} <small className="text-xs text-crozier-text-placeholder">{hq ? "Branches" : "Sub-branches"}</small></span><span>{hq ? "2" : "400"} <small className="text-xs text-crozier-text-placeholder">{hq ? "Sub-branches" : "Members"}</small></span>{hq && <span>10K <small className="text-xs text-crozier-text-placeholder">Members</small></span>}</div>
    </article>
  </Link>
);

const UnitsPageContent = () => (
  <div className="px-5 py-2">
    <div className="flex items-center justify-between"><h1 className="text-base font-semibold text-crozier-text-body">Manage branches</h1><BranchFormSheet mode="create" trigger={<Button className="h-8.5 rounded-[10px] bg-crozier-text-action px-5 text-sm text-white">Create branch</Button>} /></div>
    <div className="mt-7"><BranchCard hq branch={{...branches[0], name:"The Chosen Church", location:"Dallas, Texas", pastor:"Pst. Spencer Bright"}} /></div>
    <h2 className="mt-[42px] text-base font-semibold">Primary branches</h2>
    <section className="mt-[23px] ml-1 grid grid-cols-[repeat(3,360px)] gap-x-2 gap-y-5" aria-label="Primary branches">
      {branches.map((branch) => <BranchCard key={branch.id} branch={branch} />)}
    </section>
    <h2 className="mt-13 text-base font-semibold">Sub branches</h2>
  </div>
);

export default UnitsPageContent;
