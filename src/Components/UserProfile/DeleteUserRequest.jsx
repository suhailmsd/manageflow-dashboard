import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../Contexts';
import { collection,getDocs, getFirestore, where, query, deleteDoc } from "firebase/firestore";
import { getAuth,deleteUser} from "firebase/auth";
import { useToast } from '../../Hooks';

export default function DeleteUserRequest() {

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const {firebase} = useContext(FirebaseContext);
    const firestoreDb = getFirestore(firebase)

    const {handleToast} = useToast();

    const [isDeleteUserSuccess,setIsDeleteUserSuccess] = useState(false);
    const [deleteUserError,setDeleteUserError] = useState(null);
    const [isLoadingDeleteRequest,setIsLoadingDeleteRequest] = useState(false);

    async function deleteCurrentUser(deleteUserId){
        try{
            
        setIsLoadingDeleteRequest(true);

        const userSearchQuery = query(
        collection(firestoreDb, "Users"),
        where("userId", "==", deleteUserId)
      );
      
      const snapshot = await getDocs(userSearchQuery);

      if (!snapshot.empty) {
        await deleteDoc(snapshot.docs[0].ref)
        await deleteUser(currentUser)
       
        };

        setIsDeleteUserSuccess(true)
        await new Promise((resolve) => setTimeout(resolve,3000))
        

        }catch(error){
            setDeleteUserError(error.message)
            console.log(error.message);
            
        }finally{
            setIsLoadingDeleteRequest(false)
        }
        
    }


    return {
        deleteCurrentUser,isLoadingDeleteRequest,isDeleteUserSuccess
    }
}
