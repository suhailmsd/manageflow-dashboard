import { useContext, useEffect, useState } from "react";
import UserTable from "./UserTable";
import { UserContext, UsersListContext } from "../../../../contexts";
import Pagination from "./Pagination";

export default function ViewUsers() {
  const { userDetails } = useContext(UserContext);
  const { usersList } = useContext(UsersListContext);

  const [tableFilterForm, setTableFilterForm] = useState({
    filterByUsername: "",
    filterByDepartment: "",
    filterByRole: "",
    filterByStatus: "",
  });

  const [currentUserPage, setCurrentUserPage] = useState(1);

  function handleFilterOnChange(event) {
    const { name, value } = event.target;

    setTableFilterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const newUsersList = usersList?.filter((user) => {
    if (user.userId === userDetails.userId) return false;
    if (user.role === "owner") return false;

    const matchesUsername =
      !tableFilterForm.filterByUsername ||
      user.username
        .toLowerCase()
        .includes(tableFilterForm.filterByUsername.toLowerCase());

    const matchesDepartment =
      !tableFilterForm.filterByDepartment ||
      user.department.includes(tableFilterForm.filterByDepartment);

    const matchesRole =
      !tableFilterForm.filterByRole ||
      user.role.includes(tableFilterForm.filterByRole);

    const matchesStatus =
      !tableFilterForm.filterByStatus ||
      user.status.includes(tableFilterForm.filterByStatus);

    return matchesUsername && matchesDepartment && matchesRole && matchesStatus;
  });

  let usersPerPage = 5;

  let startIndex = (currentUserPage - 1) * usersPerPage;
  let lastIndex = startIndex + usersPerPage;

  let currentUsers = newUsersList?.slice(startIndex, lastIndex);

  const totalPages = Math.ceil(newUsersList?.length / usersPerPage);

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentUserPage(1);
    } else if (currentUserPage > totalPages) {
      setCurrentUserPage(totalPages);
    }
  }, [currentUserPage, totalPages]);

  return (
    <div className="p-2 w-[70%] mx-auto max-[700px]:p-1 max-[500px]:p-2 max-[500px]:mx-0 max-[500px]:w-full">
      <div className="flex flex-col items-center w-full">
        <UserTable
          currentUsers={currentUsers}
          filterByInputForm={tableFilterForm}
          filterByChangeEvent={handleFilterOnChange}
        />

        <Pagination
          totalUsers={newUsersList?.length}
          usersPerPage={usersPerPage}
          setCurrentUserPage={setCurrentUserPage}
          currentUserPage={currentUserPage}
        />
      </div>
    </div>
  );
}
