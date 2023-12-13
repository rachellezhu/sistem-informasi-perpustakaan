import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
import ScannerModal from "@/Components/ScannerModal";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function AddTransaction() {
  const { auth, flash, settings, transactions } = usePage().props;
  const books = [...usePage().props.books].sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  const students = [...usePage().props.students].sort((a, b) =>
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
    name: "",
    card_number: "",
    title: "",
    book_code: "",
  });
  const start = new Date().toLocaleDateString("id-ID", options);
  const date = new Date();
  const end = new Date(
    date.setDate(date.getDate() + settings.day)
  ).toLocaleDateString("id-ID", options);
  const [showScanner, setShowScanner] = useState(false);
  const isInputError =
    errors.name || errors.card_number || errors.title || errors.book_code;
  const isEmpty =
    data.name === "" ||
    data.card_number === "" ||
    data.title === "" ||
    data.book_code === "";

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
  }, [transactions]);

  function handleNameChange(e) {
    setData("name", e);
    const splitData = e.split(" - ");
    const name = splitData.at(0).toLowerCase();
    const card_number = splitData.at(2) || "";

    if (e === "") {
      clearErrors("name", "card_number");
      setData({ ...data, name: "", card_number: "" });
    } else if (
      students.some((student) => student.name.toLowerCase() === name)
    ) {
      clearErrors("name", "card_number");
      setData({
        ...data,
        name: e,
        card_number:
          students
            .filter((student) => student.card_number === card_number)
            ?.at(0)?.card_number || "",
      });
    } else {
      setError({ ...errors, name: "Siswa tidak terdaftar" });
    }
  }

  function handleCardNumberChange(e) {
    setData("card_number", e);
    const filteredStudent = students
      .filter(
        (student) => student.card_number.toLowerCase() === e.toLowerCase()
      )
      ?.at(0);

    if (e === "") {
      clearErrors("card_number", "name");
      setData({ ...data, card_number: "", name: "" });
    } else if (
      students.some(
        (student) => student.card_number.toLowerCase() === e.toLowerCase()
      )
    ) {
      clearErrors("card_number", "name");
      setData({
        ...data,
        card_number: e,
        name: `${filteredStudent.name} - ${filteredStudent.school_class.name}`,
      });
    } else {
      setError({ ...errors, card_number: "ID siswa tidak ditemukan" });
    }
  }

  function handleBookCodeChange(e) {
    setData("book_code", e);
    if (e === "") {
      clearErrors("book_code", "title");
      setData({ ...data, book_code: "", title: "" });
    } else if (
      books.some((item) => item.book_code.toLowerCase() === e.toLowerCase())
    ) {
      clearErrors("book_code", "title");
      setData({
        ...data,
        book_code: e,
        title: books
          .filter((book) => book.book_code.toLowerCase() === e.toLowerCase())
          .at(0).title,
      });
    } else {
      setError("book_code", "Kode buku tidak terdaftar");
    }
  }

  function handleTitleChange(e) {
    setData("title", e);

    if (e === "") {
      clearErrors("title", "book_code");
      setData({ ...data, title: "", book_code: "" });
    } else if (
      books.some((item) => item.title.toLowerCase() === e.toLowerCase())
    ) {
      clearErrors("title", "book_code");
      setData({
        ...data,
        title: e,
        book_code: books
          .filter((book) => book.title.toLowerCase() === e.toLowerCase())
          ?.at(0)?.book_code,
      });
    } else {
      setError("title", "Judul buku tidak terdaftar");
    }
  }

  function onNewScanResult(decodedText) {
    setShowScanner(false);
    handleBookCodeChange(decodedText);
  }

  function submit(e) {
    e.preventDefault();

    post(route("transaction.store"), {
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
            <Link href={route("transaction")}>
              <span className="text-gray-500 dark:text-gray-400">
                Transaksi
              </span>
            </Link>{" "}
            / Pinjam Buku
          </h2>
        }
      >
        <Head title="Pinjam Buku" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Pinjam buku
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menambahkan data transaksi peminjaman buku dengan
                    mengisi form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Siswa" />

                    <DropdownInput
                      id="title"
                      className="mt-1 block w-full"
                      items={students.map(
                        (student) =>
                          `${student.name} - ${student.school_class.name} - ${student.card_number}`
                      )}
                      selectedItem={data.name}
                      setSelectedItem={handleNameChange}
                      required
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div>
                    <InputLabel htmlFor="card_number" value="Nomor ID" />

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
                    <InputLabel htmlFor="title" value="Judul" />

                    <DropdownInput
                      id="title"
                      className="mt-1 block w-full"
                      items={books.map((book) => book.title)}
                      selectedItem={data.title}
                      setSelectedItem={handleTitleChange}
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
                    <InputLabel htmlFor="start_time" value="Mulai Meminjam" />

                    <TextInput
                      id="start_time"
                      className="mt-1 block w-full"
                      value={start}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.start_time} />
                  </div>

                  <div>
                    <InputLabel htmlFor="end_time" value="Selesai Meminjam" />

                    <TextInput
                      id="end_time"
                      className="mt-1 block w-full"
                      value={end}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.end_time} />
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
                      disabled={processing || isEmpty || isInputError}
                    >
                      Simpan
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
        <ScannerModal
          show={showScanner}
          onNewScanResult={onNewScanResult}
          onClick={() => setShowScanner(false)}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default AddTransaction;
