import React from 'react'
import { FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import { FaTimeline } from 'react-icons/fa6'
import LoadingSpinner from '../Loading/LoadingSpinner'

export default function ModalBox({modalTitle,cancelModal,confirmModal,confirmButtonTitle}) {
  return (
    <>
    <div onClick={cancelModal} className='fixed inset-0 bg-black/50 z-0 backdrop-blur-sm'></div>
    <div className='fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-74 max-sm:w-full max-sm:p-2 scale-125 max-[500px]:scale-75 max-xl:scale-100'>
        <div className='w-full flex flex-col items-center h-44 justify-between p-3 rounded-lg shadow relative bg-gray-700 opacity-90 dark:bg-gray-600'>
            <div className='mt-5'>
                <h2 className='text-lg font-bold text-white text-center'>{modalTitle}</h2>
                <button onClick={cancelModal} className='absolute top-2 right-2'><FaTimesCircle className='text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400' size={26} /></button>
            </div>
            <div className='mb-2 w-full flex gap-2'>
                <button onClick={confirmModal} className='bg-slate-100 hover:bg-white shadow py-2 rounded w-full text-gray-800 font-bold'>{confirmButtonTitle}</button>
                <button onClick={cancelModal} className='bg-red-600 hover:bg-red-500 shadow py-2 rounded w-full text-white font-bold'>Cancel</button>
            </div>
        </div>
    </div>
    </>
  )
}
