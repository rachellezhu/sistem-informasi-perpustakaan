import PublishersTable from "./PublishersTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function ShowPublishers() {
  const publishers = [...usePage().props.publishers].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredPublishers, setFilteredPublishers] = useState(publishers);

  const publisherFilter = debounce((query) => {
    if (!query) return setFilteredPublishers(publishers);

    setFilteredPublishers(
      publishers.filter((publisher) => {
        return publisher.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  return (
    <>
      <SearchBar
        label="penulis"
        items={filteredPublishers}
        setItems={setFilteredPublishers}
        onChange={publisherFilter}
      />

      <Pagination
        items={filteredPublishers}
        itemName="Data Penulis"
        ItemsPage={PublishersTable}
      >
        Data penulis
      </Pagination>
    </>
  );
}

export default ShowPublishers;
