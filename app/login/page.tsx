"use client";
import { useState } from "react";  

export default function LoginPage() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
    
    return (
        <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Log In
            </h1>
        </main>
    );
}

function handleLogin() {
    setError("");

    const savedUsers = localStorage.getItem("users");

    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
}
