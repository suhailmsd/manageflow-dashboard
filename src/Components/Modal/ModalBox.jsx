import React from 'react'
import { FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import { FaTimeline } from 'react-icons/fa6'
import LoadingSpinner from '../Loading/LoadingSpinner'

export default function ModalBox({modalTitle,cancelModal,confirmModal,confirmButtonTitle}) {
  return (
    <div className='fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='w-64 flex flex-col items-center h-44 justify-between p-3 rounded-lg shadow relative bg-gray-700 opacity-90 dark:bg-gray-600'>
            <div className='mt-5'>
                <h2 className='text-lg font-bold text-white text-center '>{modalTitle}</h2>
                <button onClick={cancelModal} className='absolute top-2 right-2'><FaTimesCircle className='text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-700' size={26} /></button>
            </div>
            <div className='mb-2 w-full flex gap-2'>
                <button onClick={confirmModal} className='bg-slate-50 hover:bg-slate-200 shadow py-2 rounded w-full text-gray-800 font-bold'>{confirmButtonTitle}</button>
                <button onClick={cancelModal} className='bg-red-500 hover:bg-red-600 shadow py-2 rounded w-full text-white font-bold'>Cancel</button>
            </div>
        </div>
    </div>
  )
}
