import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  

  return (
    <header className="flex justify-between h-16 shadow-sm shadow-gray-200 items-center p-4 bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div>Logo</div>

      <div className="flex items-center">
        <ThemeToggle />
        <button className="h-12 w-12 bg-green-300 rounded-full mx-2"></button>
      </div>
    </header>
  );
}