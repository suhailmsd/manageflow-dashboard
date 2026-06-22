import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../../contexts";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

export const useLogs = () => {
  const { firebase } = useContext(FirebaseContext);
  const firestoreDb = getFirestore(firebase);

  const [logsLoading, setLogsLoading] = useState(false);
  const [getLogsData, setGetLogsData] = useState(null);
  const [logsLoadingError, setLogsLoadingError] = useState(null);

  useEffect(() => {
    async function getAllLogs() {
      try {
        setLogsLoading(true);

        const q = query(
          collection(firestoreDb, "logs"),
          orderBy("timestamp", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGetLogsData(data);
      } catch (error) {
        setLogsLoadingError(error.message);
      } finally {
        setLogsLoading(false);
      }
    }
    getAllLogs();
  }, []);

  return { getLogsData, logsLoading };
};
