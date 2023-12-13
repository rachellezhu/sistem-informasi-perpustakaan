import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookScanModal from "./BookScanModal";
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

const numbers = /^[0-9\b]+$/;

function AddBook() {
  const { auth, books, flash } = usePage().props;
  const authors = [...usePage().props.authors].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const categories = [...usePage().props.categories].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const publishers = [...usePage().props.publishers].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const {
    data,
    setData,
    post,
    errors,
    setError,
    clearErrors,
    processing,
    reset,
    recentlySuccessful,
  } = useForm({
    book_code: "",
    title: "",
    author: "",
    category: "",
    publisher: "",
    year_published: "",
    quantity: "",
    information: "",
  });
  const [showScanner, setShowScanner] = useState(false);
  const isEmpty =
    data.book_code === "" ||
    data.title === "" ||
    data.author === "" ||
    data.category === "" ||
    data.publisher === "" ||
    data.year_published === "" ||
    data.quantity === "";

  useEffect(() => {
    if (!flash.store) return;

    toast.success(flash.store, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [flash.store]);

  function handleBookCodeChange(data) {
    setData("book_code", data);

    books.some((item) => item.book_code === data)
      ? setError("book_code", "Kode buku sudah terdaftar")
      : clearErrors("book_code");
  }

  function onNewScanResult(decodedText) {
    setShowScanner(false);
    handleBookCodeChange(decodedText);
  }

  function handleAuthorChange(data) {
    setData("author", data);
  }

  function handleCategoryChange(data) {
    setData("category", data);
  }

  function handlePublisherChange(data) {
    setData("publisher", data);
  }

  function handleYearPublishedChange(data) {
    if (data === "" || numbers.test(data)) setData("year_published", data);
  }

  function handleQuantityChange(data) {
    if (data === "" || numbers.test(data)) setData("quantity", data);
  }

  function submit(e) {
    e.preventDefault();

    post(route("book.store"), {
      preserveScroll: true,
      onSuccess: () => reset(),
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
            / Tambah Buku
          </h2>
        }
      >
        <Head title="Tambah Buku" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Tambah buku
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menambahkan data buku dengan mengisi form di
                    bawah
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
                        {flash.store}.
                      </p>
                    </Transition>

                    <PrimaryButton
                      disabled={
                        processing || isEmpty || Object.values(errors).length
                      }
                    >
                      Simpan
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
        <BookScanModal
          show={showScanner}
          onNewScanResult={onNewScanResult}
          onClick={() => setShowScanner(false)}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default AddBook;
