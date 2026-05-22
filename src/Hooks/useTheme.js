import { useContext, useEffect } from "react"
import { ThemeContext } from "../Contexts/ThemeContext"

export default function useTheme(){
    const {theme} = useContext(ThemeContext)
    
      useEffect(()=>{
        if(theme){
          document.documentElement.classList.add('dark')
        }else{
          document.documentElement.classList.remove('dark')
        }
      },[theme])
      return theme
};