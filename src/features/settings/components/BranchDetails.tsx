import pastorAvatar from "@/assets/units-unit-head.png";
import type { BranchContact } from "../types/branch.types";

const BranchDetails = ({ branch }: { branch: BranchContact }) => (
  <div className="mt-6">
    <p className="text-sm text-crozier-text-body-light">Edit the church’s profile and brand details</p>
    <dl className="mt-5 grid grid-cols-[156px_1fr] gap-y-6 px-3 text-sm text-crozier-text-body">
      <dt className="self-center text-crozier-text-body-light">Name</dt>
      <dd className="flex min-h-5 items-center">{branch.name}</dd>

      <dt className="self-center text-crozier-text-body-light">Abbreviated name</dt>
      <dd className="flex min-h-5 items-center">{branch.abbreviatedName}</dd>

      <dt className="self-center text-crozier-text-body-light">Logo</dt>
      <dd className="flex min-h-9 items-center">
        <img src={branch.logo} alt={`${branch.name} logo`} className="size-6 rounded-full object-cover" />
      </dd>

      <dt className="self-center text-crozier-text-body-light">Primary colour</dt>
      <dd className="flex min-h-10 items-center gap-2">
        <span className="size-6 rounded-sm" style={{ backgroundColor: branch.primaryColour }} />
        <span className="rounded-sm bg-crozier-surface-primary-tint px-2 py-1">
          {branch.primaryColour === "#254c80" ? "#h3245" : branch.primaryColour}
        </span>
        <span className="ml-2">{branch.colourName}</span>
      </dd>

      <dt className="self-center text-crozier-text-body-light">HQ branch</dt>
      <dd className="flex min-h-10 items-center gap-4">
        {branch.hqBranch}
        <span className="flex items-center gap-2">
          <img src={pastorAvatar} alt="" className="size-6 rounded-full object-cover" />
          {branch.pastor}
        </span>
      </dd>
    </dl>
  </div>
);

export default BranchDetails;
