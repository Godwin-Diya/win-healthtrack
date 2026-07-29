"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type HealthRecord = {
    glucose: string;
    fasting: string;
};

type User = {
    fullName: string;
    email: string;
    password: string;
    healthRecords?: HealthRecord[];
};
    
export default function HealthRecordForm() {
    const [glucose, setGlucose] = useState("");
    const [fasting, setFasting] = useState("yes");
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newRecord: HealthRecord = {
            glucose,
            fasting,

        };

        const savedUser = localStorage.getItem("currentUser");

            if(!savedUser) {
                return;
            }

        const currentUser: User = JSON.parse(savedUser);

        if (!currentUser.healthRecords) {
    currentUser.healthRecords = [];
}

        currentUser.healthRecords.push(newRecord);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        const savedUsers = localStorage.getItem("users");
    if (!savedUsers) {
    return;
    }

        const users: User[] = JSON.parse(savedUsers);
        const updatedUsers = users.map((user) => {
    if (user.email === currentUser.email) {
    return currentUser;
    }

    return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        router.refresh();
        
        setGlucose("");
        setFasting("yes");
    }

        return (
            <form
                onSubmit={handleSubmit}
                className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
            >
                <h2 className="text-2xl font-bold">
                    Add Health Record
                </h2>

                <div className="mt-6">
                    <label className="mb-2 block font-medium">
                        Blood Glucose (mg/dL)
                    </label>

                    <input
                        type="number"
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        placeholder="Enter blood glucose"
                    />
                </div>

                <div className="mt-6">
                    <label className="mb-2 block font-medium">
                        Was this a fasting reading?
                    </label>

                    <select
                        value={fasting}
                        onChange={(e) => setFasting(e.target.value)}
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Save Record
                </button>
            </form>
        );
    }
