import React, { useContext, useState } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

import UserHome from '../Pages/Home/UserHome'
import AdminHome from '../Pages/Home/AdminHome'
import Login from '../Pages/Login'
import NoutFound from '../Pages/NotFound'
import Layout from '../Layout/Layout'
import Header from '../Components/Header/Header'
import UserProfile from '../Pages/Profile/UserProfile'
import AdminProfile from '../Pages/Profile/AdminProfile'
import EmployeeDetails from '../Pages/AdminAction/EmployeeDetails'
import AdminProtectedRoute from './AdminProtectedRoute'
import EmployeeProtectedRoute from './EmployeeProtectedRoute'

const router = createBrowserRouter([,
        {
            path:"",
            element:<Header />,
            children:[
                {index:true, element:<Login />}
            ]
        },
        {
            path:"app/dashboard",
            element:<Layout />,
            children:[
                {
                    element:<EmployeeProtectedRoute />,
                    children:[
                        {index:true,element:<UserHome />},
                        {path:"profile",element:<UserProfile />}
                    ]
            },
                
                {path:"admin",
                    element:<AdminProtectedRoute />,
                    children:[
                    {index:true, element:<AdminHome />},
                    {path:"profile", element:<AdminProfile />},
                    {path:"view/employees", element:<EmployeeDetails />}
                ]
                }
            ]
        },
         {
            path:'*',
            element:<NoutFound />
        }
    ])

export default router;