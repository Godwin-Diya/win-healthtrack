"use client";
import { useRouter } from "next/navigation"
import { useState } from "react";
type User = {
    email: string;
    password: string;
};


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
        const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            setError("No account found with this email address.");
            return;
        }

        if (user.password !== password) {
            setError("Incorrect password.");
            return;
        }
            
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/dashboard");
    }
    
return (
    <main className="min-h-screen bg-gray-50 p-6">
    <div className="mx-auto flex min-h-screen max-w-md items-center">
        <div className="w-full rounded-xl bg-white p-8 shadow-md">

        <h1 className="text-3xl font-bold">
            Log In
        </h1>

        <p className="mt-2 text-gray-600">
            Log in to access your personal health dashboard.
        </p>

        <form
            onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
            }}
            className="mt-8"
        >
            <div>
            <label className="mb-2 block font-medium">
                Email
            </label>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="Enter your email"
                required
            />
            </div>

            <div className="mt-5">
            <label className="mb-2 block font-medium">
                Password
            </label>

            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border p-3 pr-20"
                placeholder="Enter your password"
                required/>

                <button
                type="button"
                onClick={() =>
                setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600">
                {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            </div>

            {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                {error}
            </p>
            )}

            <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition">
            Log In
            </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-semibold text-blue-600 hover:underline">
            Create Account
            </button>
        </p>

        </div>
    </div>
</main>
);










































}



