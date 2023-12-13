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
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const numbers = /\d/;

function TrashedTransactions() {
  const { auth, flash } = usePage().props;
  const transactions = [...usePage().props.transactions].sort((a, b) =>
    a.start_time > b.start_time ? 1 : -1
  );

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const transactionFilter = debounce((query) => {
    setShowScanner(false);

    if (!query) return setFilteredTransactions(transactions);

    numbers.test(query)
      ? setFilteredTransactions(
          transactions.filter((transaction) => {
            return transaction.book.book_code
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase());
          })
        )
      : setFilteredTransactions(
          transactions.filter((transaction) => {
            return transaction.book.title
              .toLowerCase()
              .includes(query.toLowerCase());
          })
        );
  }, 500);

  useEffect(() => {
    if (!flash.destroy) return;
    if (transactions.length === filteredTransactions.length) return;

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

    setFilteredTransactions(transactions);
  }, [flash.destroy, transactions]);

  useEffect(() => {
    if (!flash.restore) return;
    if (transactions.length === filteredTransactions.length) return;

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

    setFilteredTransactions(transactions);
  }, [flash.restore, transactions]);

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
            / Transaksi
          </h2>
        }
      >
        <Head title="Transaksi" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
                <SearchBar
                  label="transaksi"
                  items={filteredTransactions}
                  setItems={setFilteredTransactions}
                  onChange={transactionFilter}
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
                  items={filteredTransactions}
                  itemName="Data Transaksi"
                  ItemsPage={TrashedTransactionsTable}
                >
                  Data transaksi
                </Pagination>
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

function TrashedTransactionsTable({ currentItems }) {
  const { delete: destroy, patch, processing } = useForm();

  function handleTransactionRestoration(e, id) {
    e.preventDefault();

    patch(route("trashed.transaction.restore", id), {
      preserveScroll: true,
    });
  }

  function handleTransactionDeletion(e, id) {
    e.preventDefault();

    destroy(route("trashed.transaction.destroy", id), {
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
            <th className="border px-2">Nama</th>
            <th className="border px-2">Mulai</th>
            <th className="border px-2">Kembalikan</th>
            <th className="border px-2">Hapus Permanen</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transaction, index) => (
            <tr key={transaction.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">
                {transaction.book.title}
              </td>
              <td className="border px-2 py-1 align-top text-center">
                {transaction.student.name}
              </td>
              <td className="border px-2 py-1 align-top">
                {new Date(transaction.start_time).toLocaleDateString(
                  "id-ID",
                  options
                )}
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton
                  onClick={(e) =>
                    handleTransactionRestoration(e, transaction.id)
                  }
                  disabled={processing}
                >
                  Pulihkan
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton
                  onClick={(e) => handleTransactionDeletion(e, transaction.id)}
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

export default TrashedTransactions;
