"use client";

import { useState } from "react";
import type { User } from "@/types/health";

export default function SignUpPage() {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    function handleSignup() {
        setError("");

        if (!fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please create a password.");
            return;
        }

        if (!confirmPassword) {
            setError("Please confirm your password.");
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(
                "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter and a number."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const newUser: User = {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
            healthRecords: [],
        };

        const existingUsers =
            localStorage.getItem("users");

        const users: User[] = existingUsers
            ? JSON.parse(existingUsers)
            : [];

        const emailExists = users.some(
            (user) =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );

        if (emailExists) {
            setError(
                "An account with this email already exists."
            );
            return;
        }

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account created successfully!");
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg sm:p-8">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FF] text-3xl">
                            🩺
                        </div>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0B2559]">
                            Create Your Account
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            Welcome to Win HealthTrack.
                            Start tracking your health today.
                        </p>
                    </div>

                    <div className="mt-8">
                        <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) =>
                                setFullname(e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email address"
                            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                            Password
                        </label>

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
                            placeholder="Create a password"
                            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                            Confirm Password
                        </label>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm your password"
                            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="mt-3 rounded-lg px-2 py-1 text-sm font-semibold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                    >
                        {showPassword
                            ? "⁕ Hide Password"
                            : "👁️ Show Password"}
                    </button>

                    {error && (
                        <p className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium leading-5 text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleSignup}
                        className="mt-6 w-full rounded-xl bg-[#123B8C] px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-[#0B2559] hover:shadow-lg"
                    >
                        Create Account
                    </button>

                    <p className="mt-6 text-center text-xs leading-5 text-[#64748B]">
                        By creating an account, you can keep your
                        health records together in your dashboard.
                    </p>
                </div>
            </div>
        </main>
    );
}