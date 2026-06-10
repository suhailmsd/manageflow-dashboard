import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Pagination from './Pagination';
import useEditModal from './TableEditModal/useEditModal'
import EditUserModal from './TableEditModal/EditUserModal';
import { UserContext, UsersListContext } from '../../Contexts';
import ApproveUserRequest from './ApproveUserRequest';
import QuickActionButton from '../QuickApprovalAction/QuickActionButton';

export default function UserTable() {


  const {usersList,usersListLoading,setUsersListUpdated} = useContext(UsersListContext)
  const {userDetails} = useContext(UserContext)

  const [currentUserForEdit,setCurrentUserForEdit] = useState();

   const [currentUserPage,setCurrentUserPage] = useState(1);

   const {openEditModal,closeEditModal,isOpenEditModal} = useEditModal();

   const {updateStatus,isStatusUpdateSuccess} = ApproveUserRequest();
   
   let usersPerPage = 5
   
   let startIndex = (currentUserPage - 1) * usersPerPage
   let lastIndex = startIndex + usersPerPage

   let newUsersList = usersList?.filter(user => user.userId !== userDetails.userId)
   
   let currentUsers = newUsersList?.slice(startIndex,lastIndex);


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
  setUsersListUpdated(true)
},[isStatusUpdateSuccess])


  const tableStyle = 'w-full mx-auto bg-white text-black rounded-xl max-[380px]:rounded-lg max-[380px]:border-none overflow-hidden shadow-sm shadow-gray-500'

  return (
   <div className='p-4 max-[500px]:p-0 max-[500px]:mt-4 max-[380px]:overflow-x-scroll'>
    <table className={`${tableStyle} relative`}>
      <thead className='bg-purple-800 dark:bg-purple-600 text-white'>
      <tr>
          <th className='table-head-cell'>Username</th>
          <th className='table-head-cell'>Department</th>
          <th className='table-head-cell'>Role</th>
          <th className='table-head-cell'>Status</th>
          <th className='table-head-cell'>Actions</th>
      </tr>
      </thead>
      <tbody key={currentUserPage}>
     {usersListLoading ?  (<tr><td colSpan={5} className='text-center py-4 text-xs'>Loading users...<div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div></td></tr>)
     :

    (currentUsers?.map((user) => (
      <tr className='border-b hover:bg-gray-50 transition' key={user.id}>
          <td className='table-body-cell'>{user.username}</td>
          <td className='table-body-cell'>{user.department}</td>
          <td className='table-body-cell'>{user.role}</td>
          <td className='table-body-cell'>
            <span className='bg-green-100 text-green-700 rounded-full px-3 py-1 max-[500px]:p-1'>
              <button>{user.status}</button></span>
          </td>

          <td className= 'table-body-cell'>
            <div className='flex justify-between gap-2'>
              <button onClick={() => handleQuickStatusAction(user)}> <QuickActionButton user={user}/> </button>
              <button onClick={() => EditUser(user)} title="Edit" className='text-blue-600 hover:text-blue-900 text-lg'>
        <FaEdit size="1.2em" />
      </button>
      {/* <button title="Delete" className='text-red-500 hover:text-red-700 transition'>
        <FaTrash size="1.2em" />
      </button> */}
            </div>
          </td>
      </tr>
    )))
    }</tbody>
    </table>

    <Pagination totalUsers={newUsersList?.length} usersPerPage={usersPerPage} setCurrentUserPage={setCurrentUserPage} currentUserPage={currentUserPage}  />
    {isOpenEditModal && <EditUserModal closeEditModal={closeEditModal} currentUserForEdit={currentUserForEdit}/>}
   </div>
  )
}
