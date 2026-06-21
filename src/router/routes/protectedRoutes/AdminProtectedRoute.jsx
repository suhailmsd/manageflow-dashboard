import React, { useContext, useEffect } from "react";
import { AuthPermissionContext, UserContext } from "../../../contexts";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../../../features/shared/components/loading/LoadingSpinner";

export default function AdminProtectedRoute() {
  const { userLoading, userDetails } = useContext(UserContext);

  const { hasRole } = useContext(AuthPermissionContext);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  if (!userDetails) {
    return <Navigate to="/" replace />;
  }

  if (!hasRole("admin")) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
