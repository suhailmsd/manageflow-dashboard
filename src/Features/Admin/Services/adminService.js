import React, { useContext, useState } from 'react'
import {FirebaseContext, ToastContext} from '../../../Contexts'
import { getFirestore, doc, updateDoc } from "firebase/firestore";


export const quickEditUser = () => {

    const {firebase} = useContext(FirebaseContext);
    const firestoreDb = getFirestore(firebase);

    const[isStatusUpdateSuccess,setIsStatusUpdateSuccess] = useState(null);
    const [isLoadingStatusUpdate,setIsLoadingStatusUpdate] = useState(false);
    const [statusUpdateError,setStatusUpdateErrorError] = useState(null);
    
    async function updateStatus({userDocID,status}){

        try{
            setIsLoadingStatusUpdate(true);

            const docRef = await doc(firestoreDb,"Users",userDocID);

            await updateDoc(docRef,{
                status:status
            });

            setIsStatusUpdateSuccess('status updated successfully')
            


        }catch(error){
            setStatusUpdateErrorError(error.message)
            console.log(error.message);
            

        }finally{
            setIsLoadingStatusUpdate(false)
        }
    }

    return{
        updateStatus,isStatusUpdateSuccess
    }
};



export const editUser = () => {

    const {firebase} = useContext(FirebaseContext)
    const {handleToast} = useContext(ToastContext)


    const firestoreDb = getFirestore(firebase)

    const [isLoading,setIsLoading] = useState(false);
    const [editError,setEditError] = useState(null);
    const [updateSuccess,setUpdateSuccess] = useState(null)

    async function updateUser(userForm,currentUserDocID){
        try{
            setIsLoading(true);

            const collectionRef = await doc(firestoreDb,"Users",currentUserDocID);

            await updateDoc(collectionRef,userForm);


            setUpdateSuccess('success to close modal')


        }catch(error){
            console.log(error.message);
            handleToast("failure",error.message);
            setEditError(error.message)
            
        }finally{
            setIsLoading(false);
           
        }

    }

    return {isLoading,updateUser,updateSuccess}
    
}


