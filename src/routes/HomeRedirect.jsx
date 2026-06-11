import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function HomeRedirect() {

    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role === "ADMIN") {
        return <Navigate to="/admin" />;
    }

    return <Navigate to="/dashboard" />;
}