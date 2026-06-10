import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, ToastContext, UserContext } from "../../Contexts";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "../../Hooks";


export default function UseSignupRequest(){


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