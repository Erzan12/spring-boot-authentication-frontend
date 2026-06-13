import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/20 text-red-400";
      case "SELLER":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400">
            Manage users and role assignments
          </p>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          + Add User
        </button>
      </div>

      {/* Stats Card */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-slate-400">Total Users</p>

        <h2 className="text-3xl font-bold">
          {users.length}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-slate-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-800"
                >
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button className="rounded-md bg-cyan-600 px-3 py-1 text-sm hover:bg-cyan-500">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}