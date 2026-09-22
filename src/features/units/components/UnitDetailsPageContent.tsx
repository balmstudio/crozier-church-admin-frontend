import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import AreaTrendChart from "@/components/charts/AreaTrendChart";
import DonutChart from "@/components/charts/DonutChart";
import StackedBarChart from "@/components/charts/StackedBarChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CROZIERICONS, Icon } from "@/components/icons";
import profileAvatar from "@/assets/dashboard/profile-avatar.png";
import unitHeadAvatar from "@/assets/units-unit-head.png";
import branchAdminLogo from "@/assets/icons/units/branch-admin-logo.png";
import membersLogo from "@/assets/icons/units/members-logo.png";
import memberMetricIcon from "@/assets/icons/dashboard/member-metric.svg";
import workersMetricIcon from "@/assets/icons/dashboard/workers-metric.svg";
import { convertMetrics, memberDistributionData, memberGrowthData, monthlyBarData, visitorMetrics } from "@/features/dashboard/data/dashboard.mock";
import MetricSummarySection from "@/features/dashboard/components/MetricSummarySection";
import ChartPanel from "@/features/dashboard/components/ChartPanel";
import PeriodFilter from "@/features/dashboard/components/PeriodFilter";
import type { DashboardPeriod } from "@/features/dashboard/types/dashboard.types";
import Pagination from "@/components/common/Pagination";
import TableRowActions from "@/components/common/TableRowActions";
import CopyButton from "@/components/common/CopyButton";
import BranchFormSheet from "./BranchFormSheet";
import { BranchAdminSheets, InviteBranchAdminSheet, type BranchAdminAction, type BranchAdminRecord } from "./BranchAdminSheets";

type BranchTab = "details" | "analytics" | "admins" | "apps";

const tabs: Array<{ value: BranchTab; label: string; width: number }> = [
  { value: "details", label: "Details", width: 87 },
  { value: "analytics", label: "Analytics", width: 103 },
  { value: "admins", label: "Branch admin users", width: 174 },
  { value: "apps", label: "Apps", width: 76 },
];

const TabButton = ({ active, children, onClick, width }: { active: boolean; children: React.ReactNode; onClick: () => void; width: number }) => (
  <button type="button" onClick={onClick} style={{ width }} className={`h-8.5 rounded-lg text-sm ${active ? "bg-crozier-surface-primary-tint text-crozier-text-body" : "text-crozier-text-placeholder"}`}>{children}</button>
);

const DetailsTab = () => (
  <div className="relative mt-10 ml-3">
    <dl className="grid grid-cols-[156px_1fr] gap-y-9 text-sm">
      <dt className="text-crozier-text-body-light">Branch name</dt><dd>TCC Lekki</dd>
      <dt className="text-crozier-text-body-light">Branch pastor</dt><dd className="flex items-center gap-2"><img src={unitHeadAvatar} alt="" className="size-6 rounded-full object-cover" />Pst. Dada Cole</dd>
      <dt className="text-crozier-text-body-light">Branch admin</dt><dd className="flex items-center gap-2"><img src={profileAvatar} alt="" className="size-6 rounded-full object-cover" />Yvonne Clinton</dd>
      <dt className="text-crozier-text-body-light">Parent branch</dt><dd className="flex items-center gap-4">TCC Dallas <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1 text-xs">HQ</span></dd>
      <dt className="mt-5 text-crozier-text-body-light">Address</dt><dd className="mt-5">Plot 12B, Babatunde Anjous Avenue, Lekki Phase 1, Lagos, Nigeria</dd>
      <dt className="text-crozier-text-body-light">Email address</dt><dd className="flex items-center gap-2">lekki@tcc.org <CopyButton value="lekki@tcc.org" label="Copy email" /></dd>
      <dt className="text-crozier-text-body-light">Phone number</dt><dd className="flex items-center gap-2">🇳🇬 +234&nbsp; 81 0011 2345 <CopyButton value="+234 81 0011 2345" label="Copy phone" /></dd>
    </dl>
  </div>
);

