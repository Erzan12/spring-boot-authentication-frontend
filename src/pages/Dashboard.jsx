import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {

    const {
        email,
        role,
        logout
    } = useAuth();

    return(
        <div>

            <h1>User Dashboard</h1>
            <p>Email: {email}</p>
            <p>Role: {role}</p>

            <button onClick={logout}>
                Logout
            </button>
            
        </div>
    )
}