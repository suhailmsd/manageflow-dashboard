import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Contexts';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';

export default function UserProtectedRoute() {

  const {userLoading,userDetails} = useContext(UserContext);

  if(userLoading){
    return <LoadingSpinner />
  }

  if(!userDetails){
    return <Navigate to="/" />
  }

  if(userDetails?.role !== "employee"){
    return <Navigate to="/app/dashboard/admin" />
  }
  

  return <Outlet />;
}
