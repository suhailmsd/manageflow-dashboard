import { useContext, useEffect, useState } from "react";
import UiValidation from "./UiValidation";
import {FirebaseContext} from '../../Contexts/index'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, Firestore, getDocs, getFirestore } from "firebase/firestore";

export default function useLoginRequest(){

    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth();
    const fireStoreDB = getFirestore(firebase)


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
                
                console.log(form);

                let userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                
                console.log('Logged in as:',userCredential.user.email,'=>', userCredential.user.uid);

                try {
            const querySnapshot = await getDocs(
                collection(fireStoreDB, "Users")
            );

            const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        let isUserIdMatchesFirestore = users.find(item => item.userId == userCredential.user.uid)

        if(isUserIdMatchesFirestore){
            let userData = [{...isUserIdMatchesFirestore,email:userCredential.user.email}]
            setLoginData(userData);
        }

            } catch (error) {
            console.error('no dbbb exisit');
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