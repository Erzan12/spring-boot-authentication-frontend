import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function UserModalForm({
  onClose,
  onSuccess,
  initialData
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        password: "",
        role: initialData.role,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/admin/users/${initialData.id}`, form);
      } else {
        await api.post("/admin/users", form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-bold">
        {isEdit ? "Edit User" : "Add User"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 rounded bg-slate-800"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 rounded bg-slate-800"
      />

      {!isEdit && (
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 rounded bg-slate-800"
        />
      )}

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-800"
      >
        <option value="USER">USER</option>
        <option value="SELLER">SELLER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button className="w-full bg-cyan-600 py-2 rounded">
        {isEdit ? "Save Changes" : "Create User"}
      </button>
    </form>
  );
}