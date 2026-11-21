import type { BranchByIdDetails } from "@/features/branches/types/branch.types";

const BranchDetails = ({ branch }: { branch: BranchByIdDetails }) => {
  const tenant = branch.TenantModel;

  return <div className="mt-6">
    <p className="text-sm text-crozier-text-body-light">Edit the church’s profile and brand details</p>
    <dl className="mt-5 grid grid-cols-[156px_1fr] gap-y-6 px-3 text-sm text-crozier-text-body">
      <dt className="self-center text-crozier-text-body-light">Name</dt>
      <dd className="flex min-h-5 items-center">{tenant.name}</dd>

      <dt className="self-center text-crozier-text-body-light">Abbreviated name</dt>
      <dd className="flex min-h-5 items-center">{tenant.abbreviatedName}</dd>

      <dt className="self-center text-crozier-text-body-light">Logo</dt>
      <dd className="flex min-h-9 items-center">
        {tenant.logo ? <img src={tenant.logo} alt={`${tenant.name} logo`} className="size-6 rounded-full object-cover" /> : "Nil"}
      </dd>

      <dt className="self-center text-crozier-text-body-light">Primary colour</dt>
      <dd className="flex min-h-10 items-center gap-2">
        <span className="size-6 rounded-sm" style={{ backgroundColor: tenant.theme.primaryColour }} />
        <span className="rounded-sm bg-crozier-surface-primary-tint px-2 py-1">
          {tenant.theme.primaryColour}
        </span>
      </dd>

      <dt className="self-center text-crozier-text-body-light">HQ branch</dt>
      <dd className="flex min-h-10 items-center gap-4">
        {branch.isHq ? branch.name : "Not assigned"}
        <span>{branch.residentPastor ?? "Resident pastor not assigned"}</span>
      </dd>
    </dl>
  </div>;
};

export default BranchDetails;
