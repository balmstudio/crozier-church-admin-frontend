import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { sidebarItems } from "../constants/sidebar";
import branchLogo from "@/assets/dashboard/branch-logo.png";
import churchAdminLogo from "@/assets/dashboard/church-admin.png";
import profileAvatar from "@/assets/dashboard/profile-avatar.png";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

const DashboardLayout = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="flex min-h-dvh bg-crozier-surface-white-black">
      <Sidebar
        brand={{ name: "Church Admin", logo: churchAdminLogo }}
        items={sidebarItems}
        user={{ name: "Victor Lawani", role: "Super Admin", avatar: profileAvatar }}
      />

      <main className="flex h-dvh min-w-0 flex-1 flex-col">
        <Navbar breadcrumbs={breadcrumbs} hasUnreadNotifications brand={{ name: "TCC Global", logo: branchLogo }} />

        <div className="min-h-0 flex-1 overflow-y-auto bg-crozier-surface-white-black">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
