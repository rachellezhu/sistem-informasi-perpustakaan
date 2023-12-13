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

function TrashedCategories() {
  const { auth, flash } = usePage().props;
  const categories = [...usePage().props.categories].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const categoryFilter = debounce((query) => {
    if (!query) return setFilteredCategories(categories);

    setFilteredCategories(
      categories.filter((category) => {
        return category.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (categories.length === filteredCategories.length) return;

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

    setFilteredCategories(categories);
  }, [flash.destroy, categories]);

  useEffect(() => {
    if (!flash.restore) return;
    if (categories.length === filteredCategories.length) return;

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

    setFilteredCategories(categories);
  }, [flash.restore, categories]);

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
            / Kategori
          </h2>
        }
      >
        <Head title="Kategori" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="kategori"
                  items={filteredCategories}
                  setItems={setFilteredCategories}
                  onChange={categoryFilter}
                />

                <Pagination
                  items={filteredCategories}
                  itemName="Data Kategori"
                  ItemsPage={TrashedCategoriesTable}
                >
                  Data kategori
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedCategoriesTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleCategoryRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.category.restore", id), {
      preserveScroll: true,
    });
  }

  function handleCategoryDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.category.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Kategori</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category, index) => (
            <tr key={category.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{category.name}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handleCategoryRestoration(e, category.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleCategoryDeletion(e, category.id)}
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

export default TrashedCategories;
