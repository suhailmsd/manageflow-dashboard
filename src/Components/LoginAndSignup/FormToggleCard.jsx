import React, { useRef, useState } from 'react'
import FormRegisterAndLogin from './FormLoginAndSignup';
import useTheme from '../../Hooks/useTheme';

export default function FormToggle() {

    const [isRegister, setIsRegister] = useState(false)
    
    useTheme();


  return (
        <div className='flex justify-center items-start pt-10 h-screen bg-slate-200 dark:bg-gray-900 max-sm:p-3 max-sm:overflow-x-auto overflow-y-auto'>
            <div className='w-full max-w-md p-6 rounded-3xl text-center border-2 border-gray-400 bg-slate-50 dark:bg-gray-800'>
            <div className='flex justify-center gap-2 mb-5'>
                <button onClick={()=> setIsRegister(false)} className={`w-full font-bold py-4 rounded text-xl dark:text-gray-200 ${isRegister ? 'border-none' : 'border-b border-green-800 dark:border-green-400'}`}>Login</button>
                <button onClick={()=> setIsRegister(true)} className={`w-full font-bold py-4 rounded text-xl dark:text-gray-200 ${isRegister ? 'border-b border-green-800 dark:border-green-400' : 'border-none'}`}>Register</button>
            </div>
            <div>
                <FormRegisterAndLogin buttonTitle={isRegister ? 'Signup' : 'Login'} mode={isRegister ? 'register' : 'login'}/>
            </div>
            </div>
        </div>
  )
}
