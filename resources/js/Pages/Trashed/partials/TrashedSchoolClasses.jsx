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

function TrashedSchoolClasses() {
  const { auth, flash } = usePage().props;
  const schoolClasses = [...usePage().props.schoolClasses].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredSchoolClasses, setFilteredSchoolClasses] =
    useState(schoolClasses);

  const schoolClassFilter = debounce((query) => {
    if (!query) return setFilteredSchoolClasses(schoolClasses);

    setFilteredSchoolClasses(
      schoolClasses.filter((schoolClass) => {
        return schoolClass.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (schoolClasses.length === filteredSchoolClasses.length) return;

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

    setFilteredSchoolClasses(schoolClasses);
  }, [flash.destroy, schoolClasses]);

  useEffect(() => {
    if (!flash.restore) return;
    if (schoolClasses.length === filteredSchoolClasses.length) return;

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

    setFilteredSchoolClasses(schoolClasses);
  }, [flash.restore, schoolClasses]);

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
            / Kelas
          </h2>
        }
      >
        <Head title="Kelas" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="kelas"
                  items={filteredSchoolClasses}
                  setItems={setFilteredSchoolClasses}
                  onChange={schoolClassFilter}
                />

                <Pagination
                  items={filteredSchoolClasses}
                  itemName="Data Kelas"
                  ItemsPage={TrashedSchoolClassesTable}
                >
                  Data kelas
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedSchoolClassesTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleSchoolClassRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.schoolClass.restore", id), {
      preserveScroll: true,
    });
  }

  function handleSchoolClassDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.schoolClass.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Kelas</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((schoolClass, index) => (
            <tr key={schoolClass.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{schoolClass.name}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) =>
                    handleSchoolClassRestoration(e, schoolClass.id)
                  }
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleSchoolClassDeletion(e, schoolClass.id)}
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

export default TrashedSchoolClasses;
