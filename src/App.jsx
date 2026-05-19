import { RouterProvider } from "react-router-dom";
import Router from "./lib/Router";
import ThemeProvider from './Providers/ThemeProvider'

export default function App() {

  return (

    <ThemeProvider>
    <RouterProvider router={Router} />
    </ThemeProvider>
  )
}