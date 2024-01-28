import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
      <div className="text-center items-center bg-transparent">
        <Link href="/">
          <ApplicationLogo className="w-32 h-32 m-auto fill-current" />
        </Link>
        <div className="mt-2 mx-auto">
          <h1 className="text-xl font-bold uppercase text-gray-800 dark:text-gray-200">
            Sistem Informasi Perpustakaan SDN Pabelan 2 Kartasura
          </h1>
        </div>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
