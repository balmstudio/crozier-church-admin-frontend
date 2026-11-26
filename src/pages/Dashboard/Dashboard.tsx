import { useState } from "react";
import { CROZIERICONS, Icon } from "@/components/icons";
import Pagination from "@/components/common/Pagination";
import memberIcon from "@/assets/icons/dashboard/member-metric.svg";
import workerIcon from "@/assets/icons/dashboard/workers-metric.svg";
import { useBranchCountSummary } from "@/features/dashboard/hooks/useBranchCountSummary.hook";
import { useBranchMemberRanking } from "@/features/dashboard/hooks/useBranchMemberRanking.hook";
import { useTenantCongregantsOverview } from "@/features/dashboard/hooks/useTenantCongregantsOverview.hook";
import type { BranchMemberRankingStatus } from "@/features/dashboard/types/dashboard.types";

const MetricIcon = ({ type, src }: { type: "branch" | "region" | "members" | "workers"; src?: string }) => (
  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-crozier-surface-primary-tint text-crozier-icon-primary">
    {type === "branch" && <Icon type={CROZIERICONS.Hierarchy} size={12} />}
    {type === "region" && src && <img src={src} alt="" aria-hidden="true" className="size-3" />}
    {type === "members" && <img src={memberIcon} alt="" aria-hidden="true" className="h-3 w-[13px]" />}
    {type === "workers" && <img src={workerIcon} alt="" aria-hidden="true" className="h-3 w-[11px]" />}
  </span>
);

interface BranchSummaryCardProps {
  label: string;
  value: number;
  description: string;
}

const BranchSummaryCard = ({ label, value, description }: BranchSummaryCardProps) => (
  <article className="h-[118px] rounded-[20px] bg-crozier-surface-primary px-4 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
    <div className="flex items-center gap-2 text-sm leading-7 text-crozier-text-body">
      <MetricIcon type="branch" />
      <span>{label}</span>
    </div>
    <div className="mt-[13px] text-[30px] leading-7.5 font-normal">{value}</div>
    <p className="mt-0.5 text-xs leading-4 text-crozier-text-body-light">{description}</p>
  </article>
);

interface GlobalMemberCardProps {
  label: string;
  value: number;
  description: string;
  icon: "members" | "workers";
}

const GlobalMemberCard = ({ label, value, description, icon }: GlobalMemberCardProps) => (
  <article className="h-[117px] rounded-[20px] bg-crozier-surface-primary px-4 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
    <div className="flex items-center gap-2 text-sm leading-7 text-crozier-text-body">
      <MetricIcon type={icon} />
      <span>{label}</span>
    </div>
    <div className="mt-[13px] text-[30px] leading-7.5 font-normal">{value}</div>
    <p className="mt-0.5 text-xs leading-4 text-crozier-text-body-light">{description}</p>
  </article>
);

