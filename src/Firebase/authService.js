import UiValidation from "../Features/Shared/Components/LoginAndSignup/UiValidation";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { FirebaseContext, UserContext } from "../Contexts";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { useToast } from "../Hooks";
import { useNavigate } from "react-router-dom";




export const signInUser = () => {
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
};

export const signUpUser =() =>{


    const {setIsSignupState} = useContext(UserContext)
    const {handleToast} = useToast();

    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth();
    const fireStoreDB = getFirestore(firebase);
    
    
    const [signupSucessMessage,setSignupSucessMessage] = useState(null);
    const [loadingSignupRequest, setLoadingSignupRequest] = useState(false);
    const [signupError,setSignupError] = useState(null)


    async function signup(form){

         const {email,password, ...filterForm} = form
        delete filterForm.confirmPassword

        try{
            setIsSignupState(true);
            setLoadingSignupRequest(true)
            setSignupSucessMessage(null)
            
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            handleToast("success","User Registered successfully...")
            
            const tofireStoreUserCollection = {...filterForm, userId:userCredential.user.uid, status:"pending",role:"employee",firstName:"",lastName:"",phone:"",profileUrl:"",joinedAt: new Date().toISOString()};

            const collectionRef = collection(fireStoreDB,"Users");
            await addDoc(collectionRef,tofireStoreUserCollection);

            const logsCollectionRef = collection(fireStoreDB,"logs");
            await addDoc(logsCollectionRef, {action:'USER_CREATED',targetUserId:userCredential.user.uid,targetUsername:filterForm.username,timestamp:serverTimestamp()})


            await signOut(auth)

            setIsSignupState(false);
            setSignupSucessMessage('User register successful');

            window.location.href = "/"

        }catch(error){
            if(error.message === "Firebase: Error (auth/email-already-in-use)."){
                setSignupError('Email already exists')
                return
            }
        }finally{
            setLoadingSignupRequest(false)
        }
    };

    return {signupSucessMessage,loadingSignupRequest,signupError,signup,setSignupSucessMessage,setSignupError}
}

export const signOutUser = () =>{
    const [loadingSpinner,setLoadingSpinner] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();

    async function signout(){
        setLoadingSpinner(true);
    try{
        
      await new Promise((resolve) => setTimeout(resolve,2000))
      await signOut(auth)
      navigate('/')
    }catch(error){
      console.log(error);
    }finally{
      setLoadingSpinner(false)
    }
    }

    return {
        loadingSpinner,signout
    }

}

