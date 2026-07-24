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
    

    // na me just put this one there, I can actually remove it
    return (
        <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Log In
            </h1>
        </main>
    );
}



