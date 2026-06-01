import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router";
import ThemeProvider from './Providers/ThemeProvider'
import ToastProvider from "./Providers/ToastProvider";


export default function App() {  

  return (

    <ToastProvider>
    <ThemeProvider>
    <RouterProvider router={Router} />
    </ThemeProvider>
    </ToastProvider>
  )
}