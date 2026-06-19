
import { useContext, useEffect, useState } from 'react';
import UserTable from './UserTable'
import { UserContext, UsersListContext } from '../../../../Contexts';
import Pagination from './Pagination';


export default function ViewUsers() {  


     const {userDetails} = useContext(UserContext)
     const {usersList} = useContext(UsersListContext)

  const [tableFilterForm,setTableFilterForm] = useState({
    filterByUsername:'',
    filterByDepartment:'',
    filterByRole:'',
    filterByStatus:'',
  })

    const [currentUserPage,setCurrentUserPage] = useState(1);

  function handleFilterOnChange(event){
    
    const {name,value} = event.target    

    console.log(name,value);

    setTableFilterForm(prev  => ({
      ...prev,
      [name]:value
    }))
  }



  const defaultList = usersList?.filter(user => user.userId !== userDetails.userId && user.role !== "owner");
  const filterByUsername = tableFilterForm.filterByUsername ? usersList?.filter((user) => user.username.toLowerCase().includes(tableFilterForm?.filterByUsername.toLowerCase()) && user.userId !== userDetails.userId && user.role !== "owner") : defaultList
  const filterByDepartment = usersList?.filter((user) => user.department.includes(tableFilterForm?.filterByDepartment) && user.userId !== userDetails.userId && user.role !== "owner")
  const filterByRole = usersList?.filter((user) => user.role.includes(tableFilterForm?.filterByRole) && user.userId !== userDetails.userId && user.role !== "owner")
  const filterByStatus = usersList?.filter((user) => user.status.includes(tableFilterForm?.filterByStatus) && user.userId !== userDetails.userId && user.role !== "owner")
  
  
   
   let usersPerPage = 5
   
   let startIndex = (currentUserPage - 1) * usersPerPage
   let lastIndex = startIndex + usersPerPage

   let newUsersList = (tableFilterForm?.filterByUsername && filterByUsername) || (tableFilterForm?.filterByDepartment && filterByDepartment) || (tableFilterForm?.filterByRole && filterByRole) || (tableFilterForm?.filterByStatus && filterByStatus) || defaultList
   
   let currentUsers = newUsersList?.slice(startIndex,lastIndex);

   const totalPages = Math.ceil(newUsersList?.length / usersPerPage);

   useEffect(() => {
  if (totalPages === 0) {
    setCurrentUserPage(1);
  } else if (currentUserPage > totalPages) {
    setCurrentUserPage(totalPages);
  }
}, [currentUserPage, totalPages]);

  return (
    <div className='p-2 w-[70%] mx-auto max-[700px]:p-1 max-[500px]:p-2 max-[500px]:mx-0 max-[500px]:w-full'>
        <div className='flex flex-col items-center w-full'>
          <UserTable currentUsers={currentUsers} filterByInputForm={tableFilterForm} filterByChangeEvent={handleFilterOnChange} />
        
          <Pagination totalUsers={newUsersList?.length} usersPerPage={usersPerPage} setCurrentUserPage={setCurrentUserPage} currentUserPage={currentUserPage}  />
        </div>
    </div>
  )
}