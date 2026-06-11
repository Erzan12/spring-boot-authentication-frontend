import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const [email, setEmail] = useState(
        localStorage.getItem("email")
    );

    const login = (data) => {

        localStorage.setItem(
            "token",
            data.accessToken
        );

        localStorage.setItem(
            "role",
            data.role
        );

        localStorage.setItem(
            "email",
            data.email
        );

        setToken(data.accessToken);
        setRole(data.role);
        setEmail(data.email);
    };

    const logout = () => {

        localStorage.clear();

        setToken(null);
        setRole(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                email,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
    useContext(AuthContext);