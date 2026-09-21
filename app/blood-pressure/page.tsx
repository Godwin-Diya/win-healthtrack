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

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!systolic || !diastolic) {
            setMessage(
                "Please enter both blood pressure values."
            );
            return;
        }

        const systolicValue = Number(systolic);
        const diastolicValue = Number(diastolic);

        if (
            Number.isNaN(systolicValue) ||
            Number.isNaN(diastolicValue) ||
            systolicValue <= 0 ||
            diastolicValue <= 0
        ) {
            setMessage(
                "Please enter valid blood pressure values."
            );
            return;
        }

        const status = getBloodPressureStatus(
            systolicValue,
            diastolicValue
        );

        const savedUser =
            localStorage.getItem("currentUser");

        if (!savedUser) {
            router.replace("/login");
            return;
        }

        const currentUser = JSON.parse(savedUser);

        const newRecord = {
            id: crypto.randomUUID(),
            systolic,
            diastolic,
            bloodPressureResult: status,
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

        const savedUsers =
            localStorage.getItem("users");

        if (savedUsers) {
            const users = JSON.parse(savedUsers);

            const updatedUsers = users.map(
                (existingUser: { email: string }) => {
                    if (
                        existingUser.email ===
                        currentUser.email
                    ) {
                        return currentUser;
                    }

                    return existingUser;
                }
            );

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
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">
                <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg sm:p-8 lg:p-10">

                    <button
                        onClick={() =>
                            router.push("/dashboard")
                        }
                        className="mb-7 rounded-lg px-2 py-1 text-sm font-semibold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-3xl">
                            ❤️
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#123B8C]">
                                Health Measurement
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0B2559] sm:text-4xl">
                                Blood Pressure
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
                                Record your blood pressure reading
                                and keep it in your health history.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-[#EAF2FF] p-5">
                        <p className="text-sm leading-6 text-[#0B2559]">
                            Enter the two numbers from your blood
                            pressure reading. Your systolic and
                            diastolic values will be saved together
                            in your health records.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                    Systolic
                                    <span className="ml-1 font-normal text-[#64748B]">
                                        (mmHg)
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={systolic}
                                    required
                                    min="1"
                                    onChange={(e) =>
                                        setSystolic(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-lg font-semibold text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="120"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                    Diastolic
                                    <span className="ml-1 font-normal text-[#64748B]">
                                        (mmHg)
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={diastolic}
                                    required
                                    min="1"
                                    onChange={(e) =>
                                        setDiastolic(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-lg font-semibold text-[#0B2559] outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="80"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-7 w-full rounded-xl bg-[#123B8C] px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-[#0B2559] hover:shadow-lg sm:w-auto"
                        >
                            Save Blood Pressure Reading
                        </button>
                    </form>

                    {message && (
                        <div className="mt-6 rounded-xl border border-blue-100 bg-[#EAF2FF] p-4">
                            <p className="text-sm font-semibold leading-6 text-[#0B2559]">
                                {message}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}