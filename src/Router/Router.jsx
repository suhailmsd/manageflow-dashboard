import { createBrowserRouter} from 'react-router-dom'

import EmployeeHome from '../Pages/Employee/EmployeeHome'
import AdminHome from '../Pages/Admin/AdminHome'
import Login from '../Pages/Login'
import NoutFound from '../Pages/NotFound'
import Layout from '../Layout/Layout'
import Header from '../Features/Shared/Components/Header/Header'
import EmployeeProfilePage from '../Pages/Employee/EmployeeProfilePage'
import AdminProfilePage from '../Pages/Admin/AdminProfilePage'
import UserFullDetails from '../Pages/Admin/UserFullDetails'
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
                        {index:true,element:<EmployeeHome />},
                        {path:"profile",element:<EmployeeProfilePage />}
                    ]
            },
                
                {path:"admin",
                    element:<AdminProtectedRoute />,
                    children:[
                    {index:true, element:<AdminHome />},
                    {path:"profile", element:<AdminProfilePage />},
                    {path:"view/employees", element:<UserFullDetails />}
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