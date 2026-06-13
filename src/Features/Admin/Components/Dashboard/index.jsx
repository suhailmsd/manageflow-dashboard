import React, { useContext } from 'react'
import { UserContext } from '../../../../Contexts'

export default function AdminDashboard() {

  const {userDetails} = useContext(UserContext)

  return (
    <div className='space-y-4 pl-4 pt-6'>
  <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-200'>
    Welcome back, {userDetails?.username}
  </h1>
  {userDetails?.role === 'admin' ? <div className='h-16 border-dashed border flex items-center w-36 p-2'>
    <div className='font-mono text-md'>Role: <span className='text-sm'>admin</span></div>
  </div> : ''}
  <p className='text-sm text-slate-500 dark:text-slate-300'>
    Glad to see you again.
  </p>
</div>
  )
}
