import { useContext } from "react";
import { UserContext, UsersListContext } from "../../../../contexts";
import QuickActionButton from "../quickApprovalAction/QuickActionButton";
import { quickEditUser } from "../../services/adminService";
import { useToast } from "../../../../hooks";

export default function AdminDashboard() {
  const { usersListLoading, usersList } = useContext(UsersListContext);

  const { updateStatus } = quickEditUser();

  const { userDetails } = useContext(UserContext);
  const { showToast } = useToast();

  let analytics = {
    totalUsers: usersList?.length || 0,
    totalAdmin: usersList?.filter((user) => user.role === "admin").length || 0,
    totalEmployees:
      usersList?.filter((user) => user.role === "employee").length || 0,
    totalActive:
      usersList?.filter((user) => user.status === "active").length || 0,
    totalPending:
      usersList?.filter((user) => user.status === "pending").length || 0,
    totalSuspended:
      usersList?.filter((user) => user.status === "suspended").length || 0,
  };

  const pendingUsers = usersList?.filter((user) => user.status === "pending");

  const cards = [
    {
      title: "Users",
      content: analytics.totalUsers,
      bgColor:
        "bg-gradient-to-r from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-800",
    },
    {
      title: "Admin",
      content: analytics.totalAdmin,
      bgColor:
        "bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-700",
    },
    {
      title: "Employees",
      content: analytics.totalEmployees,
      bgColor:
        "bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-700",
    },
    {
      title: "Active Users",
      content: analytics.totalActive,
      bgColor:
        "bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-800",
    },
    {
      title: "Pending Users",
      content: analytics.totalPending,
      bgColor:
        "bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800",
    },
    {
      title: "Suspended Users",
      content: analytics.totalSuspended,
      bgColor:
        "bg-gradient-to-r from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-800",
    },
  ];

  function handleQuickStatusAction(user) {
    if (userDetails?.status !== "active") {
      showToast("failure", "update blocked");
      return;
    }
    const statusToUpdate = "active";
    const userToUpdate = {
      userDocID: user.id,
      userId: user.userId,
      status: statusToUpdate,
      username: user.username,
      previousStatus: "pending",
    };
    updateStatus(userToUpdate, {
      loggedInUserRole: userDetails?.role,
      loggedInUserId: userDetails?.userId,
      loggedInUsername: userDetails?.username,
    });
  }

  return (
    <>
      {usersListLoading ? (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                className="animate-pulse h-28 bg-slate-100 rounded-xl"
                key={index}
              ></div>
            ))}
          </div>
          <div className="min-h-[200px] animate-pulse rounded-xl bg-slate-100"></div>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {cards.map((card, index) => (
              <div
                className={`rounded-xl h-28 ${card.bgColor} flex flex-col items-start justify-between px-2 py-4 dark:text-white`}
                key={index}
              >
                <h1 className="text-xl font-bold">{card.title}</h1>
                <h3 className="text-lg font-bold">{card.content}</h3>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded-xl lg:max-w-[700px] lg:mx-auto lg:mt-5">
            <h2 className="text-gray-600 font-bold text-xl">
              Pending Approvals
            </h2>
            {pendingUsers && pendingUsers.length > 0 ? (
              pendingUsers.map((user) => (
                <div className="bg-slate-200 flex justify-between px-4 py-2 rounded-xl">
                  <div className="text-gray-600 font-bold">{user.username}</div>
                  <button onClick={() => handleQuickStatusAction(user)}>
                    <QuickActionButton user={user} />{" "}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-left mt-10 font-mono text-sm text-gray-900">
                No users for approval
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
