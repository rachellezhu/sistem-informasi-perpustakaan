import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import DeletionModal from "@/Components/DeletionModal";
import DropdownInput from "@/Components/DropdownInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination-v1";
import TransactionsTable from "@/Pages/Transactions/partials/TransactionsTable";

function StudentDetail() {
  const { auth, student, students, flash } = usePage().props;
  const schoolClasses = [...usePage().props.schoolClasses].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const transactions = [...usePage().props.transactions].sort((a, b) =>
    a.start_time < b.start_time ? 1 : -1
  );
  const {
    data,
    setData,
    errors,
    setError,
    clearErrors,
    delete: destroy,
    patch,
    processing,
    recentlySuccessful,
  } = useForm({
    name: student.data.name || "",
    card_number: student.data.card_number || "",
    schoolClass: student.data.schoolClass.at(0).name || "",
  });
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const isExactlySame =
    data.name === student.data.name &&
    data.card_number === student.data.card_number &&
    data.schoolClass === student.data.schoolClass.at(0).name;
  const isEmpty =
    data.name === "" || data.card_number === "" || data.schoolClass === "";

  useEffect(() => {
    if (!flash.update) return;

    toast.info(flash.update, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [student]);

  function handleCardNumberChange(e) {
    setData("card_number", e);

    students.some(
      (item) => item.card_number === e && e !== student.data.card_number
    )
      ? setError("card_number", "ID siswa sudah terdaftar")
      : clearErrors("card_number");
  }

  function handleSchoolClassChange(e) {
    setData("schoolClass", e);
  }

  function submit(e) {
    e.preventDefault();

    patch(route("student.update", student.data.id), {
      preserveScroll: true,
    });
  }

  function handleStudentDeletion(e) {
    e.preventDefault();

    destroy(route("student.destroy", student.data.id), {
      onSuccess: () => setShowDeletionModal(false),
    });
  }

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <Link href={route("student")}>
              <span className="text-gray-400">Siswa</span>
            </Link>{" "}
            / Detail
          </h2>
        }
      >
        <Head title={data.name} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi siswa
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat memperbarui data siswa dengan mengisi form di
                    bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Siswa" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div>
                    <InputLabel htmlFor="card_number" value="ID Siswa" />

                    <TextInput
                      id="card_number"
                      className="mt-1 block w-full"
                      value={data.card_number}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.card_number} />
                  </div>

                  <div>
                    <InputLabel htmlFor="schoolClass" value="Kelas" />

                    <DropdownInput
                      id="schoolClass"
                      items={schoolClasses.map(
                        (schoolClass) => schoolClass.name
                      )}
                      selectedItem={data.schoolClass}
                      setSelectedItem={handleSchoolClassChange}
                      className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.schoolClass} />
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <Transition
                      show={recentlySuccessful}
                      enter="transition ease-in-out"
                      enterFrom="opacity-0"
                      leave="transition ease-in-out"
                      leaveTo="opacity-0"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {flash.update}.
                      </p>
                    </Transition>

                    <PrimaryButton
                      disabled={
                        processing ||
                        isExactlySame ||
                        isEmpty ||
                        Object.values(errors).length
                      }
                    >
                      Simpan
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            </div>

            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="w-auto space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Riwayat peminjaman
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {transactions.length !== 0
                      ? `Berikut adalah daftar riwayat peminjaman ${student.data.name}`
                      : `Siswa ini belum pernah meminjam buku`}
                  </p>
                </header>

                <div className="w-full items-center text-gray-900 dark:text-gray-100">
                  {transactions.length > 0 && (
                    <Pagination
                      items={transactions}
                      itemName="Data Peminjaman"
                      ItemsPage={TransactionsTable}
                    >
                      Data peminjaman
                    </Pagination>
                  )}
                </div>
              </section>
            </div>

            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Hapus siswa
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menghapus data siswa dengan menekan tombol hapus
                    di bawah
                  </p>
                </header>

                <DangerButton
                  disabled={processing}
                  onClick={() => setShowDeletionModal(true)}
                >
                  Hapus
                </DangerButton>
              </section>
            </div>
          </div>
        </div>
        <DeletionModal
          show={showDeletionModal}
          name={data.name}
          setShow={() => setShowDeletionModal(false)}
          onClick={handleStudentDeletion}
          processing={processing}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default StudentDetail;
