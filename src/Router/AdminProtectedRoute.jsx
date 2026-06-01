import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Contexts';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from '../Components/Loading/LoadingSpinner'

export default function AdminProtectedRoute() {

    const {userLoading,userDetails} = useContext(UserContext);

    if(userLoading){
      return <LoadingSpinner />

    }

    if(!userDetails){
      return <Navigate to="/" replace/>
    }

     if (userDetails?.role !== "admin") {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
