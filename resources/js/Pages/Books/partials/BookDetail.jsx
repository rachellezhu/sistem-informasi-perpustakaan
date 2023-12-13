import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookScanModal from "./BookScanModal";
import DangerButton from "@/Components/DangerButton";
import DeletionModal from "@/Components/DeletionModal";
import DropdownInput from "@/Components/DropdownInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import TransactionsTable from "@/Pages/Transactions/partials/TransactionsTable";
import Pagination from "@/Components/Pagination-v1";

const numbers = /^[0-9\b]+$/;

function BookDetail() {
  const { auth, book, books, flash, isBeingBorrowed } = usePage().props;
  const authors = [...usePage().props.authors].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const categories = [...usePage().props.categories].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const publishers = [...usePage().props.publishers].sort((a, b) =>
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
    book_code: book.data.book_code || "",
    title: book.data.title || "",
    author: book.data.author.at(0).name || "",
    category: book.data.category.at(0).name || "",
    publisher: book.data.publisher.at(0).name || "",
    year_published: book.data.year_published || "",
    quantity: book.data.quantity || "",
    information: book.data.information || "",
  });
  const [showScanner, setShowScanner] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const isEmpty =
    data.book_code === "" ||
    data.title === "" ||
    data.author === "" ||
    data.category === "" ||
    data.publisher === "" ||
    data.year_published === "" ||
    data.quantity === "";
  const isExactlySame =
    data.book_code === book.data.book_code &&
    data.title === book.data.title &&
    data.author === book.data.author.at(0).name &&
    data.category === book.data.category.at(0).name &&
    data.publisher === book.data.publisher.at(0).name &&
    data.year_published === book.data.year_published &&
    data.quantity === book.data.quantity &&
    data.information === book.data.information;

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
  }, [book]);

  function handleBookCodeChange(e) {
    setData("book_code", e);

    books.some((item) => item.book_code === e && e !== book.data.book_code)
      ? setError("book_code", "Kode buku sudah terdaftar")
      : clearErrors("book_code");
  }

  function onNewScanResult(decodedText) {
    setShowScanner(false);
    handleBookCodeChange(decodedText);
  }

  function handleAuthorChange(e) {
    setData("author", e);
  }

  function handleCategoryChange(e) {
    setData("category", e);
  }

  function handlePublisherChange(e) {
    setData("publisher", e);
  }

  function handleYearPublishedChange(data) {
    if (data === "" || numbers.test(data)) setData("year_published", data);
  }

  function handleQuantityChange(data) {
    if (data === "" || numbers.test(data)) setData("quantity", data);
  }

  function submit(e) {
    e.preventDefault();

    patch(route("book.update", book.data.id), {
      preserveScroll: true,
    });
  }

  function handleBookDeletion(e) {
    e.preventDefault();

    destroy(route("book.destroy", book.data.id), {
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
            <Link href={route("book")}>
              <span className="text-gray-500 dark:text-gray-400">Buku</span>
            </Link>{" "}
            / Detail
          </h2>
        }
      >
        <Head title={data.title} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi buku
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat memperbarui informasi buku dengan mengubah form
                    di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="title" value="Judul" />

                    <TextInput
                      id="title"
                      className="mt-1 block w-full"
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.title} />
                  </div>

                  <div>
                    <InputLabel htmlFor="book_code" value="Kode Buku" />

                    <TextInput
                      id="book_code"
                      className="mt-1 block w-full"
                      value={data.book_code}
                      onChange={(e) => handleBookCodeChange(e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.book_code} />

                    <SecondaryButton
                      className="mt-2"
                      onClick={() => setShowScanner(true)}
                    >
                      Scan barcode
                    </SecondaryButton>
                  </div>

                  <div>
                    <InputLabel htmlFor="category" value="Kategori" />

                    <DropdownInput
                      id="category"
                      items={categories.map((category) => category.name)}
                      selectedItem={data.category}
                      setSelectedItem={handleCategoryChange}
                      className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.category} />
                  </div>

                  <div>
                    <InputLabel htmlFor="author" value="Penulis" />

                    <DropdownInput
                      id="author"
                      items={authors.map((author) => author.name)}
                      selectedItem={data.author}
                      setSelectedItem={handleAuthorChange}
                      className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.author} />
                  </div>

                  <div>
                    <InputLabel htmlFor="publisher" value="Penerbit" />

                    <DropdownInput
                      id="publisher"
                      items={publishers.map((publisher) => publisher.name)}
                      selectedItem={data.publisher}
                      setSelectedItem={handlePublisherChange}
                      className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.publisher} />
                  </div>

                  <div>
                    <InputLabel htmlFor="year_published" value="Tahun Terbit" />

                    <TextInput
                      id="year_published"
                      className="mt-1 block w-full"
                      value={data.year_published}
                      onChange={(e) =>
                        handleYearPublishedChange(e.target.value)
                      }
                      pattern="[0-9]{4}"
                      inputMode="numeric"
                      required
                    />

                    <InputError
                      className="mt-2"
                      message={errors.year_published}
                    />
                  </div>

                  <div>
                    <InputLabel htmlFor="quantity" value="Jumlah Buku" />

                    <TextInput
                      id="quantity"
                      className="mt-1 block w-full"
                      value={data.quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      pattern="[0-9]"
                      inputMode="numeric"
                      required
                    />

                    <InputError className="mt-2" message={errors.quantity} />
                  </div>

                  <div>
                    <InputLabel htmlFor="stock" value="Ketersediaan" />

                    <TextInput
                      id="stock"
                      className="mt-1 block w-full"
                      value={`${book.data.quantity - isBeingBorrowed} / ${
                        book.data.quantity
                      }`}
                      disabled
                    />

                    <InputError
                      className="mt-2"
                      message={errors.isBeingBorrowed}
                    />
                  </div>

                  <div>
                    <InputLabel htmlFor="information" value="Keterangan" />

                    <TextInput
                      id="information"
                      className="mt-1 block w-full"
                      value={data.information}
                      onChange={(e) => setData("information", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.information} />
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
                      ? `Berikut adalah daftar riwayat peminjaman ${book.data.title}`
                      : `Buku ini belum pernah dipinjam`}
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
                    Hapus buku
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Jika tidak terdapat riwayat transaksi pada buku ini, Anda
                    dapat menghapus buku ini dengan menekan tombol hapus di
                    bawah
                  </p>
                </header>

                <DangerButton
                  disabled={transactions.length > 0 || processing}
                  onClick={() => setShowDeletionModal(true)}
                >
                  Hapus
                </DangerButton>
              </section>
            </div>
          </div>
        </div>

        <BookScanModal
          show={showScanner}
          onNewScanResult={onNewScanResult}
          onClick={() => setShowScanner(false)}
        />
        <DeletionModal
          show={showDeletionModal}
          name={data.title}
          setShow={() => setShowDeletionModal(false)}
          onClick={handleBookDeletion}
          processing={processing}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default BookDetail;
