import { Link } from "@inertiajs/react";
import { useState } from "react";

function PageLink({ active, label, url }) {
  const arrowLabel = label.toLowerCase().includes("prev")
    ? "Prev"
    : label.toLowerCase().includes("next")
    ? "Next"
    : label;

  return (
    <div className="w-auto">
      <Link
        href={url}
        className={`mx-1 px-1.5 py-auto text-center align-middle ${
          active
            ? "text-gray-800 dark:text-gray-200 dark:bg-indigo-600 bg-indigo-400 focus:bg-indigo-800 rounded"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <span
          className="p-autoalign-middle content-center"
          dangerouslySetInnerHTML={{ __html: arrowLabel }}
        ></span>
      </Link>
    </div>
  );
}

function PageInactive({ label }) {
  const arrowLabel = label.toLowerCase().includes("previous") ? "Prev" : "Next";
  return (
    <div className="mx-1 px-1.5 py-auto text-center align-middle text-gray-700 dark:text-gray-500">
      <span dangerouslySetInnerHTML={{ __html: arrowLabel }}></span>
    </div>
  );
}

function Paginate({ currentPage, items, lastPage }) {
  const num = /^\d+$/;
  const pages = items.links.filter(
    (item) =>
      Number(item.label) === currentPage ||
      Number(item.label) === currentPage + 1 ||
      Number(item.label) === currentPage - 1 ||
      Number(item.label) === currentPage + 2 ||
      Number(item.label) === currentPage - 2 ||
      Number(item.label) === 1 ||
      Number(item.label) === lastPage ||
      !num.test(Number(item.label))
  );

  console.log(pages);

  const paginated = pages.map((page) => {
    if (page.url === null)
      return <PageInactive key={page.label} label={page.label} />;

    if (Number(page.label) === 1 || Number(page.label) === lastPage)
      return (
        <PageLink
          key={page.label}
          label={page.label}
          active={page.active}
          url={page.url}
        />
      );

    if (
      Number(page.label) + 2 === currentPage ||
      Number(page.label) - 2 === currentPage
    )
      return (
        <PageLink
          key={page.label}
          label={"..."}
          active={page.active}
          url={page.url}
        />
      );

    return (
      <PageLink
        key={page.label}
        label={page.label}
        active={page.active}
        url={page.url}
      />
    );
  });

  pages.splice;
  return <>{paginated}</>;
}

function Pagination({ items }) {
  if (items.links.length === 3) return null;

  const mappedItems = items.links.map(({ active, label, url }) => {
    return <PageLink key={label} label={label} active={active} url={url} />;
  });

  return (
    <>
      {/* <div className="flex mt-10 mb-4 w-full justify-center">
        {items.links.map(({ active, label, url }) => {
          return url === null ? (
            <PageInactive key={label} label={label} />
          ) : items.current_page + 1 === Number(label) ||
            items.current_page - 1 === Number(label) ||
            items.current_page === Number(label) ||
            Number(label) === 1 ||
            Number(label) === items.last_page ? (
            <PageLink key={label} label={label} active={active} url={url} />
          ) : (
            <NextLink
              key={label}
              url={url}
              currentPage={items.current_page}
              label={Number(label)}
            />
          );
        })}
      </div> */}
      <div className="flex mt-10 mb-4 w-full justify-center">
        <Paginate
          currentPage={items.current_page}
          items={items}
          lastPage={items.last_page}
        />
      </div>
    </>
  );
}

export default Pagination;
