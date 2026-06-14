import { useState } from "react";
import { useUsers } from "../utils/hooks/useUsers";
import UserModalForm from "../components/users/UserModal";
import UserTable from "../components/users/UserTable";
import Modal from "../components/reusable/Modal";
import { useToast } from "../utils/ui/useToast";
import { Toast } from "../utils/ui/toast";

export default function AdminDashboard() {
  const { users, refresh } = useUsers();
  const { toast, showToast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <Toast toast={toast} />

      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400">Manage users and roles</p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setOpen(true);
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <UserTable
        users={users}
        onEdit={(user) => {
          console.log("Editing user:", user);
          setSelectedUser(user);
          setOpen(true);
        }}
      />

      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <UserModalForm
            initialData={selectedUser}
            onClose={() => setOpen(false)}
            onSuccess={() => {
              refresh();
              showToast(
                selectedUser ? "User updated" : "User created"
              );
            }}
          />
        </Modal>
      )}

    </div>
  );
}