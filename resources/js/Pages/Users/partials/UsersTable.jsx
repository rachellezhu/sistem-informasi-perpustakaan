import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

function UsersTable({ currentItems }) {
  const { delete: destroy, patch } = useForm();

  function handleSetAdmin(e, id) {
    e.preventDefault();

    patch(route("admin.user.set-admin", id), {
      preserveScroll: true,
    });
  }

  function handlePasswordReset(e, id) {
    e.preventDefault();

    patch(route("admin.user.reset", id), {
      preserveScroll: true,
    });
  }

  function handleUserDeletion(e, id) {
    e.preventDefault();

    destroy(route("admin.user.destroy", id), {
      preserveScroll: true,
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border text-gray-900 dark:text-gray-100">
        <thead>
          <tr>
            <th className="border px-2">No</th>
            <th className="border px-2">Username</th>
            <th className="border px-2">Jadikan Admin</th>
            <th className="border px-2">Reset Kata Sandi</th>
            <th className="border px-2">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-2 py-1 align-top">{index + 1}</td>
              <td className="border px-2 py-1 align-top">{user.username}</td>
              <td className="border px-2 py-1 align-top text-center">
                <SecondaryButton onClick={(e) => handleSetAdmin(e, user.id)}>
                  Admin
                </SecondaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <PrimaryButton onClick={(e) => handlePasswordReset(e, user.id)}>
                  Reset
                </PrimaryButton>
              </td>
              <td className="border px-2 py-1 align-top text-center">
                <DangerButton onClick={(e) => handleUserDeletion(e, user.id)}>
                  Hapus
                </DangerButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
