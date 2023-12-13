import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import { lazy, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@/Components/Pagination-v1";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function TrashedUsers() {
  const { auth, flash } = usePage().props;
  const users = [...usePage().props.users].sort((a, b) =>
    a.username > b.username ? 1 : -1
  );
  const [filteredUsers, setFilteredUsers] = useState(users);

  const userFilter = debounce((query) => {
    if (!query) return setFilteredUsers(users);

    setFilteredUsers(
      users.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (users.length === filteredUsers.length) return;

    if (flash.destroy) {
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
    }

    setFilteredUsers(users);
  }, [flash.destroy, users]);

  useEffect(() => {
    if (!flash.restore) return;
    if (users.length === filteredUsers.length) return;

    toast.success(flash.restore, {
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
  }, [flash.restore, users]);

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <Link href={route("trashed")}>
              <span className="text-gray-500 dark:text-gray-400">Sampah</span>
            </Link>{" "}
            / Pengguna
          </h2>
        }
      >
        <Head title="Pengguna" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="pengguna"
                  items={filteredUsers}
                  setItems={setFilteredUsers}
                  onChange={userFilter}
                />

                <Pagination
                  items={filteredUsers}
                  itemName="Data Pengguna"
                  ItemsPage={TrashedUsersTable}
                >
                  Data pengguna
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedUsersTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleUserRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.user.restore", id), {
      preserveScroll: true,
    });
  }

  function handleUserDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.user.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Pengguna</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{user.username}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handleUserRestoration(e, user.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleUserDeletion(e, user.id)}
                  disabled={processing}
                >
                  Hapus
                </DangerButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrashedUsers;
