import CategoriesTable from "./CategoriesTable";
import { debounce } from "lodash";
import Pagination from "@/Components/Pagination-v1";
import { usePage } from "@inertiajs/react";
import { lazy, useState } from "react";

const SearchBar = lazy(() => import("@/Components/SearchBar"));

function ShowCategories() {
  const categories = [...usePage().props.categories].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const categoryFilter = debounce((query) => {
    if (!query) return setFilteredCategories(categories);

    setFilteredCategories(
      categories.filter((category) => {
        return category.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 500);

  return (
    <>
      <SearchBar
        label="kategori"
        items={filteredCategories}
        setItems={setFilteredCategories}
        onChange={categoryFilter}
      />

      <Pagination
        items={filteredCategories}
        itemName="Data Kategori"
        ItemsPage={CategoriesTable}
      >
        Data kategori
      </Pagination>
    </>
  );
}

export default ShowCategories;
