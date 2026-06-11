import {FaThLarge,FaUsers,FaChartBar, FaBars} from "react-icons/fa";
import NavButton from "./NavButton";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({getSideBarOpen, setGetSideBarOpen}) {


  function handleMenuBar(){
    setGetSideBarOpen(prev => !prev)
  }

  return (
    <aside className='[grid-area:sidebar] bg-slate-100 text-gray-900  dark:bg-gray-900 dark:text-white rounded-md border-r border-gray-300 dark:border-gray-700 p-4'>
      <div className="mb-10 text-2xl font-bold max-[500px]:text-sm">Logo</div>

      {/* menu bar is hidden until width becomes lesser than 500px */}

      <button onClick={handleMenuBar} className="hidden max-[500px]:block mb-10"><FaBars /></button>

      {/* if click menubar getSideBarOpen value will be true, if true and if width is lesser than 500px then navigation button will be visible */}

      <div className={`space-y-2 text-normal ${getSideBarOpen ? 'max-[500px]:block' : 'max-[500px]:hidden'} max-sm:text-md max-md:text-md`}>

        <NavLink to='/app/dashboard/admin' end><NavButton buttonIcon={<FaThLarge/>} buttonName={'Dashboard'} /></NavLink>
        <NavLink to="/app/dashboard/admin/view/employees" end><NavButton buttonIcon={<FaUsers />} buttonName={'Users'} /></NavLink>
        <NavButton buttonIcon={<FaChartBar />} buttonName={'Analytics'} />
      </div>
    </aside>
  )
}
