"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { User } from "@/types/health";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    function handleLogin() {
        setError("");

        const savedUsers = localStorage.getItem("users");

        const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

        const user = users.find(
            (user) =>
                user.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            setError("No account found with this email address.");
            return;
        }

        if (user.password !== password) {
            setError("Incorrect password.");
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        router.push("/dashboard");
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
                <div className="w-full rounded-3xl border border-blue-100 bg-white p-6 shadow-lg sm:p-8">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FF] text-3xl">
                            🩺
                        </div>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0B2559]">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            Log in to access your personal health dashboard.
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="mt-8"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 pr-20 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="Enter your password"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-semibold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium leading-5 text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-xl bg-[#123B8C] px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-[#0B2559] hover:shadow-lg"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs text-slate-400">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <p className="text-center text-sm text-[#64748B]">
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/signup")
                            }
                            className="font-bold text-[#123B8C] hover:underline"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}

