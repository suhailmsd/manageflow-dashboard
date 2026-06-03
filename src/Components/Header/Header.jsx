import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts";
import { getAuth, signOut } from "firebase/auth";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import useModal from "../../Hooks/useModal";
import ModalBox from "../Modal/ModalBox";
import LoadingSpinner from "../Loading/LoadingSpinner";


export default function Header() {

  const {modalTitle,openModal,closeModal,isModalOpen} = useModal();
  const [loadingSpinner,setLoadingSpinner] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate();
  const location = useLocation();

  let {userDetails,userLoading} = useContext(UserContext);

  function userLogoutClick(){
    openModal('Are you sure want to Logout?')  
  }

  async function confirmLogout(){
    setLoadingSpinner(true);
    try{
      await new Promise((resolve) => setTimeout(resolve,2000))
      await signOut(auth)
      navigate('/')
    }catch(error){
      console.log(error);
    }finally{
      setLoadingSpinner(false)
    }
  }

  return (
   <div>
     <header className="[grid-area:header] h-16 flex items-center justify-end px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">

        {userDetails && location.pathname !== ("/app/dashboard" && "/app/dashboard/admin") && <Link to={`${userDetails.role === 'employee'? '/app/dashboard' : '/app/dashboard/admin'}`}><button className="text-black dark:text-white text-md  px-1 border-b border-gray-400 hover:border-gray-300">{<FaHome size='2em' className="hover:translate-y-1"  />}</button></Link>}
        <ThemeToggle />
        {isModalOpen && <ModalBox modalTitle={modalTitle} cancelModal={closeModal} confirmModal={confirmLogout} confirmButtonTitle={'Logout'} /> }

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

        {userDetails && !isModalOpen && <button onClick={userLogoutClick} className="bg-red-600 py-1 px-3 rounded-lg text-white text-md hover:bg-red-700">{<FaSignOutAlt />}</button> }

      </div>
      <div className="fixed z-index 20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {loadingSpinner && <LoadingSpinner /> }
      </div>
    </header>

    <Outlet />
   </div>
    
  );
}