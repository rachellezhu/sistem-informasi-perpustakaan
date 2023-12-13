import TransactionsTable from "./TransactionsTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import SecondaryButton from "@/Components/SecondaryButton";
import ScannerModal from "@/Components/ScannerModal";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

const numbers = /\d/;

function ShowTransactions() {
  const transactions = [...usePage().props.transactions].sort((a, b) =>
    a.start_time < b.start_time ? 1 : -1
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

  function onNewScanResult(decodedText) {
    setScanResult(decodedText);
    setShowScanner(false);
    transactionFilter(decodedText);
  }

  return (
    <>
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

      <ScannerModal
        show={showScanner}
        onNewScanResult={onNewScanResult}
        onClick={() => setShowScanner(false)}
      />

      <Pagination
        items={filteredTransactions}
        itemName="Data Transaksi"
        ItemsPage={TransactionsTable}
      >
        Data transaksi
      </Pagination>
    </>
  );
}

export default ShowTransactions;
