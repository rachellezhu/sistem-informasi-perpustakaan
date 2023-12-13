import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import { lazy, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookScanModal from "../../Books/partials/BookScanModal";
import Pagination from "@/Components/Pagination-v1";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

const numbers = /\d/;

function TrashedBooks() {
  const { auth, flash } = usePage().props;
  const books = [...usePage().props.books].sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const bookFilter = debounce((query) => {
    setShowScanner(false);

    if (!query) return setFilteredBooks(books);

    numbers.test(query)
      ? setFilteredBooks(
          books.filter((book) => {
            return book.book_code
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase());
          })
        )
      : setFilteredBooks(
          books.filter((book) => {
            return book.title.toLowerCase().includes(query.toLowerCase());
          })
        );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (books.length === filteredBooks.length) return;

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

    setFilteredBooks(books);
  }, [flash.destroy, books]);

  useEffect(() => {
    if (!flash.restore) return;
    if (books.length === filteredBooks.length) return;

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

    setFilteredBooks(books);
  }, [flash.restore, books]);

  function onNewScanResult(decodedText) {
    setScanResult(decodedText);
    setShowScanner(false);
    bookFilter(decodedText);
  }

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
            / Buku
          </h2>
        }
      >
        <Head title="Buku" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="buku"
                  items={filteredBooks}
                  setItems={setFilteredBooks}
                  onChange={bookFilter}
                  scanResult={scanResult}
                >
                  <SecondaryButton
                    className="ml-2 h-10 slef-end"
                    onClick={() => setShowScanner(true)}
                  >
                    Scan barcode
                  </SecondaryButton>
                </SearchBar>

                <BookScanModal
                  show={showScanner}
                  onNewScanResult={onNewScanResult}
                  onClick={() => setShowScanner(false)}
                />

                <Pagination
                  items={filteredBooks}
                  itemName="Data Buku"
                  ItemsPage={TrashedBooksTable}
                >
                  Data buku
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedBooksTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleBookRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.book.restore", id), {
      preserveScroll: true,
    });
  }

  function handleBookDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.book.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Judul</th>
            <th className="border px-2">Kode Buku</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((book, index) => (
            <tr key={book.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{book.title}</td>
              <td className="border px-2 py-1 align-top text-center">
                {book.book_code}
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) => handleBookRestoration(e, book.id)}
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleBookDeletion(e, book.id)}
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

export default TrashedBooks;
