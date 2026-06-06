import React, { useContext, useState } from 'react'
import { ToastContext, UserContext } from '../../Contexts'
import { FaBeer, FaEdit, FaRegSquare, FaTimes, FaTimesCircle, FaUserTimes } from 'react-icons/fa'
import { GoIssueDraft } from 'react-icons/go'
import UpdateRequest from './UpdateRequest'
import LoadingSpinner from '../Loading/LoadingSpinner'

export default function UserProfile() {

  const [isEditMode,setIsEditMode] = useState(false)

  const {userDetails} = useContext(UserContext)
  const {handleToast} = useContext(ToastContext)

  const {updateLoading,setUpdateError,update} = UpdateRequest()


  const [updateProfileForm,setUpdateProfileForm] = useState({
    firstName:userDetails.firstName,
    lastName:userDetails.lastName,
    phone:userDetails.phone,
  })

  const [updateProfileFormError,setUpdateProfileFormError] = useState({
    firstName:'',
    lastName:'',
    phone:''
  })

  function formInvalidCheck(getUpdateProfileForm){
    const hasNameIncludeRegex = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
    const hasPhoneIncludeRegex =/^\+?[0-9]{7,15}$/;

    let firstName = getUpdateProfileForm.firstName.trim()
    let lastName = getUpdateProfileForm.lastName.trim()
    let phone = getUpdateProfileForm.phone.trim()

    return{
      isfirstNameInvalid: firstName.length < 20 && !hasNameIncludeRegex.test(firstName),
      islastNameInvalid: lastName.length < 20 && (!hasNameIncludeRegex.test(lastName)) || lastName === firstName,
      isPhoneInvalid: phone.length < 20 && !hasPhoneIncludeRegex.test(phone)
    }
  }

  function handleInputChange(event){    

    const {name,value} = event.target

    setUpdateProfileForm(prev => ({
            ...prev,
            [name]:value
        }))

        setUpdateProfileFormError(prev => ({
          ...prev,
          [name]:""
        }))

  }

  const {isfirstNameInvalid,islastNameInvalid,isPhoneInvalid} = formInvalidCheck(updateProfileForm)

  function handleFormError(){
    

    if(!updateProfileForm.firstName.trim()){
      setUpdateProfileFormError(prev => ({...prev, firstName: "First name shouldn't be empty"}));
    }else if(isfirstNameInvalid){
      setUpdateProfileFormError(prev => ({...prev, firstName: "Only alphabets allowed not exceeding 20 chars, no spaces allowed"}));
    }

    if(!updateProfileForm.lastName.trim()){
      setUpdateProfileFormError(prev => ({...prev, lastName: "Last name shouldn't be empty"}));
    }else if(islastNameInvalid){
      setUpdateProfileFormError(prev => ({...prev, lastName: "Last name shouldn't exceed 20 char and should'nt match firstname, no spaces allowed"}));
    }

    if(!updateProfileForm.phone.trim()){
      setUpdateProfileFormError(prev => ({...prev, phone: "Phone shouldn't be empty"}));
    }else if(isPhoneInvalid){
      setUpdateProfileFormError(prev => ({...prev, phone: "Phone number with country code required"}));
    }
    
    
  }


 
  const isFormFilledWithoutError = (updateProfileForm.firstName && !isfirstNameInvalid) && (updateProfileForm.lastName && !islastNameInvalid) && ( updateProfileForm.phone && !isPhoneInvalid )
  const hasChangesInForm = (userDetails.firstName !== updateProfileForm.firstName.trim() && !isfirstNameInvalid )|| (userDetails.lastName !== updateProfileForm.lastName.trim() && !islastNameInvalid ) || ( userDetails.phone !== updateProfileForm.phone && !isPhoneInvalid )

  function updateFormSubmit(event){
    
    event.preventDefault();
    if(hasChangesInForm && isFormFilledWithoutError){
      console.log(hasChangesInForm,isFormFilledWithoutError);
      update({firstName:updateProfileForm.firstName.trim(),
        lastName:updateProfileForm.lastName.trim(),
        phone:updateProfileForm.phone})
      
    }

    
  }

  function handleEditMode(){
    if(userDetails.status !== 'active'){
      handleToast("failure","Update profile locked by admin")
    }else{
      setIsEditMode(prev => !prev)
    }

  }




  let inputStyle = 'p-2 max-[500px]:p-1 dark:bg-slate-900 dark:text-white bg-slate-200 text-black rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 dark:border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full'

  return (
  <div className="flex justify-center min-h-screen p-2 sm:p-4">
    <div className="w-full max-w-3xl mt-4 sm:mt-8 flex flex-col gap-4">

      <div className="w-full dark:bg-gray-900 bg-slate-50 rounded-3xl flex flex-col items-center relative px-4 py-6">

        <div className="flex flex-col items-center gap-1">
          <img src={null} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 object-cover" />

          <h2 className="font-bold text-base sm:text-xl tracking-wider">{userDetails.username}</h2>

          <p className="font-mono text-xs sm:text-sm dark:text-gray-300 text-black/70">{userDetails.status}</p>
        </div>

        <button onClick={handleEditMode} className="absolute top-3 right-3">
          {isEditMode ? <FaTimesCircle size='1.4em' className='dark:text-red-700 dark:hover:text-red-600 text-red-500 hover:text-red-600' /> : <FaEdit size="1.4em" className="dark:text-inidigo-500 dark:hover:text-indigo-400 text-blue-500 hover:text-blue-600" /> }
        </button>
      </div>

      {isEditMode && 
      ( <div className="w-full dark:bg-gray-900 bg-slate-50 rounded-3xl p-4 sm:p-6">
          <form className="flex flex-col gap-4 sm:gap-6" onSubmit={updateFormSubmit}>

            <div className="text-left w-full">
              <label className="block mb-1 dark:text-gray-200 text-black/80 text-sm sm:text-base">Email</label>

              <input type="text" value={userDetails.email} disabled className={`${inputStyle} opacity-60`} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block mb-1 dark:text-gray-200 text-black/80 text-sm sm:text-base">First Name</label>

                <input type="text" className={inputStyle} value={updateProfileForm.firstName} onChange={handleInputChange} name='firstName'/>
                {updateProfileFormError.firstName && <div className='text-red-500 text-sm mt-2'>{updateProfileFormError.firstName}</div>}
              </div>

              <div className="w-full">
                <label className="block mb-1 dark:text-gray-200 text-black/80 text-sm sm:text-base">Last Name</label>

                <input type="text" className={inputStyle} value={updateProfileForm.lastName} onChange={handleInputChange} name='lastName'/>
                {updateProfileFormError.lastName && <div className='text-red-500 text-sm mt-2'>{updateProfileFormError.lastName}</div>}
              </div>
            </div>

            <div className="text-left w-full">
              <label className="block mb-1 dark:text-gray-200 text-black/80 text-sm sm:text-base"> Phone</label>

              <input type="number" placeholder="+966..." className={inputStyle} value={updateProfileForm.phone} onChange={handleInputChange} name='phone'/>
              {updateProfileFormError.phone && <div className='text-red-500 text-sm mt-2'>{updateProfileFormError.phone}</div>}
            </div>

            {hasChangesInForm && <button onClick={handleFormError} className="dark:bg-indigo-500 dark:hover:bg-indigo-400 bg-indigo-400 hover:bg-indigo-500 transition px-4 py-2 text-sm sm:text-base w-full sm:w-40 rounded-lg font-bold">Save Changes</button>}

          </form>
        </div>
      )}
    </div>
    <div className="fixed z-index 20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {updateLoading && <LoadingSpinner />}
    </div>
  </div>
);
}
