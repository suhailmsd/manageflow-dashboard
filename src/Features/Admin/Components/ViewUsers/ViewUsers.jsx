
import { useContext, useEffect, useState } from 'react';
import UserTable from './UserTable'
import { UserContext, UsersListContext } from '../../../../Contexts';
import Pagination from './Pagination';


export default function ViewUsers() {  

     const [currentUserPage,setCurrentUserPage] = useState(1);

     const {userDetails} = useContext(UserContext)
     const {usersList} = useContext(UsersListContext)
   
   let usersPerPage = 5
   
   let startIndex = (currentUserPage - 1) * usersPerPage
   let lastIndex = startIndex + usersPerPage

   let newUsersList = usersList?.filter(user => user.userId !== userDetails.userId)
   
   let currentUsers = newUsersList?.slice(startIndex,lastIndex);

   const totalPages = Math.ceil(newUsersList?.length / usersPerPage);

   useEffect(()=>{
    if(currentUserPage > totalPages){
      setCurrentUserPage(totalPages)
    }
   },[currentUserPage,totalPages])

  return (
    <div className='p-2 w-[70%] mx-auto max-[700px]:p-1 max-[500px]:p-2 max-[500px]:mx-0 max-[500px]:w-full'>
        <div className='flex flex-col items-center w-full'>
          <UserTable currentUsers={currentUsers} />
        
          <Pagination totalUsers={newUsersList?.length} usersPerPage={usersPerPage} setCurrentUserPage={setCurrentUserPage} currentUserPage={currentUserPage}  />
        </div>
    </div>
  )
}