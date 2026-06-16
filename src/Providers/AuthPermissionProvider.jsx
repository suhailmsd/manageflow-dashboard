import React, { useContext, useState } from 'react'
import { AuthPermissionContext, UserContext } from '../Contexts'

export default function AuthPermissionProvider({children}) {

   const {userDetails} = useContext(UserContext)

   const permissions = {
    employee:[],
    admin:['manage_users'],
    owner:['manage_users', 'view_logs']
   };

   const roles = {
    employee:1,
    admin:2,
    owner:3
   }

   const hasPermission = (permission) =>{
    return permissions[userDetails?.role]?.includes(permission)
   }
   
   const hasRole = (requiredRole) => {
    return roles[userDetails?.role] >= roles[requiredRole]
   }


  return (
    <AuthPermissionContext.Provider value={{hasRole, hasPermission}}>
        {children}
    </AuthPermissionContext.Provider>
  )
}
