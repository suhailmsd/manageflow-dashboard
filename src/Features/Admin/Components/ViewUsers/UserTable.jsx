import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Pagination from './Pagination';
import useEditModal from './TableEditModal/useEditModal'
import EditUserModal from './TableEditModal/EditUserModal';
import { UserContext, UsersListContext } from '../../../../Contexts';
import {quickEditUser} from '../../Services/adminService';
import QuickActionButton from '../QuickApprovalAction/QuickActionButton';

export default function UserTable({currentUsers,filterByInputForm,filterByChangeEvent}) {


  const {usersListLoading,setUsersListUpdated} = useContext(UsersListContext)
  

  const [currentUserForEdit,setCurrentUserForEdit] = useState();

   const {openEditModal,closeEditModal,isOpenEditModal} = useEditModal();

   const {updateStatus,isStatusUpdateSuccess} = quickEditUser();

   const {userDetails} = useContext(UserContext)




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
    userId:user.userId,
    previousStatus:user.status
  }
  updateStatus(userToUpdate,{loggedInUserRole:userDetails?.role,loggedInUserId:userDetails?.userId,loggedInUsername:userDetails?.username})
}

// useEffect(()=>{
//   if(isStatusUpdateSuccess){
//     setUsersListUpdated(true)
//   }
// },[isStatusUpdateSuccess,setUsersListUpdated])

let inputStyle = 'peer profile-input px-3 pt-5 pb-2 max-[500px]:pt-4 max-[500px]:pb-1 dark:bg-slate-900 dark:text-white bg-slate-200 text-black rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 dark:border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full'

const tableHeadCell = ' text-left px-6 py-4 max-[500px]:py-4 text-sm max-[380px]:px-1 max-[380px]:text-[10px] max-xl:px-2';
const tableBodyCell = 'px-6 py-3 max-[500px]:py-3 text-sm max-[380px]:px-1 max-[380px]:text-[9px] max-xl:px-2'
const tableHeadCellFilter = ' text-left px-1 py-2 max-[500px]:py-2 text-sm max-[380px]:px-1 max-[380px]:text-[10px] max-xl:px-2 dark:bg-slate-800 bg-slate-200';

  return (
   <div className='p-4 max-[500px]:p-0 max-[500px]:mt-4 overflow-x-auto max-[380px]:max-w-[220px] max-[680px]:max-w-[400px] min-h-[380px] max-[500px]:min-h-[200px] w-full scrollbar-global-setting'>
    <table className='w-full mx-auto dark:text-black rounded-xl max-[380px]:border-none overflow-hidden '>
      <thead className="bg-gradient-to-r from-purple-700 to-violet-800 text-white">
        <tr className='w-full'>
          <th className={tableHeadCellFilter}><input type="text" className={`${inputStyle} min-w-[200px] font-normal font-mono`} placeholder='search user...' name="filterByUsername" onChange={filterByChangeEvent} value={filterByInputForm?.filterByUsername}/></th>
          <th className={tableHeadCellFilter}>
            <select name="filterByDepartment" id="" className={`${inputStyle} dark:bg-slate-800 border-none min-w-[120px] sm:min-w-[160px] max-[600px]:min-w-[160px]`} onChange={filterByChangeEvent} value={filterByInputForm?.filterByDepartment}>
              <option value="" className={inputStyle}>All Departments</option>
              <option value="IT" className={inputStyle}>IT</option>
              <option value="HR" className={inputStyle}>HR</option>
            </select>
          </th>
          <th className={tableHeadCellFilter}>
            <select name="filterByRole" id="" className={`${inputStyle} dark:bg-slate-800 border-none min-w-[120px]`} onChange={filterByChangeEvent} value={filterByInputForm?.filterByRole}>
              <option value="" className={inputStyle}>All Roles</option>
              <option value="employee" className={inputStyle}>Employee</option>
              <option value="admin" className={inputStyle}>Admin</option>
            </select>
          </th>
           <th className={tableHeadCellFilter}>
            <select name="filterByStatus" id="" className={`${inputStyle} dark:bg-slate-800 border-none min-w-[120px]`} onChange={filterByChangeEvent} value={filterByInputForm?.filterByStatus}>
              <option value="" className={inputStyle}>All Status</option>
              <option value="active" className={inputStyle}>Active</option>
              <option value="suspended" className={inputStyle}>Suspended</option>
              <option value="pending" className={inputStyle}>Pending</option>
            </select>
          </th>
        </tr>
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
    <td colSpan={5} className='text-center py-4 text-xs dark:bg-slate-900 text-white animate-pulse'>
      Loading users...
      <div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
    </td>
  </tr>
) : currentUsers && currentUsers.length > 0 ? (
  currentUsers.map((user) => (
    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 odd:bg-slate-100 even:bg-slate-300 dark:odd:bg-slate-900 dark:even:bg-slate-700 hover:bg-purple-900/20 dark:hover:bg-purple-900/90 transition-colors" key={user.id}>
      <td className={tableBodyCell}>{user.username}</td>
      <td className={tableBodyCell}>{user.department}</td>
      <td className={tableBodyCell}>{user.role}</td>

      <td className={tableBodyCell}>
        <span className={`rounded-full px-3 py-1 max-[500px]:p-1 ${user.status === 'active' ? 'bg-green-700 text-green-100' : user.status === 'suspended' ? 'bg-red-700 text-red-100' : user.status === 'pending' ? 'bg-gray-400 text-black' : ''}`}>
          <button>{user.status}</button>
        </span>
      </td>

      <td className={tableBodyCell}>
        <div className='flex justify-between gap-2'>
          <button onClick={() => handleQuickStatusAction(user)}>
            <QuickActionButton user={user}/>
          </button>

          <button onClick={() => EditUser(user)} title='Edit' className='text-blue-600 hover:text-blue-900 text-lg dark:text-blue-500 dark:hover:text-blue-400'>
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