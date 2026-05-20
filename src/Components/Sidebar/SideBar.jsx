import {FaThLarge,FaUsers,FaChartBar, FaBars} from "react-icons/fa";
import NavButton from "./NavButton";
import { useState } from "react";

export default function SideBar({getSideBarOpen, setGetSideBarOpen}) {


  function handleMenuBar(){
    setGetSideBarOpen(prev => !prev)
  }

  return (
    <aside className='[grid-area:sidebar] bg-slate-100 text-gray-900  dark:bg-gray-900 dark:text-white rounded-md border-r border-gray-300 dark:border-gray-700 p-4'>
      <div className="mb-10 text-2xl font-bold max-[500px]:text-sm">Logo</div>
      <button onClick={handleMenuBar} className="hidden max-[500px]:block"><FaBars /></button>
      <div className={`space-y-2 ${getSideBarOpen ? 'max-[500px]:block' : 'max-[500px]:hidden'} `}>
        <NavButton buttonIcon={<FaThLarge/>} buttonName={'Dashboard'} />
        <NavButton buttonIcon={<FaUsers />} buttonName={'Users'} />
        <NavButton buttonIcon={<FaChartBar />} buttonName={'Analytics'} />
      </div>
    </aside>
  )
}
