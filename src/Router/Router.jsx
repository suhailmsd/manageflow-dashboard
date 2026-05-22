import React, { useState } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Users from '../Pages/Users'
import Login from '../Pages/Login'
import NoutFound from '../Pages/NoutFound'
import Layout from '../Pages/Layout'
import CreateUser from '../Pages/CreateUser'
import UpdateUser from '../Pages/UpdateUser'
import Header from '../Components/Header/Header'

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
                {index:true, element:<Home />},
                {path:"users",element: <Users />},
                {path:"users/create", element: <CreateUser />},
                {path:"users/update", element: <UpdateUser />},
            ]
        },
         {
            path:'*',
            element:<NoutFound />
        }
    ])

export default router;