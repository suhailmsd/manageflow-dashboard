import { useState } from "react";
import { UserContext } from "../Contexts";

export default function UserProvider({children}){

    const[userDetails,setUserDetails] = useState(null);

    return(
        <UserContext value={{userDetails,setUserDetails}}>
            {children}
        </UserContext>
    )
}