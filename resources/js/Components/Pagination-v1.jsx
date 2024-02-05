import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const activeClassName =
  "mx-1 rounded text-gray-900 dark:text-gray-200 outline outline-offset-1 outline-2 outline-indigo-400 dark:outline-indigo-600 active:border-indigo-400";

const linkPageStyle =
  "flex rounded w-8 h-8 justify-center items-center border border-gray-500/75 dark:border-gray-400/75 ";

function Pagination({ children, items, ItemsPage, itemsPerPage = 5 }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const params = new URLSearchParams(window.location.search).get("page")
    ? new URLSearchParams(window.location.search).get("page") - 1
    : 0;
  const [initialPage, setInitialPage] = useState(params);

  const handlePageClick = (event) => {
    router.get(
      route(route().current(), route().params),
      { page: event.selected + 1 },
      { replace: true, preserveState: true, preserveScroll: true }
    );
  };

  useEffect(() => {
    const newOffset = (params * itemsPerPage) % items.length;
    setInitialPage(params);
    setItemOffset(newOffset);
  }, [params]);

  useEffect(() => {
    if (itemOffset == 0) return;

    handlePageClick({ selected: 0 });
  }, [items.length]);

  const previousLinkClassName = itemOffset === 0 ? "hidden" : linkPageStyle;
  const nextLinkClassName =
    endOffset === items.length || itemsPerPage > currentItems.length
      ? "hidden"
      : linkPageStyle;

  return (
    <>
      {items.length !== 0 ? (
        <ItemsPage currentItems={currentItems} />
      ) : (
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight text-center">
          {children} tidak ditemukan!
        </h3>
      )}
      <ReactPaginate
        className=""
        nextLabel="&raquo;"
        onPageChange={handlePageClick}
        forcePage={items.length > 0 ? initialPage : -1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="&laquo;"
        pageClassName=""
        pageLinkClassName={linkPageStyle}
        previousClassName=""
        previousLinkClassName={previousLinkClassName}
        nextClassName=""
        nextLinkClassName={nextLinkClassName}
        breakLabel="&hellip;"
        breakClassName=""
        breakLinkClassName={linkPageStyle}
        containerClassName="w-full flex items-center justify-center my-10 text-center align-middle text-sm text-gray-500 dark:text-gray-400 gap-0.5"
        activeClassName={activeClassName}
        renderOnZeroPageCount={null}
        hrefBuilder={(currentPage) => `?page=${currentPage}`}
        hrefAllControls
      />
    </>
  );
}

export default Pagination;
