import { useContext, useState } from "react";
import { FirebaseContext, ToastContext, UserContext } from "../Contexts";
import { collection, getDocs, getFirestore, query, updateDoc, where,deleteDoc } from "firebase/firestore";
import { getAuth,deleteUser} from "firebase/auth";
import { useToast } from '../Hooks';


export const updateUserProfile =() =>{

    const {firebase} = useContext(FirebaseContext)
    const {userDetails,setUserDetails} = useContext(UserContext)
    const fireStoreDB = getFirestore(firebase)
    const {handleToast} = useContext(ToastContext)

    const [updateLoading,setUpdateLoading] = useState(false);
    const [updateError,setUpdateError] = useState(null);


    async function update(updateData){
        

        try{
            setUpdateLoading(true);

            const getCollectionReference = await query(collection(fireStoreDB,"Users"),where ("userId", "==", userDetails.userId));

            const getDoc = await getDocs(getCollectionReference);

            if(!getDoc.empty){
                const docReference = getDoc.docs[0].ref

                await updateDoc(docReference,updateData)

                setUserDetails(prev => ({
                    ...prev,
                    firstName:updateData.firstName,
                    lastName:updateData.lastName,
                    phone:updateData.phone
                }));                
                
            }
             handleToast("success","User updated successfully")
            


        }catch(error){
            setUpdateError(error.message)
        }finally{
            setUpdateLoading(false)
           

        }

    }

    return {
        updateLoading,updateError,update,
    }
};


export const deleteUserProfile =() => {

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
