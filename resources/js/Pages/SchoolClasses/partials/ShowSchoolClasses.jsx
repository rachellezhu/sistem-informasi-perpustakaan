import SchoolClassesTable from "./SchoolClassesTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function ShowSchoolClasses() {
  const schoolClasses = [...usePage().props.schoolClasses].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredSchoolClasses, setFilteredSchoolClasses] =
    useState(schoolClasses);

  const schoolClassFilter = debounce((query) => {
    if (!query) return setFilteredSchoolClasses(schoolClasses);

    setFilteredSchoolClasses(
      schoolClasses.filter((schoolClass) => {
        return schoolClass.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  return (
    <>
      <SearchBar
        label="kelas"
        items={filteredSchoolClasses}
        setItems={setFilteredSchoolClasses}
        onChange={schoolClassFilter}
      />
      <Pagination
        items={filteredSchoolClasses}
        itemName="Data Kelas"
        ItemsPage={SchoolClassesTable}
      >
        Data kelas
      </Pagination>
    </>
  );
}

export default ShowSchoolClasses;
