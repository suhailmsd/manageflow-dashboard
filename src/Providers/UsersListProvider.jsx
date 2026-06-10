import React, { useContext, useEffect, useState } from 'react'
import {FirebaseContext, UserContext, UsersListContext} from '../Contexts/'
import { collection,getDocs, getFirestore, where, query } from "firebase/firestore";

export default function UsersListProvider({children}) {

  const {firebase} = useContext(FirebaseContext);
  const firestoreDb = getFirestore(firebase)

  const {userDetails} = useContext(UserContext)

    const [usersListLoading,setUsersListLoading] = useState(false);
    const [usersList,setUsersList] = useState(null)
    const [errorList,setErrorList] = useState(null)
    const [usersListUpdated,setUsersListUpdated] = useState(false);

   useEffect(()=>{
    if(userDetails?.role === 'admin'){
      
      async function fetchAllUsersfromFirestore(){
        try{
          setUsersListLoading(true)
        
        const userSearchQuery = await query(collection(firestoreDb,"Users"));

        const snapshot = await getDocs(userSearchQuery);

        if(!snapshot.empty){
         const usersToSave = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setUsersList(usersToSave)
          
        }
        

        }catch(error){
          setErrorList(error.message)
        }finally{
          setUsersListLoading(false);
          setUsersListUpdated(false);
        }
      }
      fetchAllUsersfromFirestore();
      
    }
   },[userDetails,usersListUpdated])


  return (
    <UsersListContext.Provider value={{usersListLoading,usersList,setUsersListUpdated}}>
        {children}
    </UsersListContext.Provider>
  )
}
