import { useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import { FaTimeline } from "react-icons/fa6"
import EditUiValidation from "./EditUiValidation"
import UserEditRequest from "./UserEditRequest"


export default function EditUserModal({closeModal}) {

  const {isLoading,updateUser} = UserEditRequest();

  const [editForm,setEditForm] = useState({
    username:'',
    firstName:'',
    lastName:'',
    phone:'',
    department:'',
    role:'',
    status:''
  })

  const [editFormError,setEditFormError] = useState({
    username:'',
    firstName:'',
    lastName:'',
    phone:'',
    department:'',
    role:'',
    status:''
  })

  function handleChange(event){
    const {name,value} = event.target;

    setEditForm(prev => ({
      ...prev,
      [name]:value
    }))

     setEditFormError(prev => ({
      ...prev,
      [name]:''
    }))
    
  }


  function handleFormError(){

    const {isUsernameInvalid,isFirstNameInvalid,isLastNameInvalid,isPhoneInvalid} = EditUiValidation(editForm)

    if(!editForm.username.trim()){
      setEditFormError(prev => ({...prev, username: "username shouldn't be empty"}));
    }else if(isUsernameInvalid){
      setEditFormError(prev => ({...prev, username: "Only letters and numbers allowed with max 15 chars"}));
    }

    if(!editForm.firstName.trim()){
      setEditFormError(prev => ({...prev, firstName: "First name shouldn't be empty"}));
    }else if(isFirstNameInvalid){
      setEditFormError(prev => ({...prev, firstName: "Only alphabets allowed not exceeding 20 chars, no spaces allowed"}));
    }

    if(!editForm.lastName.trim()){
      setEditFormError(prev => ({...prev, lastName: "Last name shouldn't be empty"}));
    }else if(isLastNameInvalid){
      setEditFormError(prev => ({...prev, lastName: "Last name shouldn't exceed 20 char and should'nt match firstname, no spaces allowed"}));
    }

    if(!editForm.phone.trim()){
      setEditFormError(prev => ({...prev, phone: "Phone shouldn't be empty"}));
    }else if(isPhoneInvalid){
      setEditFormError(prev => ({...prev, phone: "Phone number with country code required"}));
    }
  }

  const editUserDetail = {
    username:'jack',
    firstName:'sa',
    lastName:'ma',
    phone:'919995559990',
    department:'IT',
    role:'employee',
    status:'pending'
  }

  let hasChanges = (editForm.username.trim() !== editUserDetail.username) || (editForm.firstName.trim() !== editUserDetail.firstName) || (editForm.lastName.trim() !== editUserDetail.lastName) || (editForm.phone.trim() !== editUserDetail.phone) || (editForm.role.trim() !== editUserDetail.role) || (editForm.department.trim() !== editUserDetail.department) || (editForm.status.trim() !== (editUserDetail.status))


  function handleSubmitforEdit(e){
    e.preventDefault();
    
    handleFormError();

    if (Object.values(editFormError).some(value => value !== '')) {
  console.log('error');
  return
  
}
if(hasChanges){
  updateUser(editForm)
  
}



  }

  let inputStyle = 'peer profile-input px-3 pt-5 pb-2 max-[500px]:pt-4 max-[500px]:pb-1 dark:bg-slate-900 dark:text-white bg-slate-200 text-black rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 dark:border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full'
  let labelStyle = 'absolute left-3 top-4 text-gray-500 transition-all duration-200 ease-in-out peer-focus:top-1 peer-focus:text-xs peer-valid:top-1 peer-valid:text-xs max-[600px]:peer-focus:-top-1 max-[600px]:peer-valid:-top-1'
  let optionsLabelStyle = 'absolute max-[600px]:-top-2 max-[600px]:peer-focus:-top-3 -top-1 peer-focus:-top-2 left-2 bg-white px-1 text-sm text-gray-600 transition-all duration-200 ease-in-out dark:text-gray-400 dark:bg-gray-800 dark:opacity-2'

  return (
   <>
  <div onClick={closeModal} className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

  <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center max-[600px]:px-2">
    <form className="relative dark:bg-gray-800 flex flex-col gap-3 p-4 pt-10 max-[600px]:px-2 max-[600px]:pt-5 rounded-xl w-full max-w-[400px] bg-slate-50" onSubmit={handleSubmitforEdit}>
      <h2 className="font-bold text-center text-xl max[500px]:text-md">Update User Information</h2>
      <button onClick={closeModal} className="text-xl absolute top-2 right-2 text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400"><FaTimesCircle /></button>
     <div className="input-group relative w-full">
      <input type="text" name="username" placeholder="  " required className={inputStyle} onChange={handleChange} value={editForm.username}/>
      <label htmlFor="" className={labelStyle}>Username</label>
      {editFormError.username && <div className='text-red-500 text-sm mt-2'>{editFormError.username}</div>}
    </div>

    <div className="flex gap-2 max-[600px]:flex-col">
       <div className="input-group relative w-full">
      <input type="text" name="firstName" placeholder="  " required className={inputStyle} onChange={handleChange} value={editForm.firstName}/>
      <label htmlFor="" className={labelStyle}>FirstName</label>
      {editFormError.firstName && <div className='text-red-500 text-sm mt-2'>{editFormError.firstName}</div>}
    </div>

      <div className="input-group relative w-full">
      <input type="text" name="lastName" placeholder="  " required className={inputStyle} onChange={handleChange} value={editForm.lastName} />
      <label htmlFor="" className={labelStyle}>Lastname</label>
      {editFormError.lastName && <div className='text-red-500 text-sm mt-2'>{editFormError.lastName}</div>}
    </div>
    </div>

     <div className="flex gap-2 max-[600px]:flex-col">
      <div className="input-group relative w-full">
      <input type="number" name="phone" placeholder="  " className={inputStyle} onChange={handleChange} value={editForm.phone}/>
      <label htmlFor="" className={labelStyle}>Phone</label>
      {editFormError.phone && <div className='text-red-500 text-sm mt-2'>{editFormError.phone}</div>}
    </div>

     <div className="input-group relative w-full">
      <select name="department" id="" className={inputStyle} onChange={handleChange} value={editForm.department}>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>
      <label htmlFor="" className={optionsLabelStyle}>Department</label>
      {editForm.department === '' && <div className='text-xs text-red-500 mt-1'>Department needed</div> }
    </div>
    </div>

    <div className="flex gap-2 max-[600px]:flex-col">
       <div className="input-group relative w-full">
      <select name="role" id="" className={inputStyle} onChange={handleChange} value={editForm.role}>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <label htmlFor="" className={optionsLabelStyle}>Role</label>
      {editForm.role === '' && <div className='text-xs text-red-500 mt-1'>Role needed</div> }
    </div>
     <div className="input-group relative w-full">
      <select name="status" id="" className={inputStyle} onChange={handleChange} value={editForm.status}>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspend">Suspend</option>
      </select>
      <label htmlFor="" className={optionsLabelStyle}>Status</label>
      {editForm.status === '' && <div className='text-xs text-red-500 mt-1'>Status needed</div> }
    </div>
    </div>
    
   <button className="dark:bg-indigo-500 dark:hover:bg-indigo-400 bg-indigo-400 hover:bg-indigo-500 transition px-4 py-2 text-sm sm:text-base w-full sm:w-40 rounded-lg font-bold">Update User</button>

    </form>
  </div>

  
</>
  )
}
