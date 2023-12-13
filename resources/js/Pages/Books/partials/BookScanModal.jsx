import Modal from "@/Components/Modal";
import Scanner from "@/Components/Scanner";
import SecondaryButton from "@/Components/SecondaryButton";

function BookScanModal({ show, onClick, onNewScanResult }) {
  return (
    <div>
      <Modal show={show} maxWidth="md">
        <div className="p-6 dark:text-gray-300">
          <h2 className="text-lg mb-6 font-medium text-gray-900 dark:text-gray-100">
            Scan Kode Buku
          </h2>
          <Scanner
            fps={10}
            qrbox={320}
            aspectRatio={1.0}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={onClick}>Cancel</SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookScanModal;