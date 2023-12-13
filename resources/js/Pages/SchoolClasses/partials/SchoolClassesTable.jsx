import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function SchoolClassesTable({ currentItems }) {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Nama Kelas</th>
          <th className="border px-2">Jumlah Siswa</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((schoolClass, index) => (
          <tr key={schoolClass.id}>
            <td className="border px-2 py-2 align-top">{index + 1}</td>
            <td className="border px-2 py-2 align-top">{schoolClass.name}</td>
            <td className="border px-2 py-2 align-top text-end">
              {schoolClass.students.length}
            </td>
            <td className="border px-2 py-2 align-top text-center">
              <Link
                preserveScroll
                href={
                  schoolClass.deleted_at
                    ? ""
                    : route("schoolClass.edit", schoolClass.id)
                }
                disabled={schoolClass.deleted_at}
              >
                <PrimaryButton disabled={schoolClass.deleted_at}>
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

export default SchoolClassesTable;
