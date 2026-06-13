import { useEffect, useState } from "react";
import api from "../../api/axios";

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/users");
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        setUsers,
        loading,
        refresh: fetchUsers,
    };
}