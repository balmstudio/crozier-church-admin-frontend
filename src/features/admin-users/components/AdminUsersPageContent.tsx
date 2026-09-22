import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BranchAdminUsersTab from "@/features/admin-users/components/BranchAdminUsersTab";
import InviteAdminUserSheet from "@/features/admin-users/components/InviteAdminUserSheet";
import RolesTab from "@/features/admin-users/components/RolesTab";
import AddRoleSheet from "@/features/admin-users/components/AddRoleSheet";

type AdminUsersTab = "users" | "roles";

const AdminUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: AdminUsersTab = searchParams.get("tab") === "roles" ? "roles" : "users";
  const handleTabChange = (nextTab: string) => {
    setSearchParams(nextTab === "roles" ? { tab: "roles" } : {});
  };

  const tabActions: Record<AdminUsersTab, ReactNode> = {
    users: <InviteAdminUserSheet />,
    roles: <AddRoleSheet />,
  };

  return (
    <div className="px-5 pt-4 pb-5 max-md:px-4">
      <Tabs value={tab} onValueChange={handleTabChange} className="gap-0">
        <div className="flex items-center justify-between gap-5">
          <TabsList className="h-8.5 gap-12 bg-transparent p-0" aria-label="Admin user views">
            <TabsTrigger
              value="users"
              className="h-8.5 w-43.5 rounded-[10px] px-5 text-sm font-normal
                text-crozier-text-body data-active:bg-crozier-surface-primary-tint
                data-active:shadow-none"
            >
              Church admin users
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="h-8.5 rounded-[10px] px-5 text-sm font-normal
                text-crozier-text-placeholder data-active:bg-crozier-surface-primary-tint
                data-active:text-crozier-text-body data-active:shadow-none"
            >
              Roles
            </TabsTrigger>
          </TabsList>
          {tabActions[tab]}
        </div>

        <TabsContent value="users">
          <BranchAdminUsersTab />
        </TabsContent>

        <TabsContent value="roles">
          <RolesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;
