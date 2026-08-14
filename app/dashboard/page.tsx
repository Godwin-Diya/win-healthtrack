"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HealthRecordForm from "@/components/hrf";
import DashboardSummary from "@/components/DS";
import RecentHealthChecks from "@/components/RHC";
import type { HealthRecord, User } from "@/types/health";
import EditHealthRecordForm from "@/components/EditHRF";
import GlucoseChart from "@/components/GlucoseChart";

export default function DashboardPage() {

    // 1. State
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [editingRecord, setEditingRecord] =
    useState<HealthRecord | null>(null);

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
    
    function handleDelete(id: string) {
    if (!user) {
    return;
    }

    const updatedHealthRecords =
    user.healthRecords?.filter((record) => record.id !== id) ?? [];

    const updatedUser = {
    ...user,
    healthRecords: updatedHealthRecords,
    };

    localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
    );

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
    const users: User[] = JSON.parse(savedUsers);

    const updatedUsers = users.map((existingUser) => {
        if (existingUser.email === user.email) {
        return updatedUser;
    }
    return existingUser;
    });
    localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
    );
    }
    setUser(updatedUser);
    }

    function handleEdit(record: HealthRecord) {
    setEditingRecord(record);
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

            <DashboardSummary
            healthRecords={user.healthRecords ?? []}
            />


            <div className="rounded-xl border p-6">
                <h2 className="text-xl font-semibold">
                🩸 Blood Pressure
                </h2>

                <p className="mt-3 text-gray-600">
                No readings available yet.
                </p>
            </div>

            </div>

            <RecentHealthChecks
            healthRecords={user.healthRecords ?? []}
            onDelete={handleDelete}
            onEdit={handleEdit}            
            />

            <GlucoseChart
            healthRecords={user.healthRecords ?? []}
            />

            {editingRecord && (
            <EditHealthRecordForm
            record={editingRecord}
            onSave={(updatedRecord) => {
            if (!user) {
            return;
            }

    const updatedHealthRecords =
    user.healthRecords?.map((record) =>
        record.id === updatedRecord.id
        ? updatedRecord
        : record
    ) ?? [];

    const updatedUser = {
    ...user,
    healthRecords: updatedHealthRecords,
    };

    localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
    );

        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
        const users: User[] = JSON.parse(savedUsers);

        const updatedUsers = users.map((existingUser) => {
        if (existingUser.email === user.email) {
        return updatedUser;
        }

        return existingUser;
        });

        localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
        );
        }

        setUser(updatedUser);
        setEditingRecord(null);
        }}
            onCancel={() => setEditingRecord(null)}
            />
        )}

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