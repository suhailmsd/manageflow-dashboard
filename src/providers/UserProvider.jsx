import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext, UserContext } from "../contexts";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { useToast } from "../hooks";

export default function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const { showToast } = useToast();

  const auth = getAuth();
  const { firebase } = useContext(FirebaseContext);
  const firestoreDB = getFirestore(firebase);

  const skipAuthListenerRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // skipAuthListenerRef was designed to block default behavior of firebase (user remain logged in after signup)
      // our UserProvider wait for auth state to fetch user details on context so here if skipAuthListenerRef is true
      // then skip then stop user updation. (skipAuthListenerRef is set to true on signup auth service area to block user updation)
      if (skipAuthListenerRef.current) return;
      
      try {
        if (!user) {
          if (!isMounted) return;
          setUserDetails(null);
          return;
        }

        const q = query(
          collection(firestoreDB, "Users"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (!isMounted) return;

        if (snapshot.empty) {
          setUserDetails(null);
          return;
        }

        const userData = {
          ...snapshot.docs[0].data(),
          email: user.email,
        };

        if (userData.status === "suspended") {
          signOut(auth);
          showToast("failure", "Account suspended by admin");
          return;
        }

        setUserDetails(userData);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setUserLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth, firestoreDB]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userLoading,
        setSkipAuthListenerRef: (val) => {
          skipAuthListenerRef.current = val;
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}