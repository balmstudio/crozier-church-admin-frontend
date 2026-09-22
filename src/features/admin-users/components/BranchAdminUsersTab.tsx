import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Pagination from "@/components/common/Pagination";
import DataTable from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import AdminUsersFilter, {
  type AdminUsersFilterValue,
} from "@/features/admin-users/components/AdminUsersFilter";
import { adminUserColumns } from "@/features/admin-users/components/admin-user-columns";
import { useAdminUsers } from "@/features/admin-users/hooks/useAdminUsers";

const pageSize = 9;

const BranchAdminUsersTab = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<AdminUsersFilterValue>({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const { data: adminUsers = [], isLoading, isError } = useAdminUsers();

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return adminUsers.filter((user) => {
      const matchesDate = (!filters.startDate || user.lastActiveISO >= filters.startDate) &&
        (!filters.endDate || user.lastActiveISO <= filters.endDate);
      const matchesSearch =
        !query ||
        [user.name, user.email, user.role].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesDate && matchesSearch;
    });
  }, [adminUsers, filters, search]);

  if (isLoading) {
    return <div className="p-8">Loading admin users...</div>;
  }

  if (isError) {
    return <div className="p-8">Unable to load admin users.</div>;
  }

  const pageCount = Math.max(2, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize);
  const resetPage = () => setPage(1);

  return (
    <section className="mt-7" aria-label="Church admin users">
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2
                text-crozier-text-placeholder"
          />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            placeholder="Search"
            className="h-9.5 w-75 rounded-[10px] border-crozier-border-primary pl-9
                text-xs focus-visible:ring-crozier-text-accent max-md:w-full"
          />
        </div>
        <AdminUsersFilter
          value={filters}
          onApply={(value) => {
            setFilters(value);
            resetPage();
          }}
        />
      </div>

      <div
        className="mt-7.5 overflow-hidden rounded-[10px]
            [&_tbody_tr:first-child]:h-14"
      >
        <DataTable
          columns={adminUserColumns}
          data={visibleUsers}
          getRowId={(user) => user.id}
          emptyMessage="No admin users found."
          ariaLabel="Church admin users"
        />
      </div>

      <div
        className="mt-5 flex items-center justify-between gap-4 pl-2.5 text-sm
            text-crozier-text-body-light"
      >
        <p>3 of 3 Church admin users</p>
        <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </section>
  );
};

export default BranchAdminUsersTab;
