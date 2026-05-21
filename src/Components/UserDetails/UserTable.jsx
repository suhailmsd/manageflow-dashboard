import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function UserTable() {

  const tableStyle = 'w-full mx-auto border border-gray-200 bg-white text-black rounded-xl max-[380px]:rounded-lg max-[380px]:border-none overflow-hidden shadow-sm shadow-gray-500'

  return (
   <div className='p-4 max-[500px]:p-0 max-[500px]:mt-4 max-[380px]:overflow-x-scroll'>
    <table className={tableStyle}>
      <thead className='bg-purple-500 text-white'>
      <tr>
          <th className='table-head-cell'>Name</th>
          <th className='table-head-cell'>Department</th>
          <th className='table-head-cell'>Role</th>
          <th className='table-head-cell'>Status</th>
          <th className='table-head-cell'>Actions</th>
      </tr>
      </thead>
      <tbody>

    <tr className='border-b hover:bg-gray-50 transition'>
          <td className='table-body-cell'>Rahul</td>
          <td className='table-body-cell'>IT</td>
          <td className='table-body-cell'>Admin</td>
          <td className='table-body-cell'>
            <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 max-[500px]:p-1'
            >Active</span>
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
 <tr className='border-b hover:bg-gray-50 transition'>
          <td className='table-body-cell'>Rahul</td>
          <td className='table-body-cell'>IT</td>
          <td className='table-body-cell'>Admin</td>
          <td className='table-body-cell'>
            <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 max-[500px]:p-1'>Active</span>
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

       <tr className='border-b hover:bg-gray-50 transition'>
          <td className='table-body-cell'>Rahul</td>
          <td className='table-body-cell'>IT</td>
          <td className='table-body-cell'>Admin</td>
          <td className='table-body-cell'>
            <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 max-[500px]:p-1'>Active</span>
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

      </tbody>
    </table>
   </div>
  )
}
