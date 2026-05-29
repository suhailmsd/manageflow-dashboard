import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { UserContext } from "../../Contexts";
import { getAuth, signOut } from "firebase/auth";


export default function Header() {

  const auth = getAuth()
  const navigate = useNavigate();

  let {userDetails,setUserDetails} = useContext(UserContext);

  async function userLogoutClick(){
    console.log('hello');
    try{
      await signOut(auth)
      console.log('Signout Successfully');
      setUserDetails(null)
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }

  return (
   <div>
     <header className="[grid-area:header] h-16 flex items-center justify-end px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">

        <ThemeToggle />

        <div className="flex items-center gap-4 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-700">
            <div className="h-10 w-10 rounded-full bg-green-400"></div>

          <div className="">
            <p className="font-medium text-sm dark:text-white">John P.P</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">Admin</p>
          </div>
        </div>

        {userDetails && <button onClick={userLogoutClick} className="bg-red-600 py-1 px-3 rounded-lg text-white text-md hover:bg-red-700">Logout</button>}

      </div>
    </header>

    <Outlet />
   </div>
    
  );
}