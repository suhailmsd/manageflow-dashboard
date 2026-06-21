import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthPermissionContext, UserContext } from "../../../contexts";
import LoadingSpinner from "../../../features/shared/components/loading/LoadingSpinner";

export default function UserProtectedRoute() {
  const { userLoading, userDetails } = useContext(UserContext);
  const { hasRole } = useContext(AuthPermissionContext);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  if (!userDetails) {
    return <Navigate to="/" />;
  }

  if (hasRole("admin")) {
    return <Navigate to="/app/dashboard/admin" />;
  }

  return <Outlet />;
}
