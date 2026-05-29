import { FirebaseContext } from "../Contexts";
import firebase from "../Firebase";

export default function FirebaseProvider({children}){
   return(
     <FirebaseContext.Provider value={{firebase}}>
        {children}
    </FirebaseContext.Provider>
    
   )
}