"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getLocalTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

export default function BMIPage() {
    const router = useRouter();

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [testedDate, setTestedDate] = useState(getLocalDate);
    const [testedTime, setTestedTime] = useState(getLocalTime);
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    function getBMIStatus(bmi: number) {
        if (bmi < 18.5) {
            return "This is below the usual healthy BMI range.";
        }

        if (bmi < 25) {
            return "This is within the usual healthy BMI range.";
        }

        if (bmi < 30) {
            return "This is above the usual healthy BMI range.";
        }

        return "This is in the obesity range.";
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");

        if (!weight || !height) {
            setMessage("Please enter both weight and height.");
            return;
        }

        const weightValue = Number(weight);
        const heightValue = Number(height);

        if (
            !Number.isFinite(weightValue) ||
            !Number.isFinite(heightValue) ||
            weightValue <= 0 ||
            heightValue <= 0
        ) {
            setMessage(
                "Please enter valid weight and height values."
            );
            return;
        }

        const heightInMetres = heightValue / 100;

        const bmi =
            weightValue /
            (heightInMetres * heightInMetres);

        const status = getBMIStatus(bmi);

        // Use the selected test date and time.
        // If either field is left blank, use the current local value.
        const dateToUse = testedDate || getLocalDate();
        const timeToUse = testedTime || getLocalTime();

        const selectedTestDateTime = new Date(
            `${dateToUse}T${timeToUse}:00`
        );

        if (Number.isNaN(selectedTestDateTime.getTime())) {
            setMessage("Please enter a valid test date and time.");
            return;
        }

        setIsSaving(true);

        try {
            // Get the currently logged-in Supabase user.
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
                router.replace("/login");
                return;
            }

            // Save the BMI record to Supabase.
            const { error: insertError } = await supabase
                .from("health_records")
                .insert({
                    user_id: user.id,
                    weight: weightValue,
                    height: heightValue,
                    bmi: Number(bmi.toFixed(1)),
                    bmi_result: status,
                    tested_at: selectedTestDateTime.toISOString(),
                    recorded_at: new Date().toISOString(),
                });

            if (insertError) {
                console.error("BMI save error:", insertError);

                setMessage(
                    "Unable to save your BMI record. Please try again."
                );
                return;
            }

            setMessage(
                `Your BMI is ${bmi.toFixed(1)}. ${status}`
            );

            setWeight("");
            setHeight("");
            setTestedDate(getLocalDate());
            setTestedTime(getLocalTime());
        } catch (error) {
            console.error("Unexpected error:", error);

            setMessage(
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">

                <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-lg sm:p-8">

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="mb-6 rounded-lg px-2 py-2 text-sm font-semibold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="flex items-start gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-2xl">
                            ⚖️
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                                Body measurement
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0B2559] sm:text-4xl">
                                Body Mass Index
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-[#64748B] sm:text-base">
                                Enter your weight and height to calculate your
                                BMI and save the result to your health records.
                            </p>
                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >

                        <div className="grid gap-5 sm:grid-cols-2">

                            <div>
                                <label
                                    htmlFor="weight"
                                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                                >
                                    Weight (kg)
                                </label>

                                <input
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    value={weight}
                                    required
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:bg-white focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="e.g. 70"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="height"
                                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                                >
                                    Height (cm)
                                </label>

                                <input
                                    id="height"
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    value={height}
                                    required
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:bg-white focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="e.g. 175"
                                />
                            </div>

                        </div>

                        {/* Test date and time */}

                        <div className="mt-7 rounded-2xl border border-blue-100 bg-slate-50 p-5">

                            <h2 className="text-base font-bold text-[#0B2559]">
                                When was this measurement taken?
                            </h2>

                            <p className="mt-1 text-sm text-[#64748B]">
                                You can change these details or leave them
                                as they are.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                        Test Date (Optional)
                                    </label>

                                    <input
                                        type="date"
                                        value={testedDate}
                                        onChange={(e) => setTestedDate(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-[#0B2559] outline-none focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#0B2559]">
                                        Test Time (Optional)
                                    </label>

                                    <input
                                        type="time"
                                        value={testedTime}
                                        onChange={(e) => setTestedTime(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-[#0B2559] outline-none focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                    />
                                </div>

                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="mt-6 w-full rounded-xl bg-[#123B8C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#0B2559] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {isSaving
                                ? "Saving BMI..."
                                : "Calculate BMI"}
                        </button>

                    </form>

                    {message && (
                        <div className="mt-6 rounded-2xl border border-blue-100 bg-[#EAF2FF] p-4">
                            <p className="font-semibold leading-6 text-[#123B8C]">
                                {message}
                            </p>
                        </div>
                    )}

                    <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-4">

                        <p className="text-sm font-semibold text-[#0B2559]">
                            About BMI
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            BMI is a general measurement based on weight and
                            height. It does not account for every factor that
                            affects individual health.
                        </p>

                    </div>

                </section>

            </div>
        </main>
    );
}
