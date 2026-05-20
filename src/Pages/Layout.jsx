import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Components/Header/Header'
import SideBar from '../Components/Sidebar/SideBar'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'

export default function Layout() {

  const {theme} = useContext(ThemeContext)

  const [getSideBarOpen, setGetSideBarOpen] = useState(false);

  useEffect(()=>{
    if(theme){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  },[theme])
 

  return (
    <div className={`min-h-screen bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white grid [grid-template-areas:'sidebar_header''sidebar_main'] grid-rows-[64px_1fr] grid-cols-[300px_1fr] ${getSideBarOpen ? 'max-[500px]:grid-cols-[250px_1fr]' : 'max-[500px]:grid-cols-[50px_1fr]'} transition-all duration-300`}>
        <Header />
        <SideBar getSideBarOpen={getSideBarOpen} setGetSideBarOpen={setGetSideBarOpen}/>
        <Outlet />
    </div>
  )
}
