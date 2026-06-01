import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts";
import { getAuth, signOut } from "firebase/auth";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaHouseMedical } from "react-icons/fa6";


export default function Header() {

  const auth = getAuth()
  const navigate = useNavigate();
  const location = useLocation();

  let {userDetails,userLoading} = useContext(UserContext);

  async function userLogoutClick(){
    console.log('hello');
    try{
      await signOut(auth)
      console.log('Signout Successfully');
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }



  return (
   <div>
     <header className="[grid-area:header] h-16 flex items-center justify-end px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">

        {userDetails && location.pathname !== ("/app/dashboard" && "/app/dashboard/admin") && <Link to={`${userDetails.role === 'employee'? '/app/dashboard' : '/app/dashboard/admin'}`}><button className="text-black dark:text-white text-md  px-1 border-b border-gray-400 hover:border-gray-300 ">{<FaHome size='2em' />}</button></Link>}
        <ThemeToggle />

       {userDetails && 
        <Link to={`${userDetails.role === 'employee'? '/app/dashboard/profile' : '/app/dashboard/admin/profile'}`}>
        <div className="flex items-center gap-4 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-700 group relative">
            <div className="h-10 w-10 rounded-full bg-green-400"></div>

          <div className="">
            <p className="font-medium text-sm dark:text-white">{userDetails?.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{userDetails?.role}</p>
          </div>
         <div className="hidden group-hover:block absolute top-0 right-0 px-2 rounded text-center bg-gray-900 text-white"><span className="text-xs">profile</span></div> 
        </div>
        </Link>
        }

        {userDetails && <button onClick={userLogoutClick} className="bg-red-600 py-1 px-3 rounded-lg text-white text-md hover:bg-red-700">{<FaSignOutAlt />}</button>}

      </div>
    </header>

    <Outlet />
   </div>
    
  );
}