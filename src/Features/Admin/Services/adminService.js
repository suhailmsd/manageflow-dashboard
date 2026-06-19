import React, { useContext, useState } from 'react'
import {FirebaseContext, ToastContext, UserContext, UsersListContext} from '../../../Contexts'
import { getFirestore, doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";


export const quickEditUser = () => {

    const {firebase} = useContext(FirebaseContext);
    const firestoreDb = getFirestore(firebase);

    const[isStatusUpdateSuccess,setIsStatusUpdateSuccess] = useState(null);
    const [isLoadingStatusUpdate,setIsLoadingStatusUpdate] = useState(false);
    const [statusUpdateError,setStatusUpdateErrorError] = useState(null);
    const {setUsersListUpdated} = useContext(UsersListContext)
    
    async function updateStatus({userDocID,userId,status,previousStatus,username},{loggedInUserId,loggedInUsername,loggedInUserRole}){

        try{
            setIsLoadingStatusUpdate(true);

            const docRef = await doc(firestoreDb,"Users",userDocID);

            await updateDoc(docRef,{
                status:status
            });

            const logsCollectionRef = collection(firestoreDb,"logs");
            await addDoc(logsCollectionRef, {action:'STATUS_CHANGED',targetUserId:userId,targetUsername:username,performedBy:loggedInUserRole,performedByUserId:loggedInUserId,performedByUsername:loggedInUsername,previousStatus:previousStatus,newStatus:status,timestamp:serverTimestamp()})

            setUsersListUpdated(true)
            // setIsStatusUpdateSuccess('status updated successfully')
            


        }catch(error){
            setStatusUpdateErrorError(error.message)
            console.log(error.message);
            

        }finally{
            setIsLoadingStatusUpdate(false)
            setIsStatusUpdateSuccess(null)
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

    async function updateUser(userForm,{editUserDocId,editUserId,editUserPreviousRole,editUserNewRole,editUserPreviousDepartment,editUserNewDepartment,editUserPreviousStatus,editUserNewStatus},{loggedInUserRole,loggedInUserId,loggedInUsername}){
        try{
            setIsLoading(true);

            const collectionRef = await doc(firestoreDb,"Users",editUserDocId);

            await updateDoc(collectionRef,userForm);

            const logsCollectionRef = collection(firestoreDb,"logs");
            
            if(editUserPreviousRole !== editUserNewRole){
                await addDoc(logsCollectionRef, {action:'ROLE_CHANGED',targetUserId:editUserId,targetUsername:userForm.username,performedBy:loggedInUserRole,performedByUserId:loggedInUserId,performedByUsername:loggedInUsername,previousRole:editUserPreviousRole,newRole:editUserNewRole,timestamp:serverTimestamp()})
            }

            if(editUserPreviousDepartment !== editUserNewDepartment){
                await addDoc(logsCollectionRef, {action:'DEPARTMENT_CHANGED',targetUserId:editUserId,targetUsername:userForm.username,performedBy:loggedInUserRole,performedByUserId:loggedInUserId,performedByUsername:loggedInUsername,previousDepartment:editUserPreviousDepartment,newDepartment:editUserNewDepartment,timestamp:serverTimestamp()})
            }

            if(editUserPreviousStatus !== editUserNewStatus){
                await addDoc(logsCollectionRef, {action:'STATUS_CHANGED',targetUserId:editUserId,targetUsername:userForm.username,performedBy:loggedInUserRole,performedByUserId:loggedInUserId,performedByUsername:loggedInUsername,previousStatus:editUserPreviousStatus,newStatus:editUserNewStatus,timestamp:serverTimestamp()})
            }
            

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


