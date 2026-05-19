import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Components/Header/Header'
import SideBar from '../Components/Sidebar/SideBar'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'

export default function Layout() {

  const {theme} = useContext(ThemeContext)

  useEffect(()=>{
    if(theme){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  },[theme])
 

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
        <Header />
        <SideBar />
        <Outlet />
    </div>
  )
}
