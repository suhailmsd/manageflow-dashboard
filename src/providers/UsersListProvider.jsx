import React, { useContext, useEffect, useState } from "react";
import {
  AuthPermissionContext,
  FirebaseContext,
  UserContext,
  UsersListContext,
} from "../contexts/";

import {
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

export default function UsersListProvider({ children }) {
  const { hasRole } = useContext(AuthPermissionContext);
  const { firebase } = useContext(FirebaseContext);
  const { userDetails } = useContext(UserContext);

  const firestoreDb = getFirestore(firebase);

  const [usersListLoading, setUsersListLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [errorList, setErrorList] = useState(null);
  const [refreshUsersList, setRefreshUsersList] = useState(false);


  useEffect(() => {
    if (!hasRole("admin")) return;

    async function fetchUsers() {
      
      try {
        setUsersListLoading(true);
        setErrorList(null);

        const q = query(collection(firestoreDb, "Users"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setUsersList([]);
          return;
        }

        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsersList(users);
      } catch (err) {
        setErrorList(err.message);
      } finally {
        setUsersListLoading(false);
        setRefreshUsersList(false);
      }
    }

    fetchUsers();
  }, [userDetails?.role,refreshUsersList]);

  return (
    <UsersListContext.Provider
      value={{
        usersListLoading,
        usersList,
        errorList,
        setRefreshUsersList,
      }}
    >
      {children}
    </UsersListContext.Provider>
  );
}