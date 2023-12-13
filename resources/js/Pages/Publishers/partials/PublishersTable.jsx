import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function PublishersTable({ currentItems }) {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Nama Penerbit</th>
          <th className="border px-2">Jumlah Buku</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((publisher, index) => (
          <tr key={publisher.id}>
            <td className="border px-2 py-2 align-top">{index + 1}</td>
            <td className="border px-2 py-2 align-top">{publisher.name}</td>
            <td className="border px-2 py-2 align-top text-end">
              {publisher.books.length}
            </td>
            <td className="border px-2 py-2 align-top text-center">
              <Link
                preserveScroll
                href={
                  publisher.deleted_at
                    ? ""
                    : route("publisher.edit", publisher.id)
                }
                disabled={publisher.deleted_at}
              >
                <PrimaryButton disabled={publisher.deleted_at}>
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

export default PublishersTable;
