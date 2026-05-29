import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import SideBar from '../Components/Sidebar/SideBar'
import useTheme from '../Hooks/useTheme';
import {useState } from 'react';

export default function Layout() {

  useTheme()
  

  const [getSideBarOpen, setGetSideBarOpen] = useState(false);
  const layoutStyle = `min-h-screen bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white grid [grid-template-areas:'sidebar_header''sidebar_main'] grid-rows-[64px_1fr] grid-cols-[300px_1fr] ${getSideBarOpen ? 'max-[500px]:grid-cols-[250px_1fr]' : 'max-[500px]:grid-cols-[60px_1fr]'} transition-all duration-300 max-sm:grid-cols-[180px_1fr] max-md:grid-cols-[220px_1fr] max-[380px]:overflow-x-hidden overflow-x-hidden`
 

  return (

    //Design of header and sidebar applies here, sidebar menu bar - nav width controlling

    <div className={layoutStyle}>
        <Header />
        <SideBar getSideBarOpen={getSideBarOpen} setGetSideBarOpen={setGetSideBarOpen}/>
        <Outlet />
    </div>
  )
}
