import { forwardRef, Fragment, useState } from "react";
import { Combobox } from "@headlessui/react";

export default forwardRef(function DropdownInput(
  { className = "", id, items, selectedItem, setSelectedItem },
  ref
) {
  const [query, setQuery] = useState(selectedItem || "");
  const filteredItems = !query
    ? items
    : items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  function handleInput(e) {
    setQuery(e.target.value);
    setSelectedItem(e.target.value);
  }

  return (
    <div>
      <Combobox value={selectedItem} onChange={(e) => setSelectedItem(e)}>
        <Combobox.Input
          id={id}
          onChange={handleInput}
          className={
            `border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ` +
            className
          }
          required
        />
        <Combobox.Options className="absolute mt-1 max-h-32 overflow-auto rounded-md bg-gray-200 dark:bg-gray-700 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm py-1">
          {filteredItems.map((item) => (
            <Combobox.Option
              key={item}
              value={item}
              as={Fragment}
              className={`relative cursor-pointer select-none py-2 pl-3 pr-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400`}
            >
              {({ active }) => (
                <li
                  className={`${
                    active ? "bg-gray-300 dark:bg-gray-800" : ""
                  }  `}
                >
                  {item}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
});
