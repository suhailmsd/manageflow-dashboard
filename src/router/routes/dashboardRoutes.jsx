import EmployeeHomePage from "../../pages/employee/EmployeeHomePage";
import AdminHomePage from "../../pages/admin/AdminHomePage";
import UsersAnalytics from "../../pages/admin/UsersAnalytics";
import Layout from "../../layout/Layout";
import EmployeeProfilePage from "../../pages/employee/EmployeeProfilePage";
import AdminProfilePage from "../../pages/admin/AdminProfilePage";
import UserFullDetails from "../../pages/admin/UserFullDetails";
import AdminProtectedRoute from "../routes/protectedRoutes/AdminProtectedRoute";
import EmployeeProtectedRoute from "../routes/protectedRoutes/EmployeeProtectedRoute";
import LogsPage from "../../pages/owner/LogsPage";
import OwnerProtectedRoute from "../routes/protectedRoutes/OwnerProtectedRoute";


export const dashboardRoutes = {
    path: "app/dashboard",
    element: <Layout />,
    children: [
      {
        element: <EmployeeProtectedRoute />,
        children: [
          { index: true, element: <EmployeeHomePage /> },
          { path: "profile", element: <EmployeeProfilePage /> },
        ],
      },

      {
        path: "admin",
        element: <AdminProtectedRoute />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "profile", element: <AdminProfilePage /> },
          { path: "view/users", element: <UserFullDetails /> },
          { path: "view/analytics", element: <UsersAnalytics /> },
          {
            path: "view/logs",
            element: <OwnerProtectedRoute />,
            children: [{ index: true, element: <LogsPage /> }],
          },
        ],
      },
    ],
  }