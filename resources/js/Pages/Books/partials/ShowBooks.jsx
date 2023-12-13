import BookScanModal from "./BookScanModal";
import BooksTable from "./BooksTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import SecondaryButton from "@/Components/SecondaryButton";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

const numbers = /\d/;

function ShowBooks() {
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

  function onNewScanResult(decodedText) {
    setScanResult(decodedText);
    setShowScanner(false);
    bookFilter(decodedText);
  }

  return (
    <>
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
        ItemsPage={BooksTable}
      >
        Data buku
      </Pagination>
    </>
  );
}

export default ShowBooks;
