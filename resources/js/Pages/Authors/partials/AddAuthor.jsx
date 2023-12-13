import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

function AddAuthor() {
  const { auth, authors, flash } = usePage().props;
  const {
    data,
    setData,
    post,
    errors,
    setError,
    clearErrors,
    processing,
    reset,
    recentlySuccessful,
  } = useForm({ name: "" });

  useEffect(() => {
    if (!flash.store) return;

    toast.success(flash.store, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [flash.store]);

  function handleAuthorChange(e) {
    setData("name", e);

    authors.some((item) => item.name === e)
      ? setError("name", "Penulis ini sudah terdaftar")
      : clearErrors("name");
  }

  function submit(e) {
    e.preventDefault();

    post(route("author.store"), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  }

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <Link href={route("author")}>
              <span className="text-gray-500 dark:text-gray-400">Penulis</span>
            </Link>{" "}
            / Tambah Penulis
          </h2>
        }
      >
        <Head title="Tambah penulis" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Tambah penulis
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menambahkan penulis dengan mengisi form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Penulis" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => handleAuthorChange(e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <Transition
                      show={recentlySuccessful}
                      enter="transition ease-in-out"
                      enterFrom="opacity-0"
                      leave="transition ease-in-out"
                      leaveTo="opacity-0"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {flash.store}.
                      </p>
                    </Transition>

                    <PrimaryButton
                      disabled={processing || errors.name || data.name === ""}
                    >
                      Simpan
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}

export default AddAuthor;
