import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function CategoriesTable({ currentItems }) {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Kategori Buku</th>
          <th className="border px-2">Jumlah Buku</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((category, index) => (
          <tr key={category.id}>
            <td className="border px-2 py-2 align-top">{index + 1}</td>
            <td className="border px-2 py-2 align-top">{category.name}</td>
            <td className="border px-2 py-2 align-top text-end">
              {category.books.length}
            </td>
            <td className="border px-2 py-2 align-top text-center">
              <Link
                preserveScroll
                href={
                  category.deleted_at ? "" : route("category.edit", category.id)
                }
                disabled={category.deleted_at}
              >
                <PrimaryButton disabled={category.deleted_at}>
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

export default CategoriesTable;
