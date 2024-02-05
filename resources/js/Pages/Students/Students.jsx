import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import ListBox from "@/Components/ListBox";
import PrimaryButton from "@/Components/PrimaryButton";
import ShowStudents from "./partials/ShowStudents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { items } from "@/ItemsAttributes/studentAttributes";

function Students() {
  const { auth, flash } = usePage().props;
  const [item, setItem] = useState(items[0].name);

  useEffect(() => {
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
  }, [flash.destroy]);

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Siswa
          </h2>
        }
      >
        <Head title="Siswa" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                <div>
                  <Link href={route("student.create")}>
                    <PrimaryButton>Tambah Siswa</PrimaryButton>
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
                <ShowStudents />
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

export default Students;
