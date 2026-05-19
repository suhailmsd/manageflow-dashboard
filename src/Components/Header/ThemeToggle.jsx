import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../../Contexts/ThemeContext"


export default function ThemeToggle() {

    const {theme,setTheme} = useContext(ThemeContext);

    function themeChangeSet(buttonEvent){

      let newTheme = !theme
      setTheme(newTheme)
      
      
      if(newTheme){
        localStorage.setItem('theme',"dark")
      }else{
        localStorage.setItem('theme',"light")
      }
    }

    let savedItem = localStorage.getItem('theme');

    useEffect(()=>{
      if(savedItem === "dark"){
        setTheme(true)
      }else{
        setTheme(false);
      }
    })




  return (
    <>
        <button onClick={themeChangeSet} className={`mr-2 h-8 w-16 bg-gray-500 rounded-full p-1 ${theme ? 'bg-green-600' : 'bg-gray-500'}`}>
            <div className={`h-6 w-6 bg-slate-200 rounded-full ${theme ? 'translate-x-8' : 'translate-x-0'}`}></div>            </button>      
    </>
  )
}
