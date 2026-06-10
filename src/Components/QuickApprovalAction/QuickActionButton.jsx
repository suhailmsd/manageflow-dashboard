import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function QuickActionButton({user}) {
  return (
    <>
    <div className='transition flex gap-2 bg-indigo-500 group hover:bg-indigo-600 p-2 items-center text-white font-bold rounded-lg'>{user.status === 'active' ? 'Suspend' : user.status === 'pending' ? 'Approve' : user.status === 'suspended' ? 'Activate' : null}<span className={`transition text-lg group-hover:scale-125 ${user.status === 'active' ? 'text-red-400 hover:text-red-500' : user.status === 'suspended' ? 'text-green-400 hover:text-green-300' : user.status === 'pending' ? 'text-gray-200 hover:text-gray-100' : null}`}>{user.status === 'active' ? <FaTimes /> : <FaCheck /> }</span></div>
    </>
  )
}
