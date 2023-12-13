import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function AuthorsTable({ currentItems }) {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Nama Penulis</th>
          <th className="border px-2">Jumlah Buku</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((author, index) => (
          <tr key={author.id}>
            <td className="border px-2 py-2 align-top">{index + 1}</td>
            <td className="border px-2 py-2 align-top">{author.name}</td>
            <td className="border px-2 py-2 align-top text-end">
              {author.books.length}
            </td>
            <td className="border px-2 py-2 align-top text-center">
              <Link
                preserveScroll
                href={author.deleted_at ? "" : route("author.edit", author.id)}
                disabled={author.deleted_at}
              >
                <PrimaryButton disabled={author.deleted_at}>
                  Detail
                </PrimaryButton>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AuthorsTable;
