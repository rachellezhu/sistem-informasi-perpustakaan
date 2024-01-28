import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function BooksTable({ currentItems }) {
  return (
    <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Judul</th>
          <th className="hidden sm:table-cell border px-2">Kode Buku</th>
          <th className="hidden lg:table-cell border px-2">Kategori</th>
          <th className="hidden sm:table-cell border px-2">Penulis</th>
          <th className="hidden md:table-cell border px-2">Penerbit</th>
          <th className="hidden md:table-cell border px-2">Tahun</th>
          <th className="hidden lg:table-cell border px-2">Jumlah</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((book, index) => (
          <tr
            key={book.id}
            className={`${book.deleted_at ? "bg-red-300 dark:bg-red-700" : ""}`}
          >
            <td className="border px-2 py-1 align-top">{index + 1}</td>
            <td className="border px-2 py-1 align-top">{book.title}</td>
            <td className="hidden sm:table-cell border px-2 py-1 align-top text-center">
              {book.book_code}
            </td>
            <td className="hidden lg:table-cell border px-2 py-1 align-top">
              {book.category.name}
            </td>
            <td className="hidden sm:table-cell border px-2 py-1 align-top">
              {book.author.name}
            </td>
            <td className="hidden md:table-cell border px-2 py-1 align-top">
              {book.publisher.name}
            </td>
            <td className="hidden md:table-cell border px-2 py-1 align-top text-center">
              {book.year_published}
            </td>
            <td className="hidden lg:table-cell border px-2 py-1 align-top text-end">
              {book.quantity}
            </td>
            <td className="border px-2 py-1 align-top text-center ">
              <Link
                href={book.deleted_at ? "" : route("book.edit", book.id)}
                disabled={book.deleted_at}
              >
                <PrimaryButton disabled={book.deleted_at}>Detail</PrimaryButton>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BooksTable;
