import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function TransactionsTable({ currentItems }) {
  return (
    <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Nama Siswa</th>
          <th className="hidden sm:table-cell border px-2">Judul Buku</th>
          <th className="hidden md:table-cell border px-2">Mulai</th>
          <th className="hidden md:table-cell border px-2">Selasai</th>
          <th className="hidden sm:table-cell border px-2">Dikembalikan</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((transaction, index) => (
          <tr
            key={transaction.id}
            className={`${
              new Date(transaction.end_time) < new Date() &&
              transaction.return_time === null
                ? "bg-red-300 dark:bg-red-700"
                : ""
            }`}
          >
            <td className="border px-2 py-1 align-top">{index + 1}</td>
            <td className="border px-2 py-1 align-top">
              {transaction.student.name}
            </td>
            <td className="hidden sm:table-cell border px-2 py-1 align-top">
              {transaction.book.title}
            </td>
            <td className="hidden md:table-cell border px-2 py-1 align-top">
              {new Date(transaction.start_time).toLocaleDateString(
                "id-ID",
                options
              )}
            </td>
            <td className="hidden md:table-cell border px-2 py-1 align-top">
              {new Date(transaction.end_time).toLocaleDateString(
                "id-ID",
                options
              )}
            </td>
            <td className="hidden sm:table-cell border px-2 py-1 align-top">
              {transaction.return_time
                ? new Date(transaction.return_time).toLocaleDateString(
                    "id-ID",
                    options
                  )
                : "Belum"}
            </td>
            <td className="border px-2 py-1 align-top text-center">
              <Link href={route("transaction.edit", transaction.id)}>
                <PrimaryButton>Detail</PrimaryButton>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsTable;
