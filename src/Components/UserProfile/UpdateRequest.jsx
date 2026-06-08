import { useContext, useState } from "react";
import { FirebaseContext, ToastContext, UserContext } from "../../Contexts";
import { collection, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { use } from "react";

export default function UpdateRequest(){

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
}