import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import StackedBarChart from "@/components/charts/StackedBarChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CROZIERICONS, Icon } from "@/components/icons";
import branchAdminLogo from "@/assets/icons/units/branch-admin-logo.png";
import membersLogo from "@/assets/icons/units/members-logo.png";
import memberMetricIcon from "@/assets/icons/dashboard/member-metric.svg";
import workersMetricIcon from "@/assets/icons/dashboard/workers-metric.svg";
import { monthlyBarData } from "@/features/dashboard/data/dashboard.mock";
import ChartPanel from "@/features/dashboard/components/ChartPanel";
import PeriodFilter from "@/features/dashboard/components/PeriodFilter";
import type { AnalyticsFilter } from "@/features/dashboard/types/dashboard.types";
import { useBranchByIdDetails } from "@/features/branches/hooks/useBranchByIdDetails.hook";
import { useBranchByIdVisitorConversion } from "@/features/branches/hooks/useBranchByIdVisitorConversion.hook";
import { useBranchByIdVisitorStatus } from "@/features/branches/hooks/useBranchByIdVisitorStatus.hook";
import { useBranchByIdNewConvertStatus } from "@/features/branches/hooks/useBranchByIdNewConvertStatus.hook";
import { useBranchByIdMemberGrowth } from "@/features/branches/hooks/useBranchByIdMemberGrowth.hook";
import { useBranchByIdMemberSummary } from "@/features/branches/hooks/useBranchByIdMemberSummary.hook";
import { useBranchByIdUnitAnalytics } from "@/features/branches/hooks/useBranchByIdUnitAnalytics.hook";
import { useBranchByIdUnitWorkerAnalytics } from "@/features/branches/hooks/useBranchByIdUnitWorkerAnalytics.hook";
import { useBranchByIdWorkers } from "@/features/branches/hooks/useBranchByIdWorkers.hook";
import BranchByIdVisitorConversionChart from "@/features/branches/components/BranchByIdVisitorConversionChart";
import BranchByIdMemberGrowthChart from "@/features/branches/components/BranchByIdMemberGrowthChart";
import BranchByIdMemberSummaryChart from "@/features/branches/components/BranchByIdMemberSummaryChart";
import type { BranchByIdDetails, BranchByIdWorker, BranchByIdWorkerRole } from "@/features/branches/types/branch.types";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import Pagination from "@/components/common/Pagination";
import TableRowActions from "@/components/common/TableRowActions";
import CopyButton from "@/components/common/CopyButton";
import BranchFormSheet from "./BranchFormSheet";
import { BranchWorkerDetailsSheet, EditBranchWorkerSheet, InviteBranchAdminSheet } from "./BranchAdminSheets";

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

