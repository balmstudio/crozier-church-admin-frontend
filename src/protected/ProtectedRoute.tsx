import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PageLoader from "@/components/PageLoader";

function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);
  const { data, isError, refetch } = useCurrentUser();

  useEffect(() => {
    if (data) setSession(data.data);
  }, [data, setSession]);

  if (isError && !user) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center gap-3 text-sm text-crozier-text-body">
        <p>We couldn&apos;t load your session.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="font-semibold text-crozier-text-accent cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user) return <PageLoader />;

  return <Outlet />;
}

export default ProtectedRoute;
