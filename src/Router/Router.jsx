import React, { useState } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

import Home from '../Pages/Home'
import Login from '../Pages/Login'
import NoutFound from '../Pages/NotFound'
import Profile from '../Pages/Profile'
import Layout from '../Layout/Layout'
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
                {index:true, element:<Profile />},
            ]
        },
         {
            path:'*',
            element:<NoutFound />
        }
    ])

export default router;