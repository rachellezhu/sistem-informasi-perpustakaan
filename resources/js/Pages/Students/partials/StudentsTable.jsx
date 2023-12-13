import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function StudentsTable({ currentItems }) {
  return (
    <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th className="border px-2">No</th>
          <th className="border px-2">Nama</th>
          <th className="border px-2">ID Siswa</th>
          <th className="hidden sm:table-cell border px-2">Kelas</th>
          <th className="border px-2">Detail</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((student, index) => (
          <tr key={student.id}>
            <td className="border px-2 py-1 align-top">{index + 1}</td>
            <td className="border px-2 py-1 align-top">{student.name}</td>
            <td className="border px-2 py-1 align-top text-center">
              {student.card_number}
            </td>
            <td className="hidden sm:table-cell border px-2 py-1 align-top text-center">
              {student.school_class.name}
            </td>
            <td className="border px-2 py-1 align-top text-center">
              <Link
                href={
                  student.deleted_at ? "" : route("student.edit", student.id)
                }
                disabled={student.deleted_at}
              >
                <PrimaryButton disabled={student.deleted_at}>
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

export default StudentsTable;
