import React, { useContext, useState } from 'react'
import {FirebaseContext} from '../../Contexts'
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default function ApproveUserRequest() {

    const {firebase} = useContext(FirebaseContext);
    const firestoreDb = getFirestore();

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
}
