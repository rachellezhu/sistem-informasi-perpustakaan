import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

function Trashed() {
  const {
    auth,
    authors,
    books,
    categories,
    publishers,
    schoolClasses,
    students,
    transactions,
    users,
  } = usePage().props;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Sampah
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.transaction")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Transaksi
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {transactions}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.book")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Buku
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {books}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.category")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Kategori
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {categories}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.author")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Penulis
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {authors}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.publisher")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Penerbit
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {publishers}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.student")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Siswa
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {students}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("trashed.schoolClass")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Kelas
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {schoolClasses}
                  </h2>
                </header>
              </Link>
            </section>
          </div>

          {auth.user.is_admin && (
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <section className="text-gray-900 dark:text-gray-100 space-y-6">
                <Link href={route("trashed.user")}>
                  <header className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Pengguna
                    </h2>

                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {users}
                    </h2>
                  </header>
                </Link>
              </section>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Trashed;
