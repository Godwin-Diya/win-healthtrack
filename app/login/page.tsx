"use client";
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

    function handleLogin() {
        setError("");

        const savedUsers = localStorage.getItem("users");

        const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
        const user = users.find((user) => user.email.toLowerCase());
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Log In
            </h1>
        </main>
    );
}



