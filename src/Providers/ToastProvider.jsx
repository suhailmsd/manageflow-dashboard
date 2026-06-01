import React, { useEffect, useState } from 'react'
import {ToastContext} from '../Contexts'

export default function ToastProvider({children}) {

    const [toastMessage,setToastMessage] = useState('');
    const [loadingToast,setLoadingToast] = useState(false);
    const [toastType, setToastType] = useState('')

    function handleToast(toasttype,toastmessage){
        setLoadingToast(true)
        setToastMessage(toastmessage)
        setToastType(toasttype)
        setTimeout(() => setLoadingToast(false),1000)
    }


  return (
    <ToastContext.Provider value={{setToastType,setToastMessage,handleToast}}>
        {children}

     {loadingToast &&  <div className='absolute top-1/2 right-5 z-30'>
            <div className={`${toastType === "success" ? 'bg-green-500' : 'bg-red-500'} h-10 flex items-center justify-center w-64 rounded text-center`}>{toastMessage}<div className='top-1 left-2 absolute h-2 w-2 border-black bg-white border-2 rounded-full'></div></div>
        </div>}

    </ToastContext.Provider>
  )
}
