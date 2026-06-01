import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, UserContext } from "../../Contexts";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";


export default function useSignupRequest(){

    const {setIsSignupState} = useContext(UserContext)

    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth();
    const fireStoreDB = getFirestore(firebase);
    const navigate = useNavigate();
    
    
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
            
            const tofireStoreUserCollection = {...filterForm, userId:userCredential.user.uid, status:"pending",role:"employee",joinedAt: new Date().toISOString()};

            const collectionRef = collection(fireStoreDB,"Users");

            await addDoc(collectionRef,tofireStoreUserCollection);

            await signOut(auth)

            setIsSignupState(false);
            
            setSignupSucessMessage('User registered successfully');

            window.location.href = "/"

        }catch(error){
            if(error.message === "Firebase: Error (auth/email-already-in-use)."){
                return setSignupError('Email already exists')
            }
            setSignupError(error.message)
        }finally{
            setLoadingSignupRequest(false)
        }
    };

    return {signupSucessMessage,loadingSignupRequest,signupError,signup,setSignupSucessMessage,setSignupError}
}