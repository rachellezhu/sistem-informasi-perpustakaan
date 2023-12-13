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

function TrashedStudents() {
  const { auth, flash } = usePage().props;
  const students = [...usePage().props.students].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredStudents, setFilteredStudents] = useState(students);

  const studentFilter = debounce((query) => {
    if (!query) return setFilteredStudents(students);

    setFilteredStudents(
      students.filter((student) => {
        return student.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (students.length === filteredStudents.length) return;

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

    setFilteredStudents(students);
  }, [flash.destroy, students]);

  useEffect(() => {
    if (!flash.restore) return;
    if (students.length === filteredStudents.length) return;

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

    setFilteredStudents(students);
  }, [flash.restore, students]);

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
            / Siswa
          </h2>
        }
      >
        <Head title="Siswa" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="siswa"
                  items={filteredStudents}
                  setItems={setFilteredStudents}
                  onChange={studentFilter}
                />

                <Pagination
                  items={filteredStudents}
                  itemName="Data Siswa"
                  ItemsPage={TrashedStudentsTable}
                >
                  Data siswa
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedStudentsTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleStudentRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.student.restore", id), {
      preserveScroll: true,
    });
  }

  function handleStudentDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.student.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Siswa</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((student, index) => (
            <tr key={student.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{student.name}</td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handleStudentRestoration(e, student.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleStudentDeletion(e, student.id)}
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

export default TrashedStudents;
