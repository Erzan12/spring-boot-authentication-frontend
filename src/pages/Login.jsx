import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../auth/AuthService";
import { useAuth } from "../auth/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] =
        useState({
            email: "",
            password: ""
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await loginUser(formData);

            login(response.data);

            if(
                response.data.role ===
                "ADMIN"
            ) {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    )
}

// export default function Login() {
//     return <h1>Login Page</h1>;
// }