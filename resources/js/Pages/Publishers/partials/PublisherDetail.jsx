import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BooksTable from "@/Pages/Books/partials/BooksTable";
import DangerButton from "@/Components/DangerButton";
import DeletionModal from "@/Components/DeletionModal";
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

function PublisherDetail() {
  const { auth, flash, publisher, publishers } = usePage().props;
  const books = [...publisher.data.books].sort((a, b) =>
    a.title > b.title ? 1 : -1
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
  } = useForm({ name: publisher.data.name || "" });
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  const isExactlySame = data.name === publisher.data.name;

  useEffect(() => {
    if (!flash.update) return;

    toast.info(flash.update, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [publisher]);

  function handlePublisherChange(e) {
    setData("name", e);

    publishers.some((item) => item.name === e && publisher.data.name !== e)
      ? setError("name", "Penerbit ini telah terdaftar")
      : clearErrors("name");
  }

  function submit(e) {
    e.preventDefault();

    patch(route("publisher.update", publisher.data.id), {
      preserveScroll: true,
    });
  }

  function handlePublisherDeletion(e) {
    e.preventDefault();

    destroy(route("publisher.destroy", publisher.data.id), {
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
            <Link href={route("publisher")}>
              <span className="text-gray-500 dark:text-gray-400">Penerbit</span>
            </Link>{" "}
            / Detail
          </h2>
        }
      >
        <Head title={data.name} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi penerbit
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat memperbarui informasi penerbit dengan mengubah
                    form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Penerbit" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => handlePublisherChange(e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.name} />
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
                        errors.name ||
                        data.name === ""
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
                    Daftar buku
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {books.length !== 0
                      ? `Berikut adalah daftar buku yang diterbitkan oleh ${publisher.data.name}`
                      : `Koleksi buku tidak ditemukan`}
                  </p>
                </header>

                <div className="w-full items-center text-gray-900 dark:text-gray-100">
                  {books.length > 0 && (
                    <Pagination
                      items={books}
                      itemName="Data Buku"
                      ItemsPage={BooksTable}
                    >
                      Koleksi buku
                    </Pagination>
                  )}
                </div>
              </section>
            </div>

            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Hapus penerbit
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Jika penerbit tidak memiliki koleksi buku, Anda dapat
                    menghapusnya dengan menekan tombol hapus di bawah
                  </p>
                </header>

                <DangerButton
                  disabled={books.length > 0 || processing}
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
          name={publisher.data.name}
          setShow={() => setShowDeletionModal(false)}
          onClick={handlePublisherDeletion}
          processing={processing}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default PublisherDetail;
