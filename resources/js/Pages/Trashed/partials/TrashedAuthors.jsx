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

function TrashedAuthors() {
  const { auth, flash } = usePage().props;
  const authors = [...usePage().props.authors].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  const authorFilter = debounce((query) => {
    if (!query) return setFilteredAuthors(authors);

    setFilteredAuthors(
      authors.filter((author) => {
        return author.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (authors.length === filteredAuthors.length) return;

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

    setFilteredAuthors(authors);
  }, [flash.destroy, authors]);

  useEffect(() => {
    if (!flash.restore) return;
    if (authors.length === filteredAuthors.length) return;

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

    setFilteredAuthors(authors);
  }, [flash.restore, authors]);

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
            / Penulis
          </h2>
        }
      >
        <Head title="Penulis" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="penulis"
                  items={filteredAuthors}
                  setItems={setFilteredAuthors}
                  onChange={authorFilter}
                />

                <Pagination
                  items={filteredAuthors}
                  itemName="Data Penulis"
                  ItemsPage={TrashedAuthorsTable}
                >
                  Data penulis
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedAuthorsTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleAuthorRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.author.restore", id), {
      preserveScroll: true,
    });
  }

  function handleAuthorDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.author.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Penulis</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((author, index) => (
            <tr key={author.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{author.name}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handleAuthorRestoration(e, author.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleAuthorDeletion(e, author.id)}
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

export default TrashedAuthors;
