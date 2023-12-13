import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import ListBox from "@/Components/ListBox";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import ShowCategories from "./partials/ShowCategories";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

const items = [
  { name: "Buku", route: "book" },
  { name: "Kategori", route: "category" },
  { name: "Penulis", route: "author" },
  { name: "Penerbit", route: "publisher" },
];

function Categories() {
  const { auth, flash } = usePage().props;
  const [item, setItem] = useState(items[1].name);

  useEffect(() => {
    if (!flash.destroy) return;

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
  }, [flash.destroy]);

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Kategori
          </h2>
        }
      >
        <Head title="Kategori" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                <div>
                  <Link href={route("category.create")}>
                    <PrimaryButton>Tambah Kategori</PrimaryButton>
                  </Link>
                </div>

                <div>
                  <ListBox
                    items={items}
                    selectedItem={item}
                    setSelectedItem={setItem}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <ShowCategories />
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

export default Categories;