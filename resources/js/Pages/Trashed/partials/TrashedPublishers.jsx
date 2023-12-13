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

function TrashedPublishers() {
  const { auth, flash } = usePage().props;
  const publishers = [...usePage().props.publishers].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredPublishers, setFilteredPublishers] = useState(publishers);

  const publisherFilter = debounce((query) => {
    if (!query) return setFilteredPublishers(publishers);

    setFilteredPublishers(
      publishers.filter((publisher) => {
        return publisher.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (publishers.length === filteredPublishers.length) return;

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

    setFilteredPublishers(publishers);
  }, [flash.destroy, publishers]);

  useEffect(() => {
    if (!flash.restore) return;
    if (publishers.length === filteredPublishers.length) return;

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

    setFilteredPublishers(publishers);
  }, [flash.restore, publishers]);

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
            / Penerbit
          </h2>
        }
      >
        <Head title="Penerbit" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="penerbit"
                  items={filteredPublishers}
                  setItems={setFilteredPublishers}
                  onChange={publisherFilter}
                />

                <Pagination
                  items={filteredPublishers}
                  itemName="Data Penerbit"
                  ItemsPage={TrashedPublishersTable}
                >
                  Data penerbit
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedPublishersTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handlePublisherRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.publisher.restore", id), {
      preserveScroll: true,
    });
  }

  function handlePublisherDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.publisher.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Penerbit</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((publisher, index) => (
            <tr key={publisher.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{publisher.name}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handlePublisherRestoration(e, publisher.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handlePublisherDeletion(e, publisher.id)}
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

export default TrashedPublishers;
