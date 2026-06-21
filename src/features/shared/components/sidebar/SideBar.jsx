import { FaThLarge, FaUsers, FaChartBar, FaBars } from "react-icons/fa";
import NavButton from "./NavButton";
import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthPermissionContext } from "../../../../contexts";
import { LuLogs } from "react-icons/lu";

export default function SideBar({ getSideBarOpen, setGetSideBarOpen }) {
  const { hasPermission } = useContext(AuthPermissionContext);

  function handleMenuBar() {
    setGetSideBarOpen((prev) => !prev);
  }

  return (
    <aside className="[grid-area:sidebar] bg-slate-100 text-gray-900  dark:bg-gray-900 dark:text-white rounded-md border-r border-gray-300 dark:border-gray-700 p-4">
      <div className="mb-10 text-2xl font-bold max-[500px]:text-sm">Logo</div>

      {/* menu bar is hidden until width becomes lesser than 500px */}

      <button
        onClick={handleMenuBar}
        className="hidden max-[500px]:block mb-10"
      >
        <FaBars />
      </button>

      {/* if click menubar getSideBarOpen value will be true, if true and if width is lesser than 500px then navigation button will be visible */}

      <div
        className={`space-y-2 text-normal ${getSideBarOpen ? "max-[500px]:block" : "max-[500px]:hidden"} max-sm:text-md max-md:text-md`}
      >
        <NavLink
          to="/app/dashboard/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 m-2 ${isActive ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500" : "bg-blue-500 dark:bg-blue-600"} hover:bg-red-500 text-gray-900 font-semibold dark:text-slate-100 dark:hover:text-white dark:hover:bg-red-600 w-full p-2 rounded-md group transition duration-100 mx-auto max-[500px]:text-sm`
          }
        >
          <NavButton buttonIcon={<FaThLarge />} buttonName="Dashboard" />
        </NavLink>
        <NavLink
          to="/app/dashboard/admin/view/users"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 m-2 ${isActive ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500" : "bg-blue-500 dark:bg-blue-600"} hover:bg-red-500 text-gray-900 font-semibold dark:text-slate-100 dark:hover:text-white dark:hover:bg-red-600 w-full p-2 rounded-md group transition duration-100 mx-auto max-[500px]:text-sm`
          }
        >
          <NavButton buttonIcon={<FaUsers />} buttonName="Users" />
        </NavLink>
        <NavLink
          to="/app/dashboard/admin/view/analytics"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 m-2 ${isActive ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500" : "bg-blue-500 dark:bg-blue-600"} hover:bg-red-500 text-gray-900 font-semibold dark:text-slate-100 dark:hover:text-white dark:hover:bg-red-600 w-full p-2 rounded-md group transition duration-100 mx-auto max-[500px]:text-sm`
          }
        >
          <NavButton buttonIcon={<FaChartBar />} buttonName="Analytics" />
        </NavLink>
        {hasPermission("view_logs") && (
          <NavLink
            to="/app/dashboard/admin/view/logs"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 m-2 ${isActive ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500" : "bg-blue-500 dark:bg-blue-600"} hover:bg-red-600 text-gray-900 font-semibold dark:text-slate-100 dark:hover:text-white dark:hover:bg-red-600 w-full p-2 rounded-md group transition duration-100 mx-auto max-[500px]:text-sm`
            }
          >
            <NavButton buttonIcon={<LuLogs />} buttonName="Logs" />
          </NavLink>
        )}
      </div>
    </aside>
  );
}
