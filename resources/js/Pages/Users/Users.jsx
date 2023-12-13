import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ShowUsers from "./partials/ShowUsers";

function Users() {
  const { auth } = usePage().props;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Staf
        </h2>
      }
    >
      <Head title="Staf" />

      <section className="pt-12 pb-3">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 flex justify-between text-gray-900 dark:text-gray-100">
              <div>
                <Link href={route("admin.user.create")}>
                  <PrimaryButton>Tambah Staf</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 justify-between text-gray-900 dark:text-gray-100">
              <ShowUsers />
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}

export default Users;
