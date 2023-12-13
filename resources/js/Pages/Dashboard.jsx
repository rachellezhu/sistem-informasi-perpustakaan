import IconChevronRight from "@/Components/IconChevronRight";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

function Dashboard() {
  const {
    auth,
    authors,
    books,
    deadlineToday,
    late,
    publishers,
    schoolClasses,
    students,
    today,
    transactions,
    titles,
    wasReturned,
  } = usePage().props;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("transaction")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Transaksi
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    <IconChevronRight strokeWidth={2} />
                  </h2>
                </header>
              </Link>

              <div className="mt-6 space-y-6">
                <div className="flex justify-between">
                  <span>Transaksi hari ini : </span>
                  <span>{today}</span>
                </div>

                <div className="flex justify-between">
                  <span>Batas pengembalian hari ini : </span>
                  <span>{deadlineToday}</span>
                </div>

                <div className="flex justify-between">
                  <span>Terlambat : </span>
                  <span>{late}</span>
                </div>

                <div className="flex justify-between">
                  <span>Dikembalikan : </span>
                  <span>{wasReturned}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total transaksi : </span>
                  <span>{transactions}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("book")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Buku
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    <IconChevronRight strokeWidth={2} />
                  </h2>
                </header>
              </Link>

              <div className="mt-6 space-y-6">
                <div className="flex justify-between">
                  <span>Judul buku : </span>
                  <span>{titles}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total buku : </span>
                  <span>{books}</span>
                </div>

                <div className="flex justify-between">
                  <span>Penulis : </span>
                  <span>{authors}</span>
                </div>

                <div className="flex justify-between">
                  <span>Penerbit : </span>
                  <span>{publishers}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <section className="text-gray-900 dark:text-gray-100 space-y-6">
              <Link href={route("student")}>
                <header className="flex justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Siswa
                  </h2>

                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    <IconChevronRight strokeWidth={2} />
                  </h2>
                </header>
              </Link>

              <div className="mt-6 space-y-6">
                <div className="flex justify-between">
                  <span>Jumlah siswa : </span>
                  <span>{students}</span>
                </div>

                <div className="flex justify-between">
                  <span>Jumlah kelas : </span>
                  <span>{schoolClasses}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
