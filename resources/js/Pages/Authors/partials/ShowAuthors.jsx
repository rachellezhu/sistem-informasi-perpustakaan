import AuthorsTable from "./AuthorsTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function ShowAuthors() {
  const authors = [...usePage().props.authors].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  const authorFilter = debounce((query) => {
    if (!query) return setFilteredAuthors(authors);

    setFilteredAuthors(
      authors.filter((author) => {
        return author.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  return (
    <>
      <SearchBar
        label="penulis"
        items={filteredAuthors}
        setItems={setFilteredAuthors}
        onChange={authorFilter}
      />
      <Pagination
        items={filteredAuthors}
        itemName="Data Penulis"
        ItemsPage={AuthorsTable}
      >
        Data penulis
      </Pagination>
    </>
  );
}

export default ShowAuthors;
