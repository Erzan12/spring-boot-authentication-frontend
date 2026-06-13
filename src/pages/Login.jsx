import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../auth/AuthService";
import { useAuth } from "../auth/AuthContext";

import {
  ShieldCheck,
  Mail,
  Lock,
  CheckCircle
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(formData);

      login(response.data);

      navigate(
        response.data.role === "ADMIN"
          ? "/admin"
          : "/dashboard"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  function Feature({ text }) {
    return (
        <div className="flex items-center gap-3">
        <CheckCircle
            size={18}
            className="text-cyan-500"
        />

        <span className="text-slate-300">
            {text}
        </span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">

            {/* Left Side */}
            <div className="flex flex-1 items-center justify-center p-10">
                <div className="max-w-md">
                    <div className="mb-8 flex items-center gap-3">
                        <ShieldCheck size={40} className="text-cyan-500" />

                        <div>
                            <h1 className="text-4xl font-bold">
                                SecureAuth
                            </h1>

                            <p className="text-slate-400">
                                JWT Authentication Demo
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Feature text="Spring Boot 3" />
                        <Feature text="Spring Security" />
                        <Feature text="JWT Authentication" />
                        <Feature text="Role-Based Access Control" />
                        <Feature text="React + Vite Frontend" />
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-1 items-center justify-center p-10">
                <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                <h2 className="mb-2 text-3xl font-bold">
                    Welcome Back
                </h2>

                <p className="mb-8 text-slate-400">
                    Sign in to continue
                </p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-400 bg-red-500/20 p-3 text-sm text-red-100">
                    {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-4 text-slate-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-950
                            py-3
                            pl-11
                            pr-4
                            text-white
                            outline-none
                            focus:border-cyan-500
                            "
                        />
                    </div>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-slate-500"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-950
                            py-3
                            pl-11
                            pr-4
                            text-white
                            outline-none
                            focus:border-cyan-500
                            "
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-white/70 hover:text-white"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="
                            w-full
                            rounded-xl
                            bg-blue-600
                            py-3
                            font-semibold
                            transition
                            hover:bg-blue-500
                            disabled:opacity-50
                        "
                        >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 rounded-xl bg-slate-800 p-4">
                    <p className="mb-3 text-sm text-slate-400">
                        Available Roles
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
                            ADMIN
                        </span>

                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                            SELLER
                        </span>

                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                            USER
                        </span>
                    </div>
                </div>
                    <p className="mt-6 text-center text-xs text-slate-500">
                        Spring Boot • JWT • RBAC • React
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}