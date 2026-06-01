import React from 'react'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'

export default function Dashboard() {
  let user = 'admin';
  return (
    <main className='[grid-area:main]'>
        {user === 'admin' ? <AdminDashboard /> : <UserDashboard /> }
    </main>
  )
}
