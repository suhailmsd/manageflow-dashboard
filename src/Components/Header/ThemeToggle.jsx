import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../../Contexts"
import { FaMoon, FaSun } from "react-icons/fa";


export default function ThemeToggle() {

    const {theme,setTheme} = useContext(ThemeContext);

    function themeChangeSet(){

      let newTheme = !theme  // change theme value to opposite in each click
      setTheme(newTheme)
      
      
      if(newTheme){  //if theme value true, updates LS to dark
        localStorage.setItem('theme',"dark")
      }else{
        localStorage.setItem('theme',"light")
      }
    }

    let savedItem = localStorage.getItem('theme');

    useEffect(()=>{   // useEffect renders when component calls, not when click
      if(savedItem === "dark"){   
        setTheme(true)  // theme value changes at first render so all button styles get applied
      }else{
        setTheme(false);
      }
    })




  return (
    <>
        {/* <button onClick={themeChangeSet} className={`mr-2 h-8 w-16 bg-gray-500 rounded-full p-1 ${theme ? 'bg-blue-600' : 'bg-gray-500'}`}>
            <div className={`h-6 w-6 bg-slate-200 rounded-full transition duration-200 ${theme ? 'translate-x-8' : 'translate-x-0'}`}></div></button>       */}

            <div className="toggle-button-group relative group">
              <button onClick={themeChangeSet} className="text-2xl">{theme ? <FaMoon color="blue" /> : <FaSun color="orange" />}</button>
              <div className="hidden group-hover:block absolute bottom-4 left-4 w-28 rounded text-center bg-gray-900 text-white z-10"><span className="text-xs">{theme ? 'switch to light' : 'switch to dark'}</span></div>
            </div>
    </>
  )
}
