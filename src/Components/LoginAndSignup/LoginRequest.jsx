import { useState } from "react";
import UiValidation from "./UiValidation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function UseLoginRequest(){
    const auth = getAuth();

    const [loginError,setLoginError] = useState(null)
    const [loginData,setLoginData] = useState(null)
    const [isLoginLoading,setIsLoginLoading] = useState(false)

        async function login(form){

            const email = form.email;
            const password = form.password;

            const {isEmailInvalid,isPasswordInvalid} = UiValidation(form);

               if(isEmailInvalid || isPasswordInvalid){
            setLoginError('typo error, login again')
            return            
        }

            try{
                setLoginError(null)
                setIsLoginLoading(true)

                let userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                
                console.log('Logged in as:',userCredential.user.email,'=>', userCredential.user.uid);

                if(userCredential){
                    setLoginData(userCredential.user)
                }
                

            }catch(error){
                setLoginError('Invalid Login or Password')
                console.log(error.message);
                if(error.code == 'auth/too-many-requests'){
                    setLoginError('Too many request try again later')
                }
                
            }finally{
                setIsLoginLoading(false)
            }
        }


    return{
        loginData,loginError,isLoginLoading,setLoginError,login
    }
}