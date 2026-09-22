import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { breadcrumbHandles } from "./routing/breadcrumbs";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Units = lazy(() => import("./pages/Units/Units"));
const UnitDetails = lazy(() => import("./pages/Units/UnitDetails"));
const AdminUsers = lazy(() => import("./pages/AdminUsers/AdminUsers"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="dashboard"
            handle={breadcrumbHandles.dashboard}
            element={
              <Suspense
                fallback={
                  <div className="grid min-h-80 place-items-center">Loading dashboard...</div>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="units"
            handle={breadcrumbHandles.units}
            element={
              <Suspense
                fallback={<div className="grid min-h-80 place-items-center">Loading units...</div>}
              >
                <Units />
              </Suspense>
            }
          />
          <Route
            path="units/:unitId"
            handle={breadcrumbHandles.units}
            element={
              <Suspense
                fallback={<div className="grid min-h-80 place-items-center">Loading unit...</div>}
              >
                <UnitDetails />
              </Suspense>
            }
          />
          <Route
            path="admin-users"
            handle={breadcrumbHandles.adminUsers}
            element={
              <Suspense
                fallback={
                  <div className="grid min-h-80 place-items-center">Loading admin users...</div>
                }
              >
                <AdminUsers />
              </Suspense>
            }
          />
          <Route
            path="settings"
            handle={breadcrumbHandles.settings}
            element={
              <Suspense
                fallback={
                  <div className="grid min-h-80 place-items-center">Loading settings...</div>
                }
              >
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="profile"
            handle={breadcrumbHandles.profile}
            element={
              <Suspense
                fallback={
                  <div className="grid min-h-80 place-items-center">Loading profile...</div>
                }
              >
                <Profile />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <h1 className="text-2xl font-semibold">Page not found</h1>
            </div>
          }
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
