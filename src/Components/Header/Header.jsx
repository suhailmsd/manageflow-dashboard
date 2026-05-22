import { Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";


export default function Header() {



  return (
   <div>
     <header className="[grid-area:header] h-16 flex items-center justify-end px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">

        <ThemeToggle />

        <div className="flex items-center gap-4 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-700">
            <div className="h-10 w-10 rounded-full bg-green-400"></div>

          <div className="">
            <p className="font-medium text-sm dark:text-white">John P.P</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">Admin</p>
          </div>
        </div>

      </div>
    </header>

    <Outlet />
   </div>
    
  );
}