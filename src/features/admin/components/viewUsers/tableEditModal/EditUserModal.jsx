import { useContext, useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import editUiValidation from "./editUiValidation";
import { editUser } from "../../../services/adminService";
import { UserContext, UsersListContext } from "../../../../../contexts";
import { useToast } from "../../../../../hooks";

export default function EditUserModal({ closeEditModal, currentUserForEdit }) {
  const { isLoading, updateUser, updateSuccess } = editUser();

  const { usersList } = useContext(UsersListContext);
  const { userDetails } = useContext(UserContext);
  const { showToast } = useToast();

  const [editForm, setEditForm] = useState({
    username: currentUserForEdit.username,
    firstName: currentUserForEdit.firstName,
    lastName: currentUserForEdit.lastName,
    phone: currentUserForEdit.phone,
    department: currentUserForEdit.department,
    role: currentUserForEdit.role,
    status: currentUserForEdit.status,
  });

  const [editFormError, setEditFormError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEditFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleFormError() {
    const errors = {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      department: "",
      role: "",
      status: "",
    };

    const {
      isUsernameInvalid,
      isFirstNameInvalid,
      isLastNameInvalid,
      isPhoneInvalid,
    } = editUiValidation(editForm);

    const hasOneAdmin = usersList.filter(
      (user) => user.role === "admin",
    ).length;

    if (!editForm.username.trim()) {
      errors.username = "username shouldn't be empty";
    } else if (isUsernameInvalid) {
      errors.username = "Only letters and numbers allowed with max 15 chars";
    }

    if ((!editForm.firstName === "") | isFirstNameInvalid) {
      errors.firstName =
        "Only alphabets allowed not exceeding 20 chars, no spaces allowed";
    }

    if ((!editForm.lastName === "") | isLastNameInvalid) {
      errors.lastName =
        "Last name shouldn't exceed 20 char and should'nt match firstname, no spaces allowed";
    }

    if ((!editForm.phone === "") | isPhoneInvalid) {
      errors.phone = "Phone number with country code required";
    }

    if (
      userDetails?.role === "employee" &&
      hasOneAdmin === 1 &&
      editForm.role !== "admin"
    ) {
      errors.role = "Must have one admin user";
    }

    setEditFormError(errors);
    return errors;
  }

  let hasChanges =
    editForm.username.trim() !== currentUserForEdit.username ||
    editForm.firstName.trim() !== currentUserForEdit.firstName ||
    editForm.lastName.trim() !== currentUserForEdit.lastName ||
    editForm.phone.trim() !== currentUserForEdit.phone ||
    editForm.role.trim() !== currentUserForEdit.role ||
    editForm.department.trim() !== currentUserForEdit.department ||
    editForm.status.trim() !== currentUserForEdit.status;

  function handleSubmitforEdit(e) {
    e.preventDefault();
    if (userDetails?.status !== "active") {
      showToast("failure", "update blocked");
      return;
    }

    const errors = handleFormError();

    if (Object.values(errors).some((value) => value !== "")) {
      return;
    }

    if (hasChanges) {
      updateUser(
        {
          username: editForm.username.trim(),
          firstName: editForm.firstName.trim(),
          lastName: editForm.lastName.trim(),
          phone: editForm.phone.trim(),
          department: editForm.department.trim(),
          role: editForm.role.trim(),
          status: editForm.status.trim(),
        },
        {
          editUserDocId: currentUserForEdit.id,
          editUserId: currentUserForEdit.userId,
          editUserPreviousRole: currentUserForEdit.role,
          editUserNewRole: editForm.role,
          editUserPreviousDepartment: currentUserForEdit.department,
          editUserNewDepartment: editForm.department,
          editUserPreviousStatus: currentUserForEdit.status,
          editUserNewStatus: editForm.status,
        },
        {
          loggedInUserRole: userDetails?.role,
          loggedInUserId: userDetails?.userId,
          loggedInUsername: userDetails?.username,
        },
      );
    }
  }

  useEffect(() => {
    if (updateSuccess) {
      closeEditModal();
    }
  }, [updateSuccess]);

  let inputStyle =
    "autofill-color peer profile-input px-3 pt-5 pb-2 max-[500px]:pt-4 max-[500px]:pb-1 dark:bg-slate-900 dark:text-white bg-slate-200 text-black rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 dark:border-gray-500 hover:ring-2 hover:ring-cyan-200 w-full";
  let labelStyle =
    "absolute left-3 top-4 text-gray-500 transition-all duration-200 ease-in-out peer-focus:top-1 peer-focus:text-xs peer-valid:top-1 peer-valid:text-xs max-[600px]:peer-focus:-top-1 max-[600px]:peer-valid:-top-1";
  let optionsLabelStyle =
    "absolute max-[600px]:-top-2 max-[600px]:peer-focus:-top-3 -top-1 peer-focus:-top-2 left-2 bg-white px-1 text-sm text-gray-600 transition-all duration-200 ease-in-out dark:text-gray-400 dark:bg-gray-800 dark:opacity-2";

  return (
    <>
      <div
        onClick={closeEditModal}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center max-[600px]:px-4">
        <form
          className="relative dark:bg-gray-800 flex flex-col gap-3 p-4 pt-10 max-[600px]:px-2 max-[600px]:pt-5 rounded-xl w-full max-w-[400px] bg-slate-50"
          onSubmit={handleSubmitforEdit}
        >
          <h2 className="font-bold text-center text-xl max[500px]:text-md">
            Update User Information
          </h2>
          <button
            onClick={closeEditModal}
            className="text-xl absolute top-2 right-2 text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400"
          >
            <FaTimesCircle />
          </button>
          <div className="input-group relative w-full">
            <input
              type="text"
              name="username"
              placeholder="  "
              required
              className={inputStyle}
              onChange={handleChange}
              value={editForm.username}
            />
            <label htmlFor="" className={labelStyle}>
              Username
            </label>
            {editFormError?.username && (
              <div className="text-red-500 text-sm mt-2">
                {editFormError.username}
              </div>
            )}
          </div>

          <div className="flex gap-2 max-[600px]:flex-col">
            <div className="input-group relative w-full">
              <input
                type="text"
                name="firstName"
                placeholder="  "
                className={inputStyle}
                onChange={handleChange}
                value={editForm.firstName}
              />
              <label htmlFor="" className={labelStyle}>
                FirstName
              </label>
              {editFormError?.firstName && (
                <div className="text-red-500 text-sm mt-2">
                  {editFormError.firstName}
                </div>
              )}
            </div>

            <div className="input-group relative w-full">
              <input
                type="text"
                name="lastName"
                placeholder="  "
                className={inputStyle}
                onChange={handleChange}
                value={editForm.lastName}
              />
              <label htmlFor="" className={labelStyle}>
                Lastname
              </label>
              {editFormError?.lastName && (
                <div className="text-red-500 text-sm mt-2">
                  {editFormError.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 max-[600px]:flex-col">
            <div className="input-group relative w-full">
              <input
                type="number"
                name="phone"
                placeholder="  "
                className={inputStyle}
                onChange={handleChange}
                value={editForm.phone}
              />
              <label htmlFor="" className={labelStyle}>
                Phone
              </label>
              {editFormError?.phone && (
                <div className="text-red-500 text-sm mt-2">
                  {editFormError.phone}
                </div>
              )}
            </div>

            <div className="input-group relative w-full">
              <select
                name="department"
                id=""
                className={inputStyle}
                onChange={handleChange}
                value={editForm.department}
              >
                <option value="IT">IT</option>
                <option value="HR">HR</option>
              </select>
              <label htmlFor="" className={optionsLabelStyle}>
                Department
              </label>
              {editForm?.department === "" && (
                <div className="text-xs text-red-500 mt-1">
                  Department needed
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 max-[600px]:flex-col">
            <div className="input-group relative w-full">
              <select
                name="role"
                id=""
                className={inputStyle}
                onChange={handleChange}
                value={editForm.role}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              <label htmlFor="" className={optionsLabelStyle}>
                Role
              </label>
              {editForm?.role === "" && (
                <div className="text-xs text-red-500 mt-1">Role needed</div>
              )}
              {editFormError?.role && (
                <div className="text-red-500 text-sm mt-2">
                  {editFormError.role}
                </div>
              )}
            </div>
            <div className="input-group relative w-full">
              <select
                name="status"
                id=""
                className={inputStyle}
                onChange={handleChange}
                value={editForm.status}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspend</option>
              </select>
              <label htmlFor="" className={optionsLabelStyle}>
                Status
              </label>
              {editForm?.status === "" && (
                <div className="text-xs text-red-500 mt-1">Status needed</div>
              )}
            </div>
          </div>

          {hasChanges && (
            <button className="dark:bg-indigo-500 dark:hover:bg-indigo-400 bg-indigo-400 hover:bg-indigo-500 transition px-4 py-2 text-sm sm:text-base w-full sm:w-40 rounded-lg font-bold relative">
              Update User{" "}
              {isLoading && (
                <span className="absolute ml-2 w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
            </button>
          )}
        </form>
      </div>
    </>
  );
}
