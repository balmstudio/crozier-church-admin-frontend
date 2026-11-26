import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface RoleRouteProps {
  allow: string[];
  redirectTo?: string;
}

function RoleRoute({ allow, redirectTo = "/dashboard" }: RoleRouteProps) {
  const role = useAuthStore((s) => s.user?.role);

  if (!role || !allow.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
