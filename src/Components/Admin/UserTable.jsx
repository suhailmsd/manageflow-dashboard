import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from './Pagination';

export default function UserTable() {


   const [currentUserPage,setCurrentUserPage] = useState(0);

  const users = Array.from({ length: 100 }, (_, i) => ({
  username: `user${i + 1}`,
  department: ["HR", "IT", "Finance", "Sales", "Marketing"][i % 5],
  role: ["Admin", "Manager", "Employee"][i % 3],
  status: i % 2 === 0 ? "pending" : "active",
}));

let usersPerPage = 10

let startIndex = currentUserPage * usersPerPage
let lastIndex = startIndex + usersPerPage


let currentUsers = users.slice(startIndex,lastIndex);
  


  const tableStyle = 'w-full mx-auto bg-white text-black rounded-xl max-[380px]:rounded-lg max-[380px]:border-none overflow-hidden shadow-sm shadow-gray-500'

  return (
   <div className='p-4 max-[500px]:p-0 max-[500px]:mt-4 max-[380px]:overflow-x-scroll'>
    <table className={tableStyle}>
      <thead className='bg-purple-800 dark:bg-purple-600 text-white'>
      <tr>
          <th className='table-head-cell'>Username</th>
          <th className='table-head-cell'>Department</th>
          <th className='table-head-cell'>Role</th>
          <th className='table-head-cell'>Status</th>
          <th className='table-head-cell'>Actions</th>
      </tr>
      </thead>
      <tbody>

    {currentUsers.map((user) => (
      <tr className='border-b hover:bg-gray-50 transition' key={user.username}>
          <td className='table-body-cell'>{user.username}</td>
          <td className='table-body-cell'>{user.department}</td>
          <td className='table-body-cell'>{user.role}</td>
          <td className='table-body-cell'>
            <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 max-[500px]:p-1'
            ><button>{user.status}</button></span>
          </td>

          <td className= 'table-body-cell'>
            <div className='flex justify-center gap-4'>
              <button title="Edit" className='text-blue-600 hover:text-blue-900 transition'>
        <FaEdit size="1.2em" />
      </button>
      <button title="Delete" className='text-red-500 hover:text-red-700 transition'>
        <FaTrash size="1.2em" />
      </button>
            </div>
          </td>
      </tr>
    ))}

      </tbody>
    </table>

    <Pagination totalUsers={users.length} usersPerPage={usersPerPage} setCurrentUserPage={setCurrentUserPage} currentUserPage={currentUserPage} />
   </div>
  )
}
