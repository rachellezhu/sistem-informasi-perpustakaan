import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import ListBox from "@/Components/ListBox";
import PrimaryButton from "@/Components/PrimaryButton";
import ShowSchoolClasses from "./partials/ShowSchoolClasses";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { items } from "@/ItemsAttributes/studentAttributes";

function SchoolClasses() {
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
            Kelas
          </h2>
        }
      >
        <Head title="Kelas" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                <div>
                  <Link href={route("schoolClass.create")}>
                    <PrimaryButton>Tambah Kelas</PrimaryButton>
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
                <ShowSchoolClasses />
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

export default SchoolClasses;
