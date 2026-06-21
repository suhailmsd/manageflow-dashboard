import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthPermissionContext } from "../../../contexts";
import PermissionDeniedPage from "../../../pages/permissionDenied";

export default function OwnerProtectedRoute() {
  const { hasRole } = useContext(AuthPermissionContext);

  if (!hasRole("owner")) {
    return <PermissionDeniedPage />;
  }

  return <Outlet />;
}
