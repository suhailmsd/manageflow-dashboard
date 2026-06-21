import { FirebaseContext } from "../contexts";
import firebase from "../firebase";

export default function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      {children}
    </FirebaseContext.Provider>
  );
}
