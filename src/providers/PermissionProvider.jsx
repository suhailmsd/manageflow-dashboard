import { useContext } from "react";
import { AuthPermissionContext, UserContext } from "../contexts";
import {permissions,roles} from '../helpers/permissions'

export default function PermissionProvider({ children }) {
  const { userDetails } = useContext(UserContext);

  const hasPermission = (permission) => {
    return permissions[userDetails?.role]?.includes(permission) ?? false;
  };

  const hasRole = (requiredRole) => {
    const userRoleLevel = roles[userDetails?.role] ?? 0;
const requiredRoleLevel = roles[requiredRole] ?? 0;

return userRoleLevel >= requiredRoleLevel;
  };

  return (
    <AuthPermissionContext.Provider value={{ hasRole, hasPermission }}>
      {children}
    </AuthPermissionContext.Provider>
  );
}
