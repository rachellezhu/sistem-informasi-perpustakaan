import { Listbox, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment } from "react";

function ListBox({ items, selectedItem, setSelectedItem }) {
  return (
    <div>
      <Listbox
        value={items.map((item) => item.name)}
        onChange={setSelectedItem}
      >
        <div>
          <Listbox.Button
            className="relative w-32 justify-between inline-flex items-center cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 py-1.5 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 dark:focus-visible:border-indigo-600 focus-visible:ring-1 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-600 focus-visible:ring-offset-1 focus-visible:ring-offset-indigo-500 dark:focus-visible:ring-offset-indigo-500 text-gray-700 dark:text-gray-300 hover:dark:text-gray-200"
            value={selectedItem}
          >
            <span className="truncate">{selectedItem}</span>
            <span className="justify">
              <svg
                className="ml-1 -mr-0.5 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute w-32 mt-1 max-h-60 overflow-auto rounded-md bg-gray-200 dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item) => (
                <Listbox.Option
                  className={`relative cursor-pointer select-none py-2 px-3 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300
                  }`}
                  value={item.name}
                  key={item.name}
                  as={Fragment}
                >
                  {({ active }) => (
                    <li>
                      <Link
                        as="button"
                        className="w-full h-full text-left"
                        href={item.route}
                      >
                        <div
                          className={`${
                            active ? "bg-gray-300 dark:bg-gray-800" : ""
                          }`}
                        >
                          {item.name}
                        </div>
                      </Link>
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ListBox;
