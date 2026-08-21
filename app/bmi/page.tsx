"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BMIPage() {
    const router = useRouter();

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [message, setMessage] = useState("");



    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!weight || !height) {
        setMessage("Please enter both weight and height.");
        return;
    }

    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (weightValue <= 0 || heightValue <= 0) {
        setMessage("Please enter valid weight and height values.");
        return;
    }

    const heightInMetres = heightValue / 100;
    const bmi = weightValue / (heightInMetres * heightInMetres);

    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
        router.replace("/login");
        return;
    }

    const currentUser = JSON.parse(savedUser);

    const newRecord = {
        id: crypto.randomUUID(),
        weight,
        height,
        bmi: bmi.toFixed(1),
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


    setWeight("");
    setHeight("");
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
            Body Mass Index
            </h1>

            <p className="mt-2 text-gray-600">
            Enter your weight and height to calculate your BMI.
            </p>

            <form
            onSubmit={handleSubmit}
            className="mt-8"
            >
            <div>
                <label className="mb-2 block font-medium">
                Weight (kg)
                </label>

                <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="e.g. 70"
                />
            </div>

            <div className="mt-6">
                <label className="mb-2 block font-medium">
                Height (cm)
                </label>

                <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-lg border p-3"
                placeholder="e.g. 175"
                />
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Calculate BMI
            </button>
            </form>

            {message && (
            <p className="mt-6 rounded-lg bg-gray-50 p-4 font-semibold text-gray-700">
                {message}
            </p>
            )}
        
        
                
                </div>
        </div>
    </main>);
}