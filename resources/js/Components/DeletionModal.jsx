import Modal from "./Modal";
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";

function DeletionModal({ name, onClick, show, setShow, processing = false }) {
  return (
    <div>
      <Modal show={show} maxWidth="md">
        <div className="p-6 dark:text-gray-300">
          <h2 className="text-lg mb-6 font-medium text-gray-900 dark:text-gray-100">
            Hapus {name}?
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Apakah Anda yakin akan menghapus {name}?
          </p>

          <div className="mt-6 flex justify-between">
            <div className="">
              <PrimaryButton onClick={setShow}>Kembali</PrimaryButton>
            </div>
            <div className="">
              <DangerButton onClick={onClick} disabled={processing}>
                Hapus
              </DangerButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeletionModal;
