import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Pagination from "@/components/common/Pagination";
import { CROZIERICONS, Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { adminRoleColumns } from "@/features/admin-users/components/admin-role-columns";
import { useAdminRoles } from "@/features/admin-users/hooks/useAdminRoles";
import type { AdminRoleType } from "@/features/admin-users/types/admin-role.types";

type RoleTypeFilter = "All" | AdminRoleType;
const pageSize = 10;

const RolesTab = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<RoleTypeFilter>("All");
  const [page, setPage] = useState(1);
  const { data: adminRoles = [] } = useAdminRoles();

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return adminRoles.filter((role) => {
      const matchesType = type === "All" || role.type === type;
      const matchesSearch =
        !query ||
        [role.name, role.permissions, role.type].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesType && matchesSearch;
    });
  }, [adminRoles, search, type]);

  const pageCount = Math.max(1, Math.ceil(filteredRoles.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleRoles = filteredRoles.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <section className="mt-10" aria-label="Admin roles">
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-4 size-5 -translate-y-1/2
            text-crozier-text-placeholder"
          />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search"
            className="h-12 w-97.5 rounded-xl border-crozier-border-primary pl-12
              text-base focus-visible:ring-crozier-text-accent max-md:w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-xl px-4 text-base font-normal
                  text-crozier-text-body-light"
              />
            }
          >
            <Filter size={17} fill="currentColor" />
            {type === "All" ? "Type" : type}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="h-19 w-37.5 min-w-0 overflow-hidden rounded-[10px] border
              border-crozier-border-primary bg-crozier-surface-white-black p-0
              text-crozier-text-body shadow-md ring-0"
          >
            <DropdownMenuItem
              className="h-9.5 gap-2 rounded-none px-4 py-0 text-sm whitespace-nowrap text-crozier-text-body
                focus:bg-crozier-surface-disabled-lightest focus:text-crozier-text-body"
              onClick={() => {
                setType("System default");
                setPage(1);
              }}
            >
              <Icon
                type={CROZIERICONS.SystemDefault}
                width={11}
                height={10}
                className="text-crozier-text-body"
              />
              System default
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-9.5 gap-2 rounded-none px-4 py-0 text-sm text-crozier-text-body
                focus:bg-crozier-surface-disabled-lightest focus:text-crozier-text-body"
              onClick={() => {
                setType("Custom");
                setPage(1);
              }}
            >
              <Icon
                type={CROZIERICONS.CustomRole}
                width={11}
                height={10}
                className="text-crozier-text-body"
              />
              Custom
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl">
        <DataTable
          columns={adminRoleColumns}
          data={visibleRoles}
          getRowId={(role) => role.id}
          emptyMessage="No roles found."
          ariaLabel="Admin roles"
        />
      </div>

      <div
        className="mt-80 flex items-center justify-between gap-4
        text-sm text-crozier-text-body-light max-lg:mt-10"
      >
        <p>
          {visibleRoles.length} of {filteredRoles.length} roles
        </p>
        <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </section>
  );
};

export default RolesTab;
