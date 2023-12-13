import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DropdownInput from "@/Components/DropdownInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

function AddStudent() {
  const { auth, students, flash } = usePage().props;
  const schoolClasses = [...usePage().props.schoolClasses].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
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
  } = useForm({
    name: "",
    card_number: "",
    schoolClass: "",
  });
  const isEmpty =
    data.name === "" || data.card_number === "" || data.schoolClass === "";

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

  function handleCardNumberChange(e) {
    setData("card_number", e);

    students.some((item) => item.card_number === e)
      ? setError("card_number", "Nomor siswa sudah terdaftar")
      : clearErrors("card_number");
  }

  function handleSchoolClassChange(e) {
    setData("schoolClass", e);
  }

  function submit(e) {
    e.preventDefault();

    post(route("student.store"), {
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
            <Link href={route("student")}>
              <span className="text-gray-500 dark:text-gray-400">Siswa</span>
            </Link>{" "}
            / Tambah Siswa
          </h2>
        }
      >
        <Head title="Tambah Siswa" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Tambah siswa
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menambahkan data siswa dengan mengisi form di
                    bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Siswa" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div>
                    <InputLabel htmlFor="card_number" value="ID Siswa" />

                    <TextInput
                      id="card_number"
                      className="mt-1 block w-full"
                      value={data.card_number}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      required
                    />

                    <InputError className="mt-2" message={errors.card_number} />
                  </div>

                  <div>
                    <InputLabel htmlFor="schoolClass" value="Kelas" />

                    <DropdownInput
                      id="schoolClass"
                      items={schoolClasses.map(
                        (schoolClass) => schoolClass.name
                      )}
                      selectedItem={data.schoolClass}
                      setSelectedItem={handleSchoolClassChange}
                      className="mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.schoolClass} />
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
                      disabled={
                        processing || isEmpty || Object.values(errors).length
                      }
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

export default AddStudent;