const Dashboard = () => {
  const [branchRankingStatus, setBranchRankingStatus] =
    useState<BranchMemberRankingStatus>("all");
  const [branchRankingPage, setBranchRankingPage] = useState(1);
  const {
    data: branchCountSummary,
    isError: isBranchCountSummaryError,
    isPending: isBranchCountSummaryPending,
    refetch: refetchBranchCountSummary,
  } = useBranchCountSummary();
  const {
    data: tenantCongregantsOverview,
    isError: isTenantCongregantsOverviewError,
    isPending: isTenantCongregantsOverviewPending,
    refetch: refetchTenantCongregantsOverview,
  } = useTenantCongregantsOverview();
  const {
    data: branchMemberRanking,
    isError: isBranchMemberRankingError,
    isPending: isBranchMemberRankingPending,
    refetch: refetchBranchMemberRanking,
  } = useBranchMemberRanking({
    status: branchRankingStatus,
    page: branchRankingPage,
    pageSize: 10,
  });

  const changeBranchRankingStatus = (status: BranchMemberRankingStatus) => {
    setBranchRankingStatus(status);
    setBranchRankingPage(1);
  };

  return (
    <div className="px-8 pt-[31px] pb-8 text-crozier-text-body-shade max-md:px-4">
      <section aria-labelledby="branches-heading">
        <h1 id="branches-heading" className="text-base leading-5 font-semibold">Branches</h1>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {isBranchCountSummaryPending &&
            ["Parent branches", "Sub branches", "Cell groups"].map((label) => (
              <article
                key={label}
                aria-label={`Loading ${label.toLowerCase()}`}
                className="h-[118px] animate-pulse rounded-[20px] bg-crozier-surface-primary"
              />
            ))}
          {isBranchCountSummaryError && (
            <div className="col-span-full flex h-[118px] items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
              <span>Unable to load branch summary.</span>
              <button
                type="button"
                onClick={() => refetchBranchCountSummary()}
                className="font-medium text-crozier-text-accent"
              >
                Try again
              </button>
            </div>
          )}
          {branchCountSummary && (
            <>
              <BranchSummaryCard
                label="Parent branches"
                value={branchCountSummary.parentBranchCount}
                description="Branches directly under the HQ branch"
              />
              <BranchSummaryCard
                label="Sub branches"
                value={branchCountSummary.subBranchCount}
                description="Branches under a parent branch"
              />
              <BranchSummaryCard
                label="Cell groups"
                value={branchCountSummary.cellGroupCount}
                description="Small cell groups under a parent branch"
              />
            </>
          )}
        </div>
      </section>

    {/* Branch distribution is temporarily hidden. */}

    <section className="mt-[54px]" aria-labelledby="members-heading">
      <h2 id="members-heading" className="text-base leading-5 font-semibold">Global members</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {isTenantCongregantsOverviewPending &&
          ["Members", "Workers"].map((label) => (
            <article
              key={label}
              aria-label={`Loading total ${label.toLowerCase()}`}
              className="h-[117px] animate-pulse rounded-[20px] bg-crozier-surface-primary"
            />
          ))}
        {isTenantCongregantsOverviewError && (
          <div className="col-span-full flex h-[117px] items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
            <span>Unable to load global members.</span>
            <button
              type="button"
              onClick={() => refetchTenantCongregantsOverview()}
              className="font-medium text-crozier-text-accent"
            >
              Try again
            </button>
          </div>
        )}
        {tenantCongregantsOverview && (
          <>
            <GlobalMemberCard
              label="Members"
              value={tenantCongregantsOverview.totalMembers}
              description="Total members across the tenant"
              icon="members"
            />
            <GlobalMemberCard
              label="Workers"
              value={tenantCongregantsOverview.totalWorkers}
              description="Members serving as workers across the tenant"
              icon="workers"
            />
          </>
        )}
      </div>
    </section>

    <section className="mt-[53px]" aria-labelledby="branch-members-heading">
      <div className="flex items-center justify-between gap-6">
        <h2 id="branch-members-heading" className="text-base leading-8 font-semibold">Global members per branch</h2>
        <div className="flex h-9 items-center rounded-xl bg-crozier-surface-disabled-lightest p-1 text-xs text-crozier-text-placeholder">
          {(["all", "active", "inactive"] as const).map((status) => (
            <button
              key={status}
              className={`h-7 rounded-lg px-3 capitalize ${
                branchRankingStatus === status
                  ? "bg-crozier-surface-disabled-lighter text-crozier-text-body"
                  : ""
              }`}
              type="button"
              aria-pressed={branchRankingStatus === status}
              onClick={() => changeBranchRankingStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-[20px] bg-white px-4 py-[18px] shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
        {isBranchMemberRankingPending && (
          <div className="h-[284px] animate-pulse rounded-xl bg-crozier-surface-primary" />
        )}
        {isBranchMemberRankingError && (
          <div className="flex h-[284px] items-center justify-center gap-3 text-sm text-crozier-text-body-light">
            <span>Unable to load branch member ranking.</span>
            <button
              type="button"
              onClick={() => refetchBranchMemberRanking()}
              className="font-medium text-crozier-text-accent"
            >
              Try again
            </button>
          </div>
        )}
        {branchMemberRanking && branchMemberRanking.results.length === 0 && (
          <div className="flex h-[284px] items-center justify-center text-sm text-crozier-text-body-light">
            No branches found for this activity status.
          </div>
        )}
        {branchMemberRanking && branchMemberRanking.results.length > 0 && (
          <ol className="space-y-6">
            {branchMemberRanking.results.map((branch) => (
            <li key={branch.branchId} className="grid grid-cols-[198px_minmax(0,1fr)] items-center gap-4 text-sm leading-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="shrink-0">{branch.rank}.</span>
                <span className="truncate font-medium">{branch.branchName}</span>
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-5 min-w-0 flex-1">
                  <div
                    className="h-full rounded-full bg-crozier-primary-400"
                    style={{
                      width: `${branchMemberRanking.results[0].memberCount === 0
                        ? 0
                        : (branch.memberCount / branchMemberRanking.results[0].memberCount) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-[205px] shrink-0 whitespace-nowrap text-base font-semibold">
                  {branch.memberCount.toLocaleString()} <span className="text-sm font-normal text-crozier-text-placeholder">members</span>
                </div>
              </div>
            </li>
          ))}
          </ol>
        )}
        {branchMemberRanking && branchMemberRanking.totalPages > 1 && (
          <div className="mt-6 flex justify-end border-t border-crozier-border-primary pt-4">
            <Pagination
              page={branchMemberRanking.currentPage}
              pageCount={branchMemberRanking.totalPages}
              onPageChange={setBranchRankingPage}
            />
          </div>
        )}
      </div>
    </section>
    </div>
  );
};

export default Dashboard;