const AnalyticsSelect = ({ workers, onChange }: { workers: boolean; onChange: (workers: boolean) => void }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  return <div ref={containerRef} className="relative ml-auto">
    <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-8.5 min-w-[158px] items-center justify-between rounded-lg border border-crozier-border-primary px-3 text-sm text-crozier-text-body">{workers ? "Workers analytics" : "Member analytics"}<ChevronDown size={14} /></button>
    {open && <div role="menu" aria-label="Analytics view" className="absolute top-10 right-0 z-20 w-44 rounded-[10px] bg-white p-1 shadow-lg ring-1 ring-black/5">
      <button role="menuitem" type="button" onClick={() => {onChange(false);setOpen(false)}} className="grid h-8.5 w-full grid-cols-[13px_1fr] items-center gap-2 rounded-md px-2 text-left text-sm whitespace-nowrap hover:bg-crozier-surface-primary-tint"><img src={memberMetricIcon} alt="" className="h-3 w-[13px]" />Members analytics</button>
      <button role="menuitem" type="button" onClick={() => {onChange(true);setOpen(false)}} className="grid h-8.5 w-full grid-cols-[13px_1fr] items-center gap-2 rounded-md px-2 text-left text-sm whitespace-nowrap hover:bg-crozier-surface-primary-tint"><img src={workersMetricIcon} alt="" className="h-3 w-[11px]" />Workers analytics</button>
    </div>}
  </div>;
};

const MemberAnalytics = () => {
  const [visitorPeriod, setVisitorPeriod] = useState<DashboardPeriod>("1y");
  const [convertPeriod, setConvertPeriod] = useState<DashboardPeriod>("1y");
  const [memberPeriod, setMemberPeriod] = useState<DashboardPeriod>("1y");
  return <div className="mx-3 mt-9.5 space-y-12.5">
    <MetricSummarySection title="Visitors" metrics={visitorMetrics} period={visitorPeriod} onPeriodChange={setVisitorPeriod} />
    <div className="grid grid-cols-2 gap-6"><ChartPanel title="Monthly retained visitors"><StackedBarChart data={monthlyBarData} ariaLabel="Monthly retained visitors" /></ChartPanel><ChartPanel title="Monthly converted visitors"><StackedBarChart data={monthlyBarData} ariaLabel="Monthly converted visitors" /></ChartPanel></div>
    <MetricSummarySection title="New converts" metrics={convertMetrics} period={convertPeriod} onPeriodChange={setConvertPeriod} />
    <div className="grid grid-cols-2 gap-6"><ChartPanel title="Members graph" action={<PeriodFilter value={memberPeriod} onChange={setMemberPeriod} />}><AreaTrendChart data={memberGrowthData} ariaLabel="Member growth" /></ChartPanel><ChartPanel title="All time"><DonutChart data={memberDistributionData} value="4,000" label="Members" /></ChartPanel></div>
  </div>;
};

const WorkersAnalytics = () => {
  const stats = [{label:"Discipleship",value:"34"},{label:"Follow Up",value:"25"},{label:"Sanctuary",value:"13"},{label:"Media",value:"43"},{label:"Media",value:"43"}];
  return <div className="mx-3 mt-10">
    <h2 className="text-base font-semibold">Overview</h2>
    <div className="mt-4 grid grid-cols-2 gap-5">
      <article className="h-[120px] rounded-[20px] bg-crozier-surface-primary p-4"><div className="flex items-center gap-2 text-sm"><span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-primary-tint"><Icon type={CROZIERICONS.Hierarchy} size={12} /></span>Units</div><strong className="mt-3 block text-[30px] font-normal">12</strong><p className="text-xs text-crozier-text-body-light">Functional administrative units in the church</p></article>
      <article className="h-[120px] rounded-[20px] bg-crozier-surface-primary p-4"><div className="flex items-center gap-2 text-sm"><span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-primary-tint"><img src={workersMetricIcon} alt="" className="h-3 w-[11px]" /></span>Workers</div><strong className="mt-3 block text-[30px] font-normal">1.2K</strong><p className="text-xs text-crozier-text-body-light">Members serving in units</p></article>
    </div>
    <h2 className="mt-12 text-base font-semibold">Unit workers count</h2>
    <div className="mt-4 grid grid-cols-[repeat(4,253px)] gap-4">{stats.map((stat,index)=><article key={`${stat.label}-${index}`} className="h-[104px] rounded-[20px] bg-crozier-surface-primary p-4"><p className="text-sm">{stat.label}</p><strong className="mt-5 block text-[30px] font-normal">{stat.value}</strong></article>)}</div>
  </div>;
};

