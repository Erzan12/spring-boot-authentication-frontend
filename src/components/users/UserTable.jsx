export default function UserTable({ users, onEdit }) {
  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "text-red-400";
      case "SELLER":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-800">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-slate-800">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>

              <td className={`p-3 ${getRoleColor(u.role)}`}>
                {u.role}
              </td>

              <td className="p-3">
                <button
                  onClick={() => onEdit(u)}
                  className="bg-cyan-600 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}