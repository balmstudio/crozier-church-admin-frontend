import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { useTenantBranches } from "@/features/branches/hooks/useTenantBranches.hook";
import type { TenantBranch } from "@/features/branches/types/branch.types";
import { useAuthStore } from "@/store/authStore";
import BranchFormSheet from "./BranchFormSheet";

const PAGE_SIZE = 10;

const BranchCard = ({ branch }: { branch: TenantBranch }) => (
  <Link to={`/units/${branch.id}`} className="block min-w-0 no-underline">
    <article className="h-[158px] rounded-[20px] border border-crozier-border-primary-shade-3 bg-crozier-surface-primary px-5 py-4 shadow-[0_2px_4px_rgba(16,35,63,0.04)]">
      <div className="flex items-center gap-3 text-sm font-medium text-crozier-text-body">
        {branch.logo && (
          <img src={branch.logo} alt="" className="size-6 rounded-md object-cover" />
        )}
        <span className="truncate">{branch.name}</span>
      </div>
      <p className="mt-4 truncate text-xs text-crozier-text-placeholder">
        {branch.address}
      </p>
      <div className="mt-5 flex items-center gap-2 text-xs text-crozier-text-heading">
        <span className="rounded-full bg-crozier-surface-disabled-lighter px-2 py-1">
          {branch.parentBranchId === null ? "Primary branch" : "Sub-branch"}
        </span>
        <span className="truncate text-crozier-text-placeholder">{branch.slug}</span>
      </div>
    </article>
  </Link>
);

const BranchSection = ({
  title,
  branches,
}: {
  title: string;
  branches: TenantBranch[];
}) => {
  if (branches.length === 0) return null;

  return (
    <section className="mt-[42px]" aria-label={title}>
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-[23px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </section>
  );
};

const UnitsPageContent = () => {
  const tenantId = useAuthStore((state) => state.user?.tenantId);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim();
  const { data, isError, isPending, refetch } = useTenantBranches(tenantId, {
    pageNumber: page,
    limit: PAGE_SIZE,
    ...(normalizedSearch ? { search: normalizedSearch } : {}),
  });

  const branches = data?.data.docs ?? [];
  const primaryBranches = branches.filter((branch) => branch.parentBranchId === null);
  const subBranches = branches.filter((branch) => branch.parentBranchId !== null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-base font-semibold text-crozier-text-body">Manage branches</h1>
        <BranchFormSheet
          mode="create"
          trigger={(
            <Button className="h-8.5 rounded-[10px] bg-crozier-text-action px-5 text-sm text-white">
              Create branch
            </Button>
          )}
        />
      </div>

      <label className="mt-6 flex h-10 w-full max-w-[300px] items-center gap-2 rounded-[10px] border border-crozier-border-primary px-3 text-crozier-text-placeholder">
        <Search size={15} aria-hidden="true" />
        <span className="sr-only">Search branches</span>
        <input
          type="search"
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-sm text-crozier-text-body outline-none placeholder:text-crozier-text-placeholder"
        />
      </label>

      {isPending && (
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-[158px] animate-pulse rounded-[20px] bg-crozier-surface-primary"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-7 flex h-[158px] items-center justify-center gap-3 rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          <span>Unable to load branches.</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium text-crozier-text-accent"
          >
            Try again
          </button>
        </div>
      )}

      {data && branches.length === 0 && (
        <div className="mt-7 flex h-[158px] items-center justify-center rounded-[20px] bg-crozier-surface-primary text-sm text-crozier-text-body-light">
          No branches found.
        </div>
      )}

      {data && branches.length > 0 && (
        <>
          <BranchSection title="Primary branches" branches={primaryBranches} />
          <BranchSection title="Sub branches" branches={subBranches} />
        </>
      )}

      {data && data.data.meta.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-5">
          <p className="text-sm text-crozier-text-body-light">
            {data.data.meta.totalRecord} branches
          </p>
          <Pagination
            page={data.data.meta.page}
            pageCount={data.data.meta.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default UnitsPageContent;
