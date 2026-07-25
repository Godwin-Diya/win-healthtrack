"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HealthRecordForm from "@/components/hrf";

    type User = {
    fullName: string;
    email: string;
    password: string;
    };

export default function DashboardPage() {

    // 1. State
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
    });

    //2. Router 
    const router = useRouter();
    
    //3. useEffect
    useEffect(() => {
    if (!user) {
    router.replace("/login");
    }
    }, [user, router]);


    // 4. Functions
    function handleLogout() {
    localStorage.removeItem("currentUser");
    router.replace("/");
    }

    //5. Protection
    if (!user) {
    return null;
    }

    // 6. JSX
    return (
    <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">

        <div className="rounded-xl bg-white p-8 shadow-md">
            <h1 className="text-4xl font-bold">
            Welcome back
            {user ? `, ${user.fullName}` : ""}! 👋
            </h1>

            <p className="mt-3 text-gray-600">
            This is your personal health dashboard.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border p-6">
                <h2 className="text-xl font-semibold">
                🩺 Blood Glucose
                </h2>

                <p className="mt-3 text-gray-600">
                No health checks yet.
                </p>
            </div>


            <div className="rounded-xl border p-6">
                <h2 className="text-xl font-semibold">
                🩸 Blood Pressure
                </h2>

                <p className="mt-3 text-gray-600">
                No readings available yet.
                </p>
            </div>

            </div>


            <div className="mt-8 rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
                Recent Health Checks
            </h2>

            <p className="mt-3 text-gray-600">
                Your health history will appear here.
            </p>
            </div>

        <HealthRecordForm />
            <button
            onClick={handleLogout}
            className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition"
            >
            Log Out
            </button>

        </div>

        </div>
    </main>
    );
}