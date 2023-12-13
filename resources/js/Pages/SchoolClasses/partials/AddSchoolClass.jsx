import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

function AddSchoolClass() {
  const { auth, schoolClasses, flash } = usePage().props;
  const {
    data,
    setData,
    errors,
    setError,
    clearErrors,
    post,
    reset,
    processing,
    recentlySuccessful,
  } = useForm({ name: "" });

  useEffect(() => {
    if (!flash.store) return;

    toast.info(flash.store, {
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

  function handleSchoolClassCodeChange(e) {
    setData("name", e);

    schoolClasses.some((item) => item.name.toLowerCase() === e.toLowerCase())
      ? setError("name", "Kelas sudah terdaftar")
      : clearErrors("name");
  }

  function submit(e) {
    e.preventDefault();

    post(route("schoolClass.store"), {
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
            <Link href={route("schoolClass")}>
              <span className="text-gray-500 dark:text-gray-400">Kelas</span>
            </Link>{" "}
            / Tambah Kelas
          </h2>
        }
      >
        <Head title="Tambah kelas" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Tambah kelas
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menambahkan kelas dengan mengisi form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Kelas" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) =>
                        handleSchoolClassCodeChange(e.target.value)
                      }
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

export default AddSchoolClass;
