import Pagination from "@/Components/Pagination-v1";
import UsersTable from "./UsersTable";
import { usePage } from "@inertiajs/react";
import { lazy, useEffect, useState } from "react";
import { debounce } from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function ShowUsers() {
  const { flash } = usePage().props;
  const users = [...usePage().props.users].sort((a, b) =>
    a.username > b.username ? 1 : -1
  );
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (!flash.destroy) return;
    if (users.length === filteredUsers.length) return;

    toast.error(flash.destroy, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (!flash.message) return;
    if (users.length === filteredUsers.length) return;

    toast.success(flash.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (!flash.update) return;

    toast.info(flash.update, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [users]);

  const userFilter = debounce((query) => {
    if (!query) return setFilteredUsers(users);

    setFilteredUsers(
      users.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />

      <SearchBar
        label="staf"
        items={filteredUsers}
        setItems={setFilteredUsers}
        onChange={userFilter}
      />

      <Pagination
        items={filteredUsers}
        ItemsPage={UsersTable}
        itemName="Data Staf"
      >
        Data staf
      </Pagination>
    </>
  );
}

export default ShowUsers;
