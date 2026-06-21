import Header from "../features/shared/components/header/Header";
import SideBar from "../features/shared/components/sidebar/SideBar";
import { useTheme } from "../hooks";
import { useContext, useState } from "react";
import { AuthPermissionContext, UserContext } from "../contexts";

export default function Layout() {
  const { hasRole } = useContext(AuthPermissionContext);

  useTheme();

  const [getSideBarOpen, setGetSideBarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen items-stretch bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white grid overflow-x-hidden transition-all duration-300 ${hasRole("admin") ? `[grid-template-areas:'sidebar_header''sidebar_main'] grid-cols-[300px_1fr] ${getSideBarOpen ? "max-[500px]:grid-cols-[250px_1fr]" : "max-[500px]:grid-cols-[60px_1fr]"} max-sm:grid-cols-[180px_1fr] max-md:grid-cols-[220px_1fr]` : `[grid-template-areas:'header''main'] grid-rows-[64px_1fr] grid-cols-[1fr]`}`}
    >
      <Header />
      {hasRole("admin") && (
        <SideBar
          getSideBarOpen={getSideBarOpen}
          setGetSideBarOpen={setGetSideBarOpen}
        />
      )}
    </div>
  );
}
