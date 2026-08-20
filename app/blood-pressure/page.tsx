"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BloodPressurePage() {
    const router = useRouter();

    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [message, setMessage] = useState("");


    function getBloodPressureStatus(
    systolic: number,
    diastolic: number
    ) {
    if (systolic < 90 || diastolic < 60) {
        return "Low blood pressure.";
    }

    if (systolic < 120 && diastolic < 80) {
        return "Your blood pressure is in the normal range.";
    }

    if (systolic < 130 && diastolic < 80) {
        return "Your blood pressure is slightly elevated.";
    }

    if (systolic < 140 || diastolic < 90) {
        return "Your blood pressure is in the high range.";
    }

        return "Your blood pressure is very high. Consider discussing this reading with a healthcare professional.";
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!systolic || !diastolic) {
        setMessage("Please enter both blood pressure values.");
        return;
    }

    
    const systolicValue = Number(systolic);
    const diastolicValue = Number(diastolic);
    const status = getBloodPressureStatus(
    systolicValue,
    diastolicValue
    );    
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
        router.replace("/login");
        return;
    }

    const currentUser = JSON.parse(savedUser);

    const newRecord = {
        id: crypto.randomUUID(),
        systolic,
        diastolic,
        date: new Date().toISOString(),
    };

    if (!currentUser.healthRecords) {
        currentUser.healthRecords = [];
    }

    currentUser.healthRecords.push(newRecord);

    localStorage.setItem(
    "currentUser",
    JSON.stringify(currentUser)
    );

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
    const users = JSON.parse(savedUsers);

    const updatedUsers = users.map((existingUser: {
    email: string;
        }) => {
        if (existingUser.email === currentUser.email) {
        return currentUser;
        }

    return existingUser;
    });

    localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
    );
    }

    setSystolic("");
    setDiastolic("");
    setMessage(`Reading saved. ${status}`);
    } 

    return (
    <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-8 shadow-md">

            <button
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-sm font-semibold text-blue-600 hover:underline"
            >
            ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold">
            Blood Pressure
            </h1>

            <p className="mt-2 text-gray-600">
            Record your blood pressure reading.
            </p>

            <form
            onSubmit={handleSubmit}
            className="mt-8"
            >

            <div>
                <label className="mb-2 block font-medium">
                Systolic (mmHg)
                </label>

                <input
                type="number"
                value={systolic}
                onChange={(e) =>
                    setSystolic(e.target.value)
                }
                className="w-full rounded-lg border p-3"
                placeholder="e.g. 120"
                />
            </div>

            <div className="mt-6">
                <label className="mb-2 block font-medium">
                Diastolic (mmHg)
                </label>

                <input
                type="number"
                value={diastolic}
                onChange={(e) =>
                    setDiastolic(e.target.value)
                }
                className="w-full rounded-lg border p-3"
                placeholder="e.g. 80"
                />
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Save Reading
            </button>

            </form>

            {message && (
            <p className="mt-4 text-sm font-medium text-gray-700">
                {message}
            </p>
            )}

        </div>
        </div>
        </main>);
}