const DetailsTab = ({ branch }: { branch: BranchByIdDetails }) => (
  <div className="relative mt-10 ml-3">
    <dl className="grid grid-cols-[156px_1fr] gap-y-9 text-sm">
      <dt className="text-crozier-text-body-light">Branch name</dt>
      <dd className="flex items-center gap-2">
        {branch.logo && <img src={branch.logo} alt="" className="size-6 rounded-md object-cover" />}
        {branch.name}
      </dd>
      <dt className="text-crozier-text-body-light">Resident pastor</dt>
      <dd>{branch.residentPastor ?? "Not assigned"}</dd>
      <dt className="text-crozier-text-body-light">Parent branch ID</dt>
      <dd>{branch.parentBranchId ?? "No parent branch"}</dd>
      <dt className="text-crozier-text-body-light">Branch classification</dt>
      <dd className="flex items-center gap-2">
        {branch.isHq && <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1 text-xs">HQ</span>}
        {branch.isPrimaryBranch && <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1 text-xs">Primary branch</span>}
        {branch.isSubBranch && <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1 text-xs">Sub-branch</span>}
        {branch.isCellGroup && <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1 text-xs">Cell group</span>}
        {!branch.isHq && !branch.isPrimaryBranch && !branch.isSubBranch && !branch.isCellGroup && "Unclassified"}
      </dd>
      <dt className="text-crozier-text-body-light">Address</dt>
      <dd>{branch.address}</dd>
      <dt className="text-crozier-text-body-light">Email address</dt>
      <dd className="flex items-center gap-2">
        {branch.email}
        <CopyButton value={branch.email} label="Copy email" />
      </dd>
      <dt className="text-crozier-text-body-light">Phone number</dt>
      <dd className="flex items-center gap-2">
        {branch.phoneNumber}
        <CopyButton value={branch.phoneNumber} label="Copy phone" />
      </dd>
      <dt className="text-crozier-text-body-light">Location</dt>
      <dd>{branch.addressLine1}, {branch.addressCity}, {branch.addressState}, {branch.addressCountry} {branch.addressPostcode}</dd>
      <dt className="text-crozier-text-body-light">Slug</dt>
      <dd>{branch.slug}</dd>
      <dt className="text-crozier-text-body-light">Tenant</dt>
      <dd>{branch.TenantModel.name} ({branch.TenantModel.abbreviatedName})</dd>
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

const VisitorStatusAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const [filter, setFilter] = useState<AnalyticsFilter>("year");
  const { data, isError, isPending, refetch } = useBranchByIdVisitorStatus(branchId, {
    filter,
    year: String(new Date().getFullYear()),
  });

  return (
    <section aria-labelledby="visitors-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="visitors-heading" className="text-base font-semibold text-crozier-text-body-shade">
          Visitors
        </h2>
        <PeriodFilter value={filter} onChange={setFilter} />
      </div>
      {isPending && (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-25.5 animate-pulse rounded-[20px] bg-crozier-surface-primary" />
          ))}
        </div>
      )}
      {isError && (
        <div className="mt-3 flex h-25.5 items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>Unable to load visitor analytics.</span>
          <button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button>
        </div>
      )}
      {data && (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {data.data.categories.map((category) => {
            const direction = category.percentage_change === null || category.percentage_change === 0
              ? "neutral"
              : category.percentage_change > 0
                ? "up"
                : "down";
            return (
              <article key={category.status_index} className="min-h-25.5 rounded-[20px] bg-crozier-surface-primary px-5 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.025)]">
                <div className="flex items-center gap-2 text-sm text-crozier-text-body">
                  <span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-disabled-lighter text-crozier-text-heading">
                    <img src={memberMetricIcon} alt="" aria-hidden="true" className="h-3 w-13.5" />
                  </span>
                  <span>{category.status_label}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <strong className="font-sans text-[30px] leading-none font-normal text-crozier-text-body">
                    {category.count}
                  </strong>
                  <span className={`rounded border px-1.5 py-0.5 text-[10px] leading-none ${
                    direction === "up"
                      ? "border-crozier-border-success text-crozier-text-success"
                      : direction === "down"
                        ? "border-crozier-border-error text-crozier-text-error"
                        : "border-crozier-border-primary text-crozier-text-body-light"
                  }`}>
                    {direction === "up" ? "↑ " : direction === "down" ? "↓ " : ""}
                    {category.percentage_change === null ? "N/A" : `${category.percentage_change}%`}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

const VisitorConversionAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const { data, isError, isPending, refetch } = useBranchByIdVisitorConversion(branchId);

  if (isPending) {
    return <div className="h-83.25 animate-pulse rounded-[20px] bg-crozier-surface-primary" />;
  }

  if (isError) {
    return (
      <div className="flex h-83.25 items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
        <span>Unable to load visitor conversions.</span>
        <button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button>
      </div>
    );
  }

  if (!data || data.data.analytics.length === 0) {
    return (
      <div className="flex h-83.25 items-center justify-center rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
        No visitor conversion data available.
      </div>
    );
  }

  return <BranchByIdVisitorConversionChart analytics={data.data.analytics} />;
};

const NewConvertStatusAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const [filter, setFilter] = useState<AnalyticsFilter>("year");
  const { data, isError, isPending, refetch } = useBranchByIdNewConvertStatus(branchId, {
    filter,
    year: String(new Date().getFullYear()),
  });

  return (
    <section aria-labelledby="new-converts-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="new-converts-heading" className="text-base font-semibold text-crozier-text-body-shade">
          New converts
        </h2>
        <PeriodFilter value={filter} onChange={setFilter} />
      </div>
      {isPending && (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-25.5 animate-pulse rounded-[20px] bg-crozier-surface-primary" />
          ))}
        </div>
      )}
      {isError && (
        <div className="mt-3 flex h-25.5 items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>Unable to load new convert analytics.</span>
          <button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button>
        </div>
      )}
      {data && (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.data.categories.map((category) => {
            const direction = category.percentage_change === null || category.percentage_change === 0
              ? "neutral"
              : category.percentage_change > 0
                ? "up"
                : "down";
            return (
              <article key={category.status_index} className="min-h-25.5 rounded-[20px] bg-crozier-surface-primary px-5 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.025)]">
                <div className="flex items-center gap-2 text-sm text-crozier-text-body">
                  <span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-disabled-lighter text-crozier-text-heading">
                    <img src={memberMetricIcon} alt="" aria-hidden="true" className="h-3 w-13.5" />
                  </span>
                  <span>{category.status_label}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <strong className="font-sans text-[30px] leading-none font-normal text-crozier-text-body">
                    {category.count}
                  </strong>
                  <span className={`rounded border px-1.5 py-0.5 text-[10px] leading-none ${
                    direction === "up"
                      ? "border-crozier-border-success text-crozier-text-success"
                      : direction === "down"
                        ? "border-crozier-border-error text-crozier-text-error"
                        : "border-crozier-border-primary text-crozier-text-body-light"
                  }`}>
                    {direction === "up" ? "↑ " : direction === "down" ? "↓ " : ""}
                    {category.percentage_change === null ? "N/A" : `${category.percentage_change}%`}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

const MemberGrowthAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const [filter, setFilter] = useState<AnalyticsFilter>("3_months");
  const { data, error, isError, isPending, refetch } = useBranchByIdMemberGrowth(branchId, { filter });

  return (
    <ChartPanel title="Members graph" action={<PeriodFilter value={filter} onChange={setFilter} />}>
      {isPending && <div className="h-107.5 animate-pulse rounded-[20px] bg-crozier-surface-primary" />}
      {isError && (
        <div className="flex h-107.5 items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>{getErrorMessage(error, "Unable to load member growth.")}</span>
          <button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button>
        </div>
      )}
      {data && data.data.analytics.length === 0 && (
        <div className="flex h-107.5 items-center justify-center rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          No member growth data available.
        </div>
      )}
      {data && data.data.analytics.length > 0 && (
        <BranchByIdMemberGrowthChart analytics={data.data.analytics} />
      )}
    </ChartPanel>
  );
};

const MemberSummaryAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const { data, isError, isPending, refetch } = useBranchByIdMemberSummary(branchId, {
    activityStatus: "all",
  });

  return (
    <ChartPanel title="All time">
      {isPending && <div className="h-107.5 animate-pulse rounded-[20px] bg-crozier-surface-primary" />}
      {isError && (
        <div className="flex h-107.5 items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>Unable to load member summary.</span>
          <button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button>
        </div>
      )}
      {data && <BranchByIdMemberSummaryChart summary={data.data} />}
    </ChartPanel>
  );
};

const MemberAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  return <div className="mx-3 mt-9.5 space-y-12.5">
    <VisitorStatusAnalytics branchId={branchId} />
    <div className="grid grid-cols-2 gap-6"><ChartPanel title="Monthly retained visitors"><StackedBarChart data={monthlyBarData} ariaLabel="Monthly retained visitors" /></ChartPanel><ChartPanel title="Monthly converted visitors"><VisitorConversionAnalytics branchId={branchId} /></ChartPanel></div>
    <NewConvertStatusAnalytics branchId={branchId} />
    <div className="grid grid-cols-2 gap-6"><MemberGrowthAnalytics branchId={branchId} /><MemberSummaryAnalytics branchId={branchId} /></div>
  </div>;
};

const WorkersAnalytics = ({ branchId }: { branchId: string | undefined }) => {
  const {
    data: unitAnalytics,
    error: unitAnalyticsError,
    isError: isUnitAnalyticsError,
    isPending: isUnitAnalyticsPending,
    refetch: refetchUnitAnalytics,
  } = useBranchByIdUnitAnalytics(branchId);
  const {
    data: unitWorkerAnalytics,
    error: unitWorkerAnalyticsError,
    isError: isUnitWorkerAnalyticsError,
    isPending: isUnitWorkerAnalyticsPending,
    refetch: refetchUnitWorkerAnalytics,
  } = useBranchByIdUnitWorkerAnalytics(branchId);

  return <div className="mx-3 mt-10">
    <h2 className="text-base font-semibold">Overview</h2>
    <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {isUnitAnalyticsPending && ["Units", "Workers"].map((label) => (
        <div key={label} aria-label={`Loading ${label.toLowerCase()}`} className="h-[120px] animate-pulse rounded-[20px] bg-crozier-surface-primary" />
      ))}
      {isUnitAnalyticsError && (
        <div className="col-span-full flex h-[120px] items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>{getErrorMessage(unitAnalyticsError, "Unable to load unit analytics.")}</span>
          <button type="button" onClick={() => refetchUnitAnalytics()} className="font-medium text-crozier-text-accent">Try again</button>
        </div>
      )}
      {unitAnalytics && (
        <>
          <article className="h-[120px] rounded-[20px] bg-crozier-surface-primary p-4">
            <div className="flex items-center gap-2 text-sm"><span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-primary-tint"><Icon type={CROZIERICONS.Hierarchy} size={12} /></span>Units</div>
            <strong className="mt-3 block text-[30px] font-normal">{unitAnalytics.data.total_units}</strong>
            <p className="text-xs text-crozier-text-body-light">Functional administrative units in the branch</p>
          </article>
          <article className="h-[120px] rounded-[20px] bg-crozier-surface-primary p-4">
            <div className="flex items-center gap-2 text-sm"><span className="grid size-7 place-items-center rounded-lg bg-crozier-surface-primary-tint"><img src={workersMetricIcon} alt="" className="h-3 w-[11px]" /></span>Workers</div>
            <strong className="mt-3 block text-[30px] font-normal">{unitAnalytics.data.total_workers}</strong>
            <p className="text-xs text-crozier-text-body-light">Workers assigned to units in the branch</p>
          </article>
        </>
      )}
    </div>
    <h2 className="mt-12 text-base font-semibold">Unit workers count</h2>
    {isUnitWorkerAnalyticsPending && (
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-[104px] animate-pulse rounded-[20px] bg-crozier-surface-primary" />)}
      </div>
    )}
    {isUnitWorkerAnalyticsError && (
      <div className="mt-4 flex h-[104px] items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
        <span>{getErrorMessage(unitWorkerAnalyticsError, "Unable to load unit worker analytics.")}</span>
        <button type="button" onClick={() => refetchUnitWorkerAnalytics()} className="font-medium text-crozier-text-accent">Try again</button>
      </div>
    )}
    {unitWorkerAnalytics && unitWorkerAnalytics.data.length === 0 && (
      <div className="mt-4 flex h-[104px] items-center justify-center rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">No units found.</div>
    )}
    {unitWorkerAnalytics && unitWorkerAnalytics.data.length > 0 && (
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {unitWorkerAnalytics.data.map((unit) => (
          <article key={unit.unitId} className="h-[104px] rounded-[20px] bg-crozier-surface-primary p-4">
            <p className="truncate text-sm">{unit.unitName}</p>
            <strong className="mt-5 block text-[30px] font-normal">{unit.workerCount}</strong>
          </article>
        ))}
      </div>
    )}
  </div>;
};

const AnalyticsTab = ({ branchId }: { branchId: string | undefined }) => {
  const [workers, setWorkers] = useState(false);
  return <><div className="absolute top-4 right-5"><AnalyticsSelect workers={workers} onChange={setWorkers} /></div>{workers ? <WorkersAnalytics branchId={branchId} /> : <MemberAnalytics branchId={branchId} />}</>;
};

const AdminsTab = ({ branchId }: { branchId: string | undefined }) => {
  const [selected, setSelected] = useState<BranchByIdWorker | null>(null);
  const [editing, setEditing] = useState<BranchByIdWorker | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<BranchByIdWorkerRole | "">("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const normalizedSearch = search.trim();
  const { data, error, isError, isPending, refetch } = useBranchByIdWorkers(branchId, {
    pageNumber: page,
    limit: 10,
    ...(normalizedSearch ? { search: normalizedSearch } : {}),
    ...(roleFilter ? { filter: roleFilter } : {}),
  });
  const workers = data?.data.docs ?? [];

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
          {(["", "Admin", "Worker"] as const).map((role) => <button key={role} type="button" className="block h-8 w-full rounded-md px-2 text-left text-sm hover:bg-crozier-surface-primary-tint" onClick={() => { setRoleFilter(role); setFilterOpen(false); setPage(1); }}>{role || "All roles"}</button>)}
        </div>}
      </div>
    </div>
    <div className="mt-7.5 overflow-x-auto">
    <table className="w-full min-w-[900px] table-fixed text-sm text-crozier-text-body">
      <colgroup><col className="w-[40%]" /><col className="w-[22%]" /><col className="w-[17%]" /><col className="w-[17%]" /><col className="w-[4%]" /></colgroup>
      <thead className="h-9 bg-crozier-surface-primary text-crozier-text-placeholder"><tr><th className="px-2 text-left font-normal">Personal details</th><th className="px-2 text-center font-normal">Role</th><th className="px-2 text-center font-normal">Unit</th><th className="px-2 text-center font-normal">Last active</th><th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>
        {isPending && <tr><td colSpan={5}><div className="h-[270px] animate-pulse bg-crozier-surface-primary" /></td></tr>}
        {isError && <tr><td colSpan={5}><div className="flex h-[180px] items-center justify-center gap-3 text-sm text-crozier-text-body-light"><span>{getErrorMessage(error, "Unable to load branch workers.")}</span><button type="button" onClick={() => refetch()} className="font-medium text-crozier-text-accent">Try again</button></div></td></tr>}
        {data && workers.length === 0 && <tr><td colSpan={5}><div className="flex h-[180px] items-center justify-center text-sm text-crozier-text-body-light">No branch workers found.</div></td></tr>}
        {workers.map((worker, index) => {
          const workerProfile = worker.workerProfile?.[0];
          const name = `${worker.firstName} ${worker.lastName}`;
          return <tr key={workerProfile?.id ?? worker.email} className={`h-[54px] border-b border-crozier-border-primary ${index % 2 ? "bg-crozier-surface-primary" : ""}`}>
            <td className="px-2"><div className="flex min-w-0 items-center gap-2">{worker.profileImage ? <img src={worker.profileImage} alt="" className="size-7.5 shrink-0 rounded-full object-cover" /> : <span className="grid size-7.5 shrink-0 place-items-center rounded-full bg-crozier-surface-primary-tint text-crozier-text-heading">{worker.firstName[0]}{worker.lastName[0]}</span>}<span className="min-w-0"><strong className="block truncate font-normal leading-5">{name}</strong><small className="block truncate text-sm leading-5 text-crozier-text-placeholder">{worker.email}</small></span></div></td>
            <td className="truncate px-2 text-center">{workerProfile?.isSuperAdmin ? "Branch super admin" : (workerProfile?.role ?? "Nil")}</td>
            <td className="truncate px-2 text-center">{workerProfile?.unit?.name ?? "Nil"}</td>
            <td className="whitespace-nowrap px-2 text-center">{workerProfile?.lastSeen ? new Date(workerProfile.lastSeen).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Nil"}</td>
            <td className="text-center"><TableRowActions label={`Open actions for ${name}`} contentClassName="w-[102px] min-w-[102px] p-1" itemClassName="h-9 px-2.5" actions={[{ label: "View", onSelect: () => setSelected(worker) }, { label: "Edit", onSelect: () => setEditing(worker) }]} /></td>
          </tr>;
        })}
      </tbody>
    </table>
    </div>
    {data && <div className="absolute right-5 bottom-4 left-7.5 flex items-center justify-between"><p className="text-sm text-crozier-text-body-light">{data.data.meta.totalRecord} Church admin users</p>{data.data.meta.totalPages > 1 && <Pagination page={data.data.meta.page} pageCount={data.data.meta.totalPages} onPageChange={setPage} />}</div>}
    <InviteBranchAdminSheet open={inviteOpen} onOpenChange={setInviteOpen} onInvite={() => undefined} />
    <BranchWorkerDetailsSheet worker={selected} onOpenChange={(open) => !open && setSelected(null)} />
    <EditBranchWorkerSheet key={editing?.workerProfile?.[0]?.id ?? "no-worker"} worker={editing} branchId={branchId} onOpenChange={(open) => !open && setEditing(null)} />
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
  const { unitId: branchId } = useParams<{ unitId: string }>();
  const [params, setParams] = useSearchParams();
  const active = (params.get("tab") as BranchTab) || "details";
  const selectTab = (tab: BranchTab) => setParams(tab === "details" ? {} : {tab});
  const {
    data: branchByIdDetails,
    isError: isBranchByIdDetailsError,
    isPending: isBranchByIdDetailsPending,
    refetch: refetchBranchByIdDetails,
  } = useBranchByIdDetails(branchId, active === "details");
  return <div className="relative h-full px-5 pt-4">
    <nav className="flex items-center gap-7" aria-label="Branch sections">{tabs.map(tab=><TabButton key={tab.value} width={tab.width} active={active===tab.value} onClick={()=>selectTab(tab.value)}>{tab.label}</TabButton>)}</nav>
    {active === "details" && branchByIdDetails && (
      <BranchFormSheet
        mode="edit"
        branchDetails={branchByIdDetails.data}
        trigger={<Button variant="outline" className="absolute top-4 right-5 h-8.5 border-crozier-surface-accent-1 px-5 text-crozier-text-action">Edit</Button>}
      />
    )}
    {active === "details" && isBranchByIdDetailsPending && (
      <div className="mt-10 ml-3 h-[420px] max-w-3xl animate-pulse rounded-[20px] bg-crozier-surface-primary" />
    )}
    {active === "details" && isBranchByIdDetailsError && (
      <div className="mt-10 ml-3 flex h-[240px] max-w-3xl items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
        <span>Unable to load branch details.</span>
        <button type="button" onClick={() => refetchBranchByIdDetails()} className="font-medium text-crozier-text-accent">Try again</button>
      </div>
    )}
    {active === "details" && branchByIdDetails && <DetailsTab branch={branchByIdDetails.data} />}
    {active === "analytics" && <AnalyticsTab branchId={branchId} />}
    {active === "admins" && <AdminsTab branchId={branchId} />}
    {active === "apps" && <AppsTab />}
  </div>;
};

export default UnitDetailsPageContent;
