"use client";
import { useState } from "react";    

type User = {
    fullName: string;
    email: string;
    password: string;
};

export default function SignUpPage()
{
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
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

        setError("");
        const newUser: User = {
            fullName,
            email,
            password,
        };
    
        const existingUsers = localStorage.getItem("users");
        const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];
        const emailExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
            setError(
                "An account with this email already exists."
            );
            return;
        }
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");

    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-xl border p-8 shadow-md">

                <h1 className="text-3xl font-bold text-center">
                    Create Your account
                </h1>

                <p className="mt-3 text-center text-gray-600">
                    Welcome to Win HealthTrack.
                    Start tracking your health today.
                </p>
                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                            setFullname(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 font-medium">
                        Email Address     
                    </label>

                    <input
                        type="email"
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounde-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) =>
                        setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mt-4">
                    <label className="block mb-2 font-medium">
                        Confirm Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mt-2 text-sm text-blue-600 hover:underline">
                    {showPassword ? "⁕ Hide Password" : "👁️ Show Password"}
                </button>

                {error && (
                    <p className="mt-4 text-red-600 font-medium">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleSignup}
                    className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
                >
                    Create Account
                </button>

                
            </div>

        </main>
    );
}

