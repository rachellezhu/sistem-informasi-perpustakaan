import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import DeletionModal from "@/Components/DeletionModal";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "@/Components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function TransactionDetail() {
  const { auth, fine, flash, transaction, schoolClass } = usePage().props;
  const {
    data,
    errors,
    delete: destroy,
    patch,
    processing,
    recentlySuccessful,
  } = useForm({
    name: transaction.data.student.at(0).name || "",
    card_number: transaction.data.student.at(0).card_number || "",
    title: transaction.data.book.at(0).title || "",
    book_code: transaction.data.book.at(0).book_code || "",
    start_time: transaction.data.start_time || "",
    end_time: transaction.data.end_time || "",
  });
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const overdue = Math.ceil(
    (new Date() - new Date(transaction.data.end_time)) / (1000 * 60 * 60 * 24)
  );
  let totalFine = 0;

  if (transaction.data.return_time > transaction.data.end_time)
    totalFine =
      fine *
      Math.ceil(
        (new Date(transaction.data.return_time) -
          new Date(transaction.data.end_time)) /
          (1000 * 60 * 60 * 24)
      );
  if (
    !transaction.data.return_time &&
    new Date() > new Date(transaction.data.end_time)
  )
    totalFine = fine * overdue;

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
  }, [transaction]);

  function submit(e) {
    e.preventDefault();

    patch(route("transaction.update", transaction.data.id), {
      preserveScroll: true,
    });
  }

  function handleTransactionDeletion(e) {
    e.preventDefault();

    destroy(route("transaction.destroy", transaction.data.id), {
      onSuccess: () => setShowDeletionModal(false),
    });
  }

  return (
    <>
      <ToastContainer />

      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <Link href={route("transaction")}>
              <span className="text-gray-500 dark:text-gray-400">
                Transaksi
              </span>
            </Link>{" "}
            / Detail
          </h2>
        }
      >
        <Head title="Transaksi" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi peminjaman
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {transaction.data.return_time
                      ? `Buku telah dikembalikan pada ${new Date(
                          transaction.data.return_time
                        ).toLocaleDateString("id-ID", options)}`
                      : "Anda dapat menyelesaikan peminjaman dengan menekan tombol selesai di bawah"}
                  </p>
                </header>

                <form className="mt-6 space-y-6" onSubmit={submit}>
                  <div>
                    <InputLabel htmlFor="name" value="Nama Siswa" />

                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      value={data.name}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.name} />
                  </div>

                  <div>
                    <InputLabel htmlFor="card_number" value="ID Siswa" />

                    <TextInput
                      id="card_number"
                      className="mt-1 block w-full"
                      value={data.card_number}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.card_number} />
                  </div>

                  <div>
                    <InputLabel htmlFor="schoolClass" value="Kelas" />

                    <TextInput
                      id="schoolClass"
                      className="mt-1 block w-full"
                      value={schoolClass.name}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.schoolClass} />
                  </div>

                  <div>
                    <InputLabel htmlFor="title" value="Judul Buku" />

                    <TextInput
                      id="title"
                      className="mt-1 block w-full"
                      value={data.title}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.title} />
                  </div>

                  <div>
                    <InputLabel htmlFor="book_code" value="Kode Buku" />

                    <TextInput
                      id="book_code"
                      className="mt-1 block w-full"
                      value={data.book_code}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.book_code} />
                  </div>

                  <div>
                    <InputLabel htmlFor="start_time" value="Mulai Meminjam" />

                    <TextInput
                      id="start_time"
                      className="mt-1 block w-full"
                      value={new Date(data.start_time).toLocaleDateString(
                        "id-ID",
                        options
                      )}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.start_time} />
                  </div>

                  <div>
                    <InputLabel htmlFor="end_time" value="Selesai Meminjam" />

                    <TextInput
                      id="end_time"
                      className="mt-1 block w-full"
                      value={new Date(data.end_time).toLocaleDateString(
                        "id-ID",
                        options
                      )}
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.end_time} />
                  </div>

                  <div>
                    <InputLabel htmlFor="return_time" value="Dikembalikan" />

                    <TextInput
                      id="return_time"
                      className="mt-1 block w-full"
                      value={
                        transaction.data.return_time
                          ? new Date(
                              transaction.data.return_time
                            ).toLocaleDateString("id-ID", options)
                          : "Belum dikembalikan"
                      }
                      required
                      disabled
                    />

                    <InputError className="mt-2" message={errors.return_time} />
                  </div>

                  <div>
                    <InputLabel htmlFor="fine" value="Denda" />

                    <TextInput
                      id="fine"
                      className="mt-1 block w-full"
                      value={totalFine}
                      required
                      disabled
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
                      disabled={transaction.data.return_time || processing}
                    >
                      Selesai
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            </div>

            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <section className="max-w-xl space-y-6">
                <header>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Hapus transaksi
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Anda dapat menghapus transaksi dengan menekan tombol hapus
                    di bawah
                  </p>
                </header>

                <DangerButton
                  onClick={() => setShowDeletionModal(true)}
                  disabled={processing}
                >
                  Hapus
                </DangerButton>
              </section>
            </div>
          </div>
        </div>
        <DeletionModal
          show={showDeletionModal}
          name={"Transaksi peminjaman ini"}
          setShow={() => setShowDeletionModal(false)}
          onClick={handleTransactionDeletion}
          processing={processing}
        />
      </AuthenticatedLayout>
    </>
  );
}

export default TransactionDetail;
