import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ShowTransactions from "./partials/ShowTransactions";
import PrimaryButton from "@/Components/PrimaryButton";
import { items } from "@/ItemsAttributes/transactionAttributes";
import ListBox from "@/Components/ListBox";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReactPdf from "@/Pages/ReactPdf/ReactPdf";

function Transactions() {
  const {
    auth,
    currYear,
    flash,
    lastMonth,
    late,
    lateStudents,
    popularBook,
    transactions,
  } = usePage().props;
  const displayedItem = new URLSearchParams(window.location.search).get(
    "filter"
  )
    ? items
        .filter((item) => {
          return item.route
            .toString()
            .toLowerCase()
            .includes(
              new URLSearchParams(window.location.search)
                .get("filter")
                .toLowerCase()
            );
        })
        .at(0)
    : items.at(0);
  const [item, setItem] = useState(displayedItem.name);
  const filteredLateStudents = lateStudents.filter((student) => {
    return student.transactions.length > 0;
  });

  useEffect(() => {
    if (flash.destroy) {
      toast.error(flash.destroy, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
  }, [transactions]);

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Transaksi
            </h2>
            <PDFDownloadLink
              document={
                <ReactPdf
                  currYear={currYear}
                  lastMonth={lastMonth}
                  late={late}
                  popularBook={popularBook}
                  transactions={filteredLateStudents}
                />
              }
              fileName="Laporan Transaksi Peminjaman Buku 2023-2024"
            >
              <PrimaryButton>Cetak</PrimaryButton>
            </PDFDownloadLink>
          </div>
        }
      >
        <Head title="Transaksi" />

        <section className="pt-12 pb-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
                <div>
                  <Link href={route("transaction.create")}>
                    <PrimaryButton>Pinjam Buku</PrimaryButton>
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
                <ShowTransactions />
              </div>
            </div>
          </div>
        </section>
      </AuthenticatedLayout>
    </>
  );
}

export default Transactions;
