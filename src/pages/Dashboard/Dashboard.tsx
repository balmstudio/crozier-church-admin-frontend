import { CROZIERICONS, Icon } from "@/components/icons";
import africaIcon from "@/assets/icons/dashboard/africa.svg";
import americasIcon from "@/assets/icons/dashboard/americas.svg";
import asiaIcon from "@/assets/icons/dashboard/asia.svg";
import europeIcon from "@/assets/icons/dashboard/europe.svg";
import oceaniaIcon from "@/assets/icons/dashboard/oceania.svg";
import memberIcon from "@/assets/icons/dashboard/member-metric.svg";
import workerIcon from "@/assets/icons/dashboard/workers-metric.svg";

const branchSummary = [
  { label: "Parent branches", value: "12", description: "Branches directly under the HQ branch" },
  { label: "Sub branches", value: "60", description: "Branches under a parent branch" },
  { label: "Cell groups", value: "60", description: "Small cell groups under a parent branch" },
];

const branchDistribution = [
  { label: "Africa", value: "34", icon: africaIcon },
  { label: "Americas", value: "6", icon: americasIcon },
  { label: "Asia", value: "8", icon: asiaIcon },
  { label: "Europe", value: "12", icon: europeIcon },
  { label: "Oceania", value: "0", icon: oceaniaIcon },
];

const memberSummary = [
  { label: "Members", value: "5K", description: "Members who are not actively working in a unit", icon: "members" as const },
  { label: "Workers", value: "4.2K", description: "Members who are actively working in a unit", icon: "workers" as const },
];

const branchMembers = [
  { name: "TCC Lekki, Lagos", value: "3,000", width: 100 },
  { name: "TCC Atlanta, Georgia", value: "2,632", width: 93.5 },
  { name: "TCC Dallas, Texas (HQ)", value: "2,131", width: 86.5 },
  { name: "TCC Mayfair, London", value: "2,010", width: 85.8 },
  { name: "TCC Casper, Wyoming", value: "1,547", width: 65.5 },
  { name: "TCC Victoria Island, Lagos", value: "1,500", width: 64.2 },
  { name: "TCC Chelsea, London", value: "950", width: 41.7 },
];

const MetricIcon = ({ type, src }: { type: "branch" | "region" | "members" | "workers"; src?: string }) => (
  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-crozier-surface-primary-tint text-crozier-icon-primary">
    {type === "branch" && <Icon type={CROZIERICONS.Hierarchy} size={12} />}
    {type === "region" && src && <img src={src} alt="" aria-hidden="true" className="size-3" />}
    {type === "members" && <img src={memberIcon} alt="" aria-hidden="true" className="h-3 w-[13px]" />}
    {type === "workers" && <img src={workerIcon} alt="" aria-hidden="true" className="h-3 w-[11px]" />}
  </span>
);

const Dashboard = () => (
  <div className="px-8 pt-[31px] pb-8 text-crozier-text-body-shade max-md:px-4">
    <section aria-labelledby="branches-heading">
      <h1 id="branches-heading" className="text-base leading-5 font-semibold">Branches</h1>
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {branchSummary.map((item) => (
          <article key={item.label} className="h-[118px] rounded-[20px] bg-crozier-surface-primary px-4 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
            <div className="flex items-center gap-2 text-sm leading-7 text-crozier-text-body">
              <MetricIcon type="branch" />
              <span>{item.label}</span>
            </div>
            <div className="mt-[13px] text-[30px] leading-7.5 font-normal">{item.value}</div>
            <p className="mt-0.5 text-xs leading-4 text-crozier-text-body-light">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mt-[53px]" aria-labelledby="distribution-heading">
      <h2 id="distribution-heading" className="text-base leading-5 font-semibold">Branch distribution</h2>
      <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {branchDistribution.map((item) => (
          <article key={item.label} className="h-[101px] rounded-[20px] bg-crozier-surface-primary px-4 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
            <div className="flex items-center gap-2 text-sm leading-7 text-crozier-text-body">
              <MetricIcon type="region" src={item.icon} />
              <span>{item.label}</span>
            </div>
            <div className="mt-[13px] text-[30px] leading-7.5 font-normal">{item.value}</div>
          </article>
        ))}
      </div>
    </section>

    <section className="mt-[54px]" aria-labelledby="members-heading">
      <h2 id="members-heading" className="text-base leading-5 font-semibold">Global members</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {memberSummary.map((item) => (
          <article key={item.label} className="h-[117px] rounded-[20px] bg-crozier-surface-primary px-4 py-4 shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
            <div className="flex items-center gap-2 text-sm leading-7 text-crozier-text-body">
              <MetricIcon type={item.icon} />
              <span>{item.label}</span>
            </div>
            <div className="mt-[13px] text-[30px] leading-7.5 font-normal">{item.value}</div>
            <p className="mt-0.5 text-xs leading-4 text-crozier-text-body-light">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mt-[53px]" aria-labelledby="branch-members-heading">
      <div className="flex items-center justify-between gap-6">
        <h2 id="branch-members-heading" className="text-base leading-8 font-semibold">Global members per branch</h2>
        <div className="flex h-9 w-[190px] items-center rounded-xl bg-crozier-surface-disabled-lightest p-1 text-xs text-crozier-text-placeholder">
          <button className="h-7 rounded-lg bg-crozier-surface-disabled-lighter px-2.5 text-crozier-text-body" type="button">All</button>
          <button className="h-7 px-3" type="button">Members</button>
          <button className="h-7 px-3" type="button">Workers</button>
        </div>
      </div>

      <div className="mt-3 rounded-[20px] bg-white px-4 py-[18px] shadow-[0_8px_24px_rgba(16,35,63,0.018)]">
        <ol className="space-y-6">
          {branchMembers.map((branch, index) => (
            <li key={branch.name} className="grid grid-cols-[198px_minmax(0,1fr)] items-center gap-4 text-sm leading-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="shrink-0">{index + 1}.</span>
                <span className="truncate font-medium">{branch.name}</span>
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-5 min-w-0 flex-1">
                  <div className="h-full rounded-full bg-crozier-primary-400" style={{ width: `${branch.width}%` }} />
                </div>
                <div className="w-[205px] shrink-0 whitespace-nowrap text-base font-semibold">
                  {branch.value} <span className="text-sm font-normal text-crozier-text-placeholder">members</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </div>
);

export default Dashboard;