const AnalyticsTab = () => {
  const [workers, setWorkers] = useState(false);
  return <><div className="absolute top-4 right-5"><AnalyticsSelect workers={workers} onChange={setWorkers} /></div>{workers ? <WorkersAnalytics /> : <MemberAnalytics />}</>;
};

const initialAdmins: BranchAdminRecord[] = [
  {id:1,name:"Esther Oyewole",email:"eniotaodesanwo@gmail.com",role:"Branch super admin",unit:"Nil",active:"3rd Feb 2026",avatar:unitHeadAvatar},
  {id:2,name:"Tochi Ifeanyi",email:"tochiifeanyi@gmail.com",role:"Admin",unit:"Nil",active:"7th Feb 2026"},
  {id:3,name:"Victor Lawani",email:"eneyufuolawani@gmail.com",role:"Worker",unit:"Follow up",active:"17th Jan 2026",avatar:profileAvatar},
  {id:4,name:"Tochi Ifeanyi",email:"tochiifeanyi@gmail.com",role:"Admin",unit:"Nil",active:"Pending invite"},
  {id:5,name:"Victor Lawani",email:"eneyufuolawani@gmail.com",role:"Worker",unit:"Follow up",active:"Pending invite",avatar:profileAvatar},
];

const AdminsTab = () => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selected, setSelected] = useState<BranchAdminRecord | null>(null);
  const [action, setAction] = useState<BranchAdminAction>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const filtered = admins.filter((admin) =>
    (!roleFilter || admin.role === roleFilter) &&
    `${admin.name} ${admin.email} ${admin.role}`.toLowerCase().includes(search.toLowerCase()),
  );
  const rows = page === 1 ? filtered : filtered.slice(3);
  const openAction = (admin: BranchAdminRecord, next: BranchAdminAction) => { setSelected(admin); setAction(next); };

  return <div className="mt-7">
    <Button className="absolute top-4 right-5 h-8.5 rounded-[10px] bg-crozier-text-action px-5 text-white" onClick={() => setInviteOpen(true)}>Invite branch admin</Button>
    <div className="flex items-center justify-between">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-crozier-text-placeholder" />
        <Input aria-label="Search branch admin users" placeholder="Search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="h-9.5 w-[300px] pl-9 text-xs" />
      </div>
      <div className="relative">
        <Button variant="outline" className="h-8 gap-2 px-3 text-crozier-text-body-light" onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen}><Filter size={14} fill="currentColor" />Filter</Button>
        {filterOpen && <div className="absolute top-10 right-0 z-20 w-44 rounded-lg border border-crozier-border-primary bg-white p-1 shadow-lg">
          {["", "Branch super admin", "Branch admin", "Admin", "Worker"].map((role) => <button key={role} type="button" className="block h-8 w-full rounded-md px-2 text-left text-sm hover:bg-crozier-surface-primary-tint" onClick={() => { setRoleFilter(role); setFilterOpen(false); setPage(1); }}>{role || "All roles"}</button>)}
        </div>}
      </div>
    </div>
    <table className="mt-7.5 w-full table-fixed text-sm text-crozier-text-body">
      <colgroup><col className="w-[42%]" /><col className="w-[26%]" /><col className="w-[17%]" /><col className="w-[11%]" /><col className="w-[4%]" /></colgroup>
      <thead className="h-9 bg-crozier-surface-primary text-left text-crozier-text-placeholder"><tr><th className="px-1 font-normal">Personal details</th><th className="font-normal">Role</th><th className="font-normal">Unit</th><th className="font-normal">Last active</th><th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{rows.map((admin, index) => <tr key={admin.id} className={`h-[54px] border-b border-crozier-border-primary ${index % 2 ? "bg-crozier-surface-primary" : ""}`}>
        <td className="px-2"><div className="flex items-center gap-2">{admin.avatar ? <img src={admin.avatar} alt="" className="size-7.5 rounded-full object-cover" /> : <span className="grid size-7.5 place-items-center rounded-full bg-crozier-surface-primary-tint text-crozier-text-heading">{admin.name.split(" ").map((part) => part[0]).join("")}</span>}<span><strong className="block font-normal leading-5">{admin.name}</strong><small className="text-sm leading-5 text-crozier-text-placeholder">{admin.email}</small></span></div></td>
        <td className="text-center">{admin.role}</td><td className="text-center">{admin.unit}</td><td className="text-center">{admin.deactivated ? "Deactivated" : admin.active}</td>
        <td className="text-center"><TableRowActions label={`Open actions for ${admin.name}`} contentClassName="w-[102px] min-w-[102px] p-1" itemClassName="h-9 px-2.5" actions={[{ label: "View", onSelect: () => openAction(admin, "view") }, { label: "Edit", onSelect: () => openAction(admin, "edit") }, { label: admin.deactivated ? "Reactivate" : "Deactivate", onSelect: () => openAction(admin, "deactivate") }, { label: "Delete", onSelect: () => openAction(admin, "delete") }]} /></td>
      </tr>)}</tbody>
    </table>
    <div className="absolute right-5 bottom-4 left-7.5 flex items-center justify-between"><p className="text-sm text-crozier-text-body-light">{roleFilter || search ? `${filtered.length} Church admin users` : "3 of 3 Church admin users"}</p><Pagination page={page} pageCount={2} onPageChange={setPage} /></div>
    <InviteBranchAdminSheet open={inviteOpen} onOpenChange={setInviteOpen} onInvite={(email, role) => setAdmins((current) => [...current, { id: Date.now(), name: email.split("@")[0], email, role, unit: "Nil", active: "Pending invite" }])} />
    <BranchAdminSheets key={selected?.id ?? "none"} admin={selected} action={action} onActionChange={setAction} onSave={(updated) => setAdmins((current) => current.map((admin) => admin.id === updated.id ? updated : admin))} onDeactivate={(id) => setAdmins((current) => current.map((admin) => admin.id === id ? { ...admin, deactivated: !admin.deactivated } : admin))} onDelete={(id) => setAdmins((current) => current.filter((admin) => admin.id !== id))} />
  </div>;
};

