import React, { useContext, useState } from 'react'
import {FirebaseContext, ToastContext} from '../../../Contexts'
import { collection,getDocs, getFirestore, where, query, doc, updateDoc } from "firebase/firestore";
import useEditModal from './useEditModal'

export default function UserEditRequest() {

    const {firebase} = useContext(FirebaseContext)
    const {handleToast} = useContext(ToastContext)

    const {setIsOpenModal} = useEditModal();

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
