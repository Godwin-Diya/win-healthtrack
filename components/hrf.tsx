"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HealthRecord, User } from "@/types/health";

export default function HealthRecordForm() {
    const [glucose, setGlucose] = useState("");
    const [fasting, setFasting] = useState("yes");
    const [message, setMessage] = useState("");
    const router = useRouter();

    function getGlucoseStatus(
        glucoseValue: number,
        isFasting: string
    ) {
        if (isFasting === "yes") {
            if (glucoseValue < 70) {
                return "Low fasting blood glucose.";
            }

            if (glucoseValue <= 99) {
                return "Within the usual fasting range.";
            }

            if (glucoseValue <= 125) {
                return "Above the usual fasting range.";
            }

            return "High fasting blood glucose.";
        }

        if (glucoseValue < 70) {
            return "Low blood glucose.";
        }

        if (glucoseValue < 140) {
            return "Within the usual range for a non-fasting reading.";
        }

        if (glucoseValue < 200) {
            return "Above the usual range for a non-fasting reading.";
        }

        return "High blood glucose.";
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const glucoseValue = Number(glucose);

        if (
            !glucose ||
            Number.isNaN(glucoseValue) ||
            glucoseValue <= 0
        ) {
            setMessage("Please enter a valid blood glucose value.");
            return;
        }

        const result = getGlucoseStatus(glucoseValue, fasting);

        const newRecord: HealthRecord = {
            id: crypto.randomUUID(),
            glucose,
            fasting,
            date: new Date().toISOString(),
            result,
        };

        const savedUser = localStorage.getItem("currentUser");

        if (!savedUser) {
            return;
        }

        const currentUser: User = JSON.parse(savedUser);

        if (!currentUser.healthRecords) {
            currentUser.healthRecords = [];
        }

        currentUser.healthRecords.push(newRecord);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        const savedUsers = localStorage.getItem("users");

        if (!savedUsers) {
            setMessage("Health record saved successfully!");
            return;
        }

        const users: User[] = JSON.parse(savedUsers);

        const updatedUsers = users.map((user) => {
            if (user.email === currentUser.email) {
                return currentUser;
            }

            return user;
        });

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );

        setMessage("Health record saved successfully!");

        setGlucose("");
        setFasting("yes");

        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-xl">
                    🩺
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#0B2559]">
                        Check Blood Glucose
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        Enter your blood glucose reading to save it and receive
                        a quick interpretation.
                    </p>
                </div>
            </div>

            <div className="mt-7">
                <label
                    htmlFor="record-glucose"
                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                >
                    Blood Glucose (mg/dL)
                </label>

                <input
                    id="record-glucose"
                    type="number"
                    value={glucose}
                    required
                    onChange={(e) => setGlucose(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:bg-white focus:ring-4 focus:ring-[#EAF2FF]"
                    placeholder="Enter blood glucose"
                />
            </div>

            <div className="mt-5">
                <label
                    htmlFor="record-fasting"
                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                >
                    Was this a fasting reading?
                </label>

                <select
                    id="record-fasting"
                    value={fasting}
                    onChange={(e) => setFasting(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none transition focus:border-[#123B8C] focus:bg-white focus:ring-4 focus:ring-[#EAF2FF]"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-[#123B8C] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#0B2559] sm:w-auto"
            >
                Save Glucose Reading
            </button>

            {message && (
                <p className="mt-4 rounded-xl border border-blue-100 bg-[#EAF2FF] p-3 text-sm font-semibold text-[#123B8C]">
                    {message}
                </p>
            )}
        </form>
    );
}