const AppsTab = () => (
  <div className="mt-6">
    <p className="text-sm text-crozier-text-body-light">Access branch’s applications and details</p>
    <div className="mt-6 ml-1 flex items-start gap-9">
      <article className="flex h-[113px] w-[134px] flex-col items-center justify-center rounded-[20px] border border-crozier-border-primary-shade-3 bg-crozier-surface-primary shadow-[0_2px_5px_rgba(20,40,80,0.02)]">
        <span className="relative block h-11 w-12" aria-hidden="true">
          <span className="absolute top-0 left-0 h-10 w-[42px] rounded-tl-[11px] rounded-tr-[11px] border-t-[5px] border-l-[5px] border-[#2F7DD4]" />
          <img src={branchAdminLogo} alt="" className="absolute top-[13px] left-[18px] size-[29px]" />
        </span>
        <span className="mt-2 text-xs leading-4 text-crozier-text-heading">Branch Admin</span>
      </article>
      <article className="flex h-[113px] w-[146px] flex-col items-center justify-center rounded-[20px] border border-crozier-border-primary-shade-3 bg-crozier-surface-primary shadow-[0_2px_5px_rgba(20,40,80,0.02)]">
        <span className="relative block h-11 w-[49px]" aria-hidden="true">
          <span className="absolute top-0 left-0 h-10 w-[45px] rounded-tl-[11px] rounded-tr-[11px] border-t-[5px] border-l-[5px] border-[#008744]" />
          <img src={membersLogo} alt="" className="absolute top-[13px] left-[15px] h-[29px] w-[33px]" />
        </span>
        <span className="mt-2 text-xs leading-4 text-crozier-text-heading">Members Mgmt.</span>
      </article>
    </div>
  </div>
);

const UnitDetailsPageContent = () => {
  const [params, setParams] = useSearchParams();
  const active = (params.get("tab") as BranchTab) || "details";
  const selectTab = (tab: BranchTab) => setParams(tab === "details" ? {} : {tab});
  return <div className="relative h-full px-5 pt-4">
    <nav className="flex items-center gap-7" aria-label="Branch sections">{tabs.map(tab=><TabButton key={tab.value} width={tab.width} active={active===tab.value} onClick={()=>selectTab(tab.value)}>{tab.label}</TabButton>)}</nav>
    {active === "details" && <BranchFormSheet mode="edit" trigger={<Button variant="outline" className="absolute top-4 right-5 h-8.5 border-crozier-surface-accent-1 px-5 text-crozier-text-action">Edit</Button>} />}
    {active === "details" && <DetailsTab />}
    {active === "analytics" && <AnalyticsTab />}
    {active === "admins" && <AdminsTab />}
    {active === "apps" && <AppsTab />}
  </div>;
};

export default UnitDetailsPageContent;
