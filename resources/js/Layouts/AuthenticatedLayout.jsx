import { lazy, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

const ApplicationLogo = lazy(() => import("@/Components/ApplicationLogo"));

export default function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/" aria-label="Home">
                  <ApplicationLogo className="block h-9 w-auto  " />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  Dashboard
                </NavLink>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  href={route("transaction")}
                  active={
                    route().current().toLowerCase().includes("transaction") &&
                    !route().current().toLowerCase().includes("trashed")
                  }
                >
                  Transaksi
                </NavLink>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  href={route("book")}
                  active={
                    (route().current().toLowerCase().includes("book") ||
                      route().current().toLowerCase().includes("author") ||
                      route().current().toLowerCase().includes("publisher") ||
                      route().current().toLowerCase().includes("category")) &&
                    !route().current().toLowerCase().includes("trashed")
                  }
                >
                  Buku
                </NavLink>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  href={route("student")}
                  active={
                    (route().current().toLowerCase().includes("student") ||
                      route()
                        .current()
                        .toLowerCase()
                        .includes("schoolClass".toLowerCase())) &&
                    !route().current().toLowerCase().includes("trashed")
                  }
                >
                  Siswa
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user.name}

                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
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
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
                      Profil
                    </Dropdown.Link>

                    {user.is_admin ? (
                      <>
                        <Dropdown.Link href={route("admin.user")}>
                          Staf
                        </Dropdown.Link>

                        <Dropdown.Link href={route("admin.setting")}>
                          Pengaturan
                        </Dropdown.Link>
                      </>
                    ) : (
                      ""
                    )}

                    <Dropdown.Link href={route("trashed")}>
                      Sampah
                    </Dropdown.Link>

                    <Dropdown.Link
                      className="w-full"
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      Keluar
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                aria-label="Hamburger Button"
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("transaction")}
              active={
                route().current().toLowerCase().includes("transaction") &&
                !route().current().toLowerCase().includes("trashed")
              }
            >
              Transaksi
            </ResponsiveNavLink>
          </div>

          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("book")}
              active={
                (route().current().toLowerCase().includes("book") ||
                  route().current().toLowerCase().includes("author") ||
                  route().current().toLowerCase().includes("publisher") ||
                  route().current().toLowerCase().includes("category")) &&
                !route().current().toLowerCase().includes("trashed")
              }
            >
              Buku
            </ResponsiveNavLink>
          </div>

          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("student")}
              active={
                (route().current().toLowerCase().includes("student") ||
                  route()
                    .current()
                    .toLowerCase()
                    .includes("schoolClass".toLowerCase())) &&
                !route().current().toLowerCase().includes("trashed")
              }
            >
              Siswa
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                {user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")}>
                Profil
              </ResponsiveNavLink>

              {user.is_admin ? (
                <>
                  <ResponsiveNavLink href={route("admin.user")}>
                    Staf
                  </ResponsiveNavLink>

                  <ResponsiveNavLink href={route("admin.setting")}>
                    Pengaturan
                  </ResponsiveNavLink>
                </>
              ) : (
                ""
              )}

              <ResponsiveNavLink href={route("trashed")}>
                Sampah
              </ResponsiveNavLink>

              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Keluar
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
