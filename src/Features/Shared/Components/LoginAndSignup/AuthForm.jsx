
import {useContext, useEffect, useState} from 'react'
import UiValidation from './UiValidation';
import {FaEyeSlash, FaEye} from "react-icons/fa";
import {signInUser} from '../../../../Firebase/authService';
import {signUpUser} from '../../../../Firebase/authService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../Contexts';

export default function AuthForm({buttonTitle,mode}) {

    const {userDetails} = useContext(UserContext)

    const navigate = useNavigate()

    // let inputStyle = 'p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full'
    let inputStyle = 'p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full dark:bg-slate-900 dark:text-white bg-slate-200 text-black'

    const [showPassword,setShowPassword] = useState(false);

    function togglePasswordVisible(){
        setShowPassword(!showPassword)
    }

    const {loginData,loginError,setLoginError,isLoginLoading,login} = signInUser()
    const {signupSucessMessage,loadingSignupRequest,signupError,signup,setSignupSucessMessage,setSignupError} = signUpUser()

    const[form,setForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        username:'',
        department:''

    })

    const[errors,setErrors] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        username:'',
    })

    const {isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid, isUsernameInvalid} = UiValidation(form,mode)

    const disableButton = !form.email || !form.password || isEmailInvalid || isPasswordInvalid || (mode==='register' && (!form.confirmPassword || isConfirmPasswordInvalid || !form.username || isUsernameInvalid || !form.department))

 
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
        setLoginError(null)
        setSignupSucessMessage(null)
        setSignupError(null)

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


    function loginSubmitRequest(event){
        event.preventDefault();
        login(form);
    }

    useEffect(()=>{
        if(userDetails?.role === "employee"){
            navigate("/app/dashboard")
        }
        if(userDetails?.role === "admin"){
            navigate("/app/dashboard/admin")
        }

    },[userDetails])
    

    function signupSubmitRequest(event){    
        event.preventDefault()
        signup(form)
    }


    useEffect(() => {
  setErrors({
    email: '',
    password: '',
    confirmPassword: '',
    username:'',
  });
  setSignupError(null)

  setForm(prev => ({
    ...prev,
    confirmPassword: '',
    username:'',
    department:''
  }));
}, [mode]);


  return (
            <div className="w-full max-w-md p-4 text-center sm:w-full">
            <form action="" className="relative space-y-6 py-4 px-2 max-sm:px-0 max-[300px]:space-y-3" onSubmit={mode !== 'register' ? loginSubmitRequest : signupSubmitRequest}>
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
                    {mode==='login' && loginError &&  <div className='bg-transparent w-full py-3 rounded-lg shadow-sm font-semibold text-center text-red-500 border border-red-900 mt-5'>{loginError}</div>}
                </div>
                {mode === 'register' && <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="confirmPassword" className="mb-1 text-gray-600"> Confirm Password</label>
                    <input type="password" id="confirmPassword"  placeholder="******"  className={`${inputStyle} ${errors.confirmPassword ? 'border-red-500 border-2' : ''}`} value={form.confirmPassword} onChange={handleInputChange} name='confirmPassword' onBlur={handleBlur}/>
                    {isConfirmPasswordInvalid && <div className='text-xs text-red-500 mt-1'>Password do not match</div> }
                    {errors.confirmPassword && <div className='text-xs text-red-500 mt-1'>{errors.confirmPassword}</div>}
                </div>}
               {mode === 'register' &&  <div className="input-group flex text-left w-full gap-2">
                     <div className='w-full'>
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Cena123' className={`${inputStyle} ${errors.username ? 'border-red-500 border-2' : ''}`} name='username' value={form.username} onChange={handleInputChange} onBlur={handleBlur}/>
                        {isUsernameInvalid && <div className='text-xs text-red-500 mt-1'>Only letters and numbers allowed with max 15 chars</div> }
                        {errors.username && <div className='text-xs text-red-500 mt-1'>{errors.username}</div>}
                    </div>
                    <div className='w-full'>
                        <label htmlFor="">Department</label>
                        <select id="" className={`${inputStyle} bg-white`} name="department" onChange={handleInputChange}>
                            <option selected disabled>Select an option</option>
                            <option  value="IT" className='bg-slate-200 dark:bg-gray-900'>IT</option>
                            <option value="HR" className='bg-slate-200 dark:bg-gray-900'>HR</option>
                        </select>
                        {form.department === '' && <div className='text-xs text-red-500 mt-1'>Department needed</div> }
                    </div>
                </div>}
                {mode==='register' && signupError &&  <div className='bg-transparent w-full py-3 rounded-lg shadow-sm font-semibold text-center text-red-500 border border-red-900 mt-5'>{signupError}</div>}
                <button disabled={disableButton} className={`bg-blue-500 w-full py-3 rounded-lg hover:bg-blue-600 shadow-sm hover:shadow text-white font-semibold transition-all duration-200 ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}>{buttonTitle}</button>
                {mode==='login' && isLoginLoading && <div className='absolute top-1/2 left-1/2 -tranlate-y-1/4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>}
                {mode==='register' && loadingSignupRequest && <div className='absolute top-1/2 left-1/2 -tranlate-y-1/4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>}
            </form>
        </div>
  )
}
