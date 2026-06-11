import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {

    const [users, setUsers] =
        useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {
            
            const response =
                await api.get(
                    "/admin/users"
                );

            setUsers(
                response.data.data
            );

        } catch (error) {
            
            console.error(error);
        }
    };

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <table border="1">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            
        </div>
    )
}