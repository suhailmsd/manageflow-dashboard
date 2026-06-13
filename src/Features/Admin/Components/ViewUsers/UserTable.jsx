import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Pagination from './Pagination';
import useEditModal from './TableEditModal/useEditModal'
import EditUserModal from './TableEditModal/EditUserModal';
import { UserContext, UsersListContext } from '../../../../Contexts';
import {quickEditUser} from '../../Services/adminService';
import QuickActionButton from '../QuickApprovalAction/QuickActionButton';

export default function UserTable({currentUsers}) {


  const {usersListLoading,setUsersListUpdated} = useContext(UsersListContext)
  

  const [currentUserForEdit,setCurrentUserForEdit] = useState();

   const {openEditModal,closeEditModal,isOpenEditModal} = useEditModal();

   const {updateStatus,isStatusUpdateSuccess} = quickEditUser();




function EditUser(user){
  openEditModal()
  setCurrentUserForEdit(user)
}

function handleQuickStatusAction(user){
  const statusToUpdate = user.status === 'suspended' ? 'active' : user.status === 'active' ? 'suspended' : user.status === 'pending' ? 'active' : null
  const userToUpdate = {
    userDocID: user.id,
    status: statusToUpdate,
    username:user.username,
  }
  updateStatus(userToUpdate)
}

useEffect(()=>{
  if(isStatusUpdateSuccess){
    setUsersListUpdated(true)
  }
},[isStatusUpdateSuccess,setUsersListUpdated])

const tableHeadCell = ' text-left px-6 py-3 max-[500px]:py-4 text-sm max-[380px]:px-1 max-[380px]:text-[10px] max-xl:px-2';
const tableBodyCell = 'px-6 py-3 max-[500px]:py-3 text-sm max-[380px]:px-1 max-[380px]:text-[9px] max-xl:px-2'

  return (
   <div className='p-4 max-[500px]:p-0 max-[500px]:mt-4 overflow-x-auto max-[380px]:max-w-[220px] max-[680px]:max-w-[400px] min-h-[300px] w-full scrollbar-global-setting'>
    <table className='w-full mx-auto bg-white text-black rounded-xl max-[380px]:border-none shadow-sm shadow-gray-500 overflow-hidden '>
      <thead className='bg-purple-800 dark:bg-purple-600 text-white'>
      <tr>
          <th className={tableHeadCell}>Username</th>
          <th className={tableHeadCell}>Department</th>
          <th className={tableHeadCell}>Role</th>
          <th className={tableHeadCell}>Status</th>
          <th className={tableHeadCell}>Actions</th>
      </tr>
      </thead>
     <tbody>
{usersListLoading ? (
  <tr>
    <td colSpan={5} className='text-center py-4 text-xs'>
      Loading users...
      <div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
    </td>
  </tr>
) : currentUsers && currentUsers.length > 0 ? (
  currentUsers.map((user) => (
    <tr className='border-b hover:bg-white odd:bg-slate-50 even:bg-slate-100 transition' key={user.id}>
      <td className={tableBodyCell}>{user.username}</td>
      <td className={tableBodyCell}>{user.department}</td>
      <td className={tableBodyCell}>{user.role}</td>

      <td className={tableBodyCell}>
        <span className={`rounded-full px-3 py-1 max-[500px]:p-1 ${user.status === 'active' ? 'bg-green-100 text-green-700' : user.status === 'suspended' ? 'bg-red-100 text-red-700' : user.status === 'pending' ? 'bg-gray-400 text-white' : ''}`}>
          <button>{user.status}</button>
        </span>
      </td>

      <td className={tableBodyCell}>
        <div className='flex justify-between gap-2'>
          <button onClick={() => handleQuickStatusAction(user)}>
            <QuickActionButton user={user}/>
          </button>

          <button onClick={() => EditUser(user)} title='Edit' className='text-blue-600 hover:text-blue-900 text-lg'>
            <FaEdit className='text-xl max-[380px]:text-lg' />
          </button>
        </div>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5} className='text-center py-12 text-sm text-gray-400 font-medium'>
      No users found on this page.
    </td>
  </tr>
)}
</tbody>
    </table>

    {isOpenEditModal && <EditUserModal closeEditModal={closeEditModal} currentUserForEdit={currentUserForEdit}/>}
   </div>
  )
}