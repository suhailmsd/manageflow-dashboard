import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { AuthPermissionContext, UserContext } from "../../../../contexts";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import useModal from "../../hooks/useModal";
import ModalBox from "../modal/ModalBox";
import LoadingSpinner from "../loading/LoadingSpinner";

import { signOutUser } from "../../../../firebase/authService";

export default function Header() {
  let { userDetails, userLoading } = useContext(UserContext);
  const { modalTitle, openModal, closeModal, isModalOpen } = useModal();

  const { hasRole } = useContext(AuthPermissionContext);

  const { signoutLoading, signout } = signOutUser();

  function userLogoutClick() {
    openModal("Are you sure want to Logout?");
  }

  function confirmLogout() {
    signout();
  }

  return (
    <div>
      {userLoading ? (
        <div className="[grid-area:header] h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"></div>
      ) : (
        <header className="[grid-area:header] h-16 flex items-center justify-end px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 max-[380px]:px-1">
          <div className="flex items-center gap-4 max-[500px]:gap-1 max-[500px]:text-sm">
            {userDetails && (
              <NavLink
                to={`${hasRole("admin") ? "/app/dashboard/admin" : "/app/dashboard"}`}
                end
              >
                {({ isActive }) => (
                  <button className="text-black dark:text-white text-md  px-1 border-b border-gray-400 hover:border-gray-300">
                    {
                      <FaHome
                        size="2em"
                        className={`${isActive ? "translate-y-1" : ""} max-[500px]:text-md`}
                      />
                    }
                  </button>
                )}
              </NavLink>
            )}
            <ThemeToggle />
            {isModalOpen && (
              <ModalBox
                modalTitle={modalTitle}
                cancelModal={closeModal}
                confirmModal={confirmLogout}
                confirmButtonTitle={"Logout"}
              />
            )}

            {userDetails && (
              <Link
                to={`${hasRole("admin") ? "/app/dashboard/admin/profile" : "/app/dashboard/profile"}`}
              >
                <div className="flex items-center gap-4 px-3 py-2 max-[500px]:px-1 max-[500px]:py-1 rounded-xl bg-slate-100 dark:bg-gray-700 group relative">
                  <img
                    src={userDetails ? userDetails?.profileUrl : <div></div>}
                    className="h-10 w-10 rounded-full"
                  />

                  <div className="">
                    <p className="font-medium text-sm dark:text-white max-[500px]:line-clamp-1">
                      {userDetails?.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {userDetails?.role}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {userDetails && !isModalOpen && (
              <button
                onClick={userLogoutClick}
                className="bg-red-600 hover:bg-red-500 py-1 px-3 rounded-lg text-white text-md"
              >
                {<FaSignOutAlt />}
              </button>
            )}
          </div>
          <div className="fixed z-index 20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {signoutLoading && <LoadingSpinner />}
          </div>
        </header>
      )}

      <Outlet />
    </div>
  );
}
