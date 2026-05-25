import React from 'react'

import Userdetails from '../UserDetails/UserDetails'

export default function Dashboard() {
  let user = 'admin';
  return (
    <main className='[grid-area:main]'>
        {user == 'admin' ? <Userdetails /> : 'Itss admin' }
    </main>
  )
}
