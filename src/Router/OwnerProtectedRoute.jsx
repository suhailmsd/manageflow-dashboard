import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthPermissionContext } from '../Contexts'
import PermissionDeniedPage from '../Pages/PermissionDenied'

export default function OwnerProtectedRoute() {

  const {hasRole} = useContext(AuthPermissionContext)

  if(!hasRole('owner')){
    return <PermissionDeniedPage />
  }

  return <Outlet />
}
