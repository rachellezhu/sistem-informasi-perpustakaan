import StudentsTable from "./StudentsTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));
const numbers = /\d/;

function ShowStudents() {
  const students = [...usePage().props.students].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  const [filteredStudents, setFilteredStudents] = useState(students);

  const studentFilter = debounce((query) => {
    if (!query) return setFilteredStudents(students);

    numbers.test(query)
      ? setFilteredStudents(
          students.filter((student) => {
            return student.card_number
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase());
          })
        )
      : setFilteredStudents(
          students.filter((student) => {
            return student.name.toLowerCase().includes(query.toLowerCase());
          })
        );
  }, 500);

  return (
    <>
      <SearchBar
        label="siswa"
        items={filteredStudents}
        setItems={setFilteredStudents}
        onChange={studentFilter}
      />

      <Pagination
        items={filteredStudents}
        itemName="Data Siswa"
        ItemsPage={StudentsTable}
      >
        Data siswa
      </Pagination>
    </>
  );
}

export default ShowStudents;
