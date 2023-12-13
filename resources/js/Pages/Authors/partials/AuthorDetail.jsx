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

function AuthorDetail() {
  const { auth, author, authors, flash } = usePage().props;
  const books = [...author.data.books].sort((a, b) =>
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
  } = useForm({ name: author.data.name || "" });
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  const isExactlySame = data.name === author.data.name;

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
  }, [author]);

  function handleAuthorChange(e) {
    setData("name", e);

    authors.some((item) => item.name === e && author.data.name !== e)
      ? setError("name", "Penulis ini sudah terdaftar")
      : clearErrors("name");
  }

  function submit(e) {
    e.preventDefault();

    patch(route("author.update", author.data.id), {
      preserveScroll: true,
    });
  }

  function handleAuthorDeletion(e) {
    e.preventDefault();

    destroy(route("author.destroy", author.data.id), {
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
            <Link href={route("author")}>
              <span className="text-gray-500 dark:text-gray-400">Penulis</span>
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
                    Informasi penulis
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat memperbarui informasi penulis dengan mengubah
                    form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Penulis" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => handleAuthorChange(e.target.value)}
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
                      ? `Berikut adalah daftar buku yang ditulis oleh ${author.data.name}`
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
                    Hapus penulis
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Jika penulis tidak memiliki koleksi buku, Anda dapat
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
          name={author.data.name}
          setShow={() => setShowDeletionModal(false)}
          onClick={handleAuthorDeletion}
          processing={processing}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default AuthorDetail;
