import { useContext } from "react";
import { AuthPermissionContext, UserContext } from "../../../../contexts";

export default function AdminDashboard() {
  const { userDetails } = useContext(UserContext);
  const { hasRole } = useContext(AuthPermissionContext);

  return (
    <div className="space-y-4 pl-4 pt-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
        Welcome back, {userDetails?.username} 👋
      </h1>
      {hasRole("admin") ? (
        <div className="h-16 border-dashed border border-black dark:border-white flex items-center w-36 p-2">
          <div className="font-mono text-md">
            Role: <span className="text-sm">{userDetails?.role}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <p className="text-sm text-slate-500 dark:text-slate-300">
        Glad to see you again.
      </p>
    </div>
  );
}
