
import {useEffect, useState} from 'react'
import UiValidation from './UiValidation';
import {FaEyeSlash, FaEye} from "react-icons/fa";

export default function FormRegisterAndLogin({buttonTitle,mode}) {

    let inputStyle = 'p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full'

    const [showPassword,setShowPassword] = useState(false);

    function togglePasswordVisible(){
        setShowPassword(!showPassword)
    }

    const[form,setForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    })

    const[errors,setErrors] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    })

    const {isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid} = UiValidation(form,mode)

    const disableButton = !form.email || !form.password || isEmailInvalid || isPasswordInvalid || (mode==='register' && (!form.confirmPassword || isConfirmPasswordInvalid))

 
    function handleInputChange(event){
        const {name, value} = event.target;
        setForm(prev => ({
            ...prev,
            [name]:value
        }))

        if(value.trim() !== ""){
            setErrors((prev) => ({
                ...prev,
                [name]:""
            }))
        }
    } 


    function handleBlur(event){
        const {name,value} = event.target
        if(value.trim() == ''){
            setErrors((prev) => ({
                ...prev,
                [name]:"Input shouldn't be empty"
            }))
        }
    }

    function userLoginRequest(event){
        event.preventDefault()
        console.log('loginnnn');
        setForm({
    email: '',
    password: '',
    confirmPassword: '',
  })
        
    }

    function userSignupRequest(event){    
        event.preventDefault()
        console.log('regisssssss');
        setForm({
    email: '',
    password: '',
    confirmPassword: '',
  })
        
    }


    useEffect(() => {
  setErrors({
    email: '',
    password: '',
    confirmPassword: '',
  });

  setForm(prev => ({
    ...prev,
    confirmPassword: '',
  }));
}, [mode]);

  return (
            <div className="w-full max-w-md p-4 text-center sm:w-full">
            <form action="" className="space-y-6 py-4 px-2 max-sm:px-0 max-[300px]:space-y-3" onSubmit={mode !== 'register' ? userLoginRequest : userSignupRequest}>
                <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="email" className="mb-1 text-gray-600">Email</label>
                    <input type="text" id="email" placeholder="name@example.com" className={`${inputStyle} ${errors.email ? 'border-red-500 border-2' : ''}`} value={form.email} onChange={handleInputChange} name='email' onBlur={handleBlur}/>
                    {isEmailInvalid && <div className='text-xs text-red-500 mt-1'>Must be an email</div>}
                    {errors.email && <div className='text-xs text-red-500 mt-1'>{errors.email}</div>}
                </div>
                <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="password" className="mb-1 text-gray-600">Password</label>
                    <div className='w-full relative'>
                        <input type={`${showPassword ? 'text' : 'password'}`} id="password"  placeholder="******"  className={`${inputStyle} ${errors.password ? 'border-red-500 border-2' : ''}`} value={form.password} onChange={handleInputChange} name='password' onBlur={handleBlur} />
                        {showPassword ? <FaEye style={{position:'absolute',top:'50%',right:'10px', transform:'translateY(-50%)',cursor:'pointer'}} onClick={togglePasswordVisible}/> : <FaEyeSlash style={{position:'absolute',top:'50%',right:'10px', transform:'translateY(-50%)',cursor:'pointer'}} onClick={togglePasswordVisible}/>}
                    </div>
                    {isPasswordInvalid&& <div className='text-xs text-red-500 block mt-1'>Minimum 8-20 char with atleast a capital letter, special char, number</div>}
                    {errors.password && <div className='text-xs text-red-500 mt-1'>{errors.password}</div>}
                </div>
                {mode === 'register' && <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="confirmPassword" className="mb-1 text-gray-600"> Confirm Password</label>
                    <input type="password" id="confirmPassword"  placeholder="******"  className={`${inputStyle} ${errors.confirmPassword ? 'border-red-500 border-2' : ''}`} value={form.confirmPassword} onChange={handleInputChange} name='confirmPassword' onBlur={handleBlur}/>
                    {isConfirmPasswordInvalid && <div className='text-xs text-red-500 mt-1'>Password do not match</div> }
                    {errors.confirmPassword && <div className='text-xs text-red-500 mt-1'>{errors.confirmPassword}</div>}
                </div>}
                <button disabled={disableButton} className={`bg-blue-500 w-full py-3 rounded-lg hover:bg-blue-600 shadow-sm hover:shadow text-white font-semibold transition-all duration-200 ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}>{buttonTitle}</button>

            </form>
        </div>
  )
}
