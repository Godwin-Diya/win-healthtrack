"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type User = {
    fullName: string;
    email: string;
    password: string;
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
    });
    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem("currentUser");
            router.push("/login");
        }
    if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    }
    }, [user]);


    return (
        <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
        <h1 className="text-3xl font-bold">
        Welcome{user ? `, ${user.fullName}` : ""}! 👋
        </h1>

        <p className="mt-4 text-gray-600">
        This is your personal health dashboard.
                </p>
                
                <button
                    onClick={handleLogout}
                    className="mt-8 rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition">
                    Log Out
                </button>
        </div>
        </main>
    );
}
