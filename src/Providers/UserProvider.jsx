import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext, UserContext } from "../Contexts";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection,getDocs, getFirestore, where, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Hooks";

export default function UserProvider({children}){

    const[userDetails,setUserDetails] = useState(null);
    const[userLoading,setUserLoading] = useState(true);
    const {handleToast} = useToast();

    const auth = getAuth();
    const {firebase} = useContext(FirebaseContext)
    const firestoreDB = getFirestore(firebase)

    const isSignupStateRef = useRef(false);


    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (LoggedInuser) => {

    if(isSignupStateRef.current) return;

    if (LoggedInuser) {

      const userSearchQuery = query(
        collection(firestoreDB, "Users"),
        where("userId", "==", LoggedInuser.uid)
      );

      const snapshot = await getDocs(userSearchQuery);

      if (!snapshot.empty) {
        const getUserToSave = {
          ...snapshot.docs[0].data(),
          email: LoggedInuser.email,
        };

        if(getUserToSave.status === "suspended"){
          signOut(auth);
          handleToast("failure","Account suspended by admin")
        }

        setUserDetails(getUserToSave);
        setUserLoading(false)
      }
    } else {
      console.log("no user exists");
      setUserDetails(null);
      setUserLoading(false)
    }
  });

  return () => unsubscribe();
}, []);

    return(
        <UserContext.Provider value={{userDetails,setUserDetails,userLoading,setIsSignupState: (value) =>{isSignupStateRef.current = value}}}>
            {children}
        </UserContext.Provider>
    )
}