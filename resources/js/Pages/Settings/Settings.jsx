import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

const numbers = /^[0-9\b]+$/;

function Settings() {
  const { auth, flash, settings } = usePage().props;
  const { data, setData, patch, processing, recentlySuccessful } = useForm({
    fine: settings.fine || "",
    day: settings.day || "",
  });
  const isExactlySame =
    Number(data.fine) === Number(settings.fine) &&
    Number(data.day) === Number(settings.day);
  const isEmpty = data.fine === "" || data.day === "";

  useEffect(() => {
    if (!flash.update) return;

    toast.info(flash.update, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }, [settings]);

  function handleFineChange(data) {
    if (data === "" || numbers.test(data)) setData("fine", data);
  }

  function handleDayChange(data) {
    if (data === "" || numbers.test(data)) setData("day", data);
  }

  function submit(e) {
    e.preventDefault();

    patch(route("admin.setting.update", settings.id), {
      preserveScroll: true,
    });
  }

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Pengaturan
          </h2>
        }
      >
        <Head title="Pengaturan" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Pengaturan peminjaman
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat memperbarui denda atau jumlah hari peminjaman
                    dengan mengubah form di bawah
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel
                      htmlFor="fine"
                      value="Denda (Per Hari dalam Rupiah)"
                    />

                    <TextInput
                      id="fine"
                      className="mt-1 block w-full"
                      value={data.fine}
                      onChange={(e) => handleFineChange(e.target.value)}
                      inputMode="numeric"
                      required
                    />
                  </div>

                  <div>
                    <InputLabel htmlFor="day" value="Lama Peminjaman (Hari)" />

                    <TextInput
                      id="day"
                      className="mt-1 block w-full"
                      value={data.day}
                      onChange={(e) => handleDayChange(e.target.value)}
                      inputMode="numeric"
                      required
                    />
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
                        {flash.update}.
                      </p>
                    </Transition>

                    <PrimaryButton
                      disabled={processing || isExactlySame || isEmpty}
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

export default Settings;
