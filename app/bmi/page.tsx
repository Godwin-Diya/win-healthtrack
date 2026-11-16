
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BMIPage() {
    const router = useRouter();

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
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

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
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
                    recorded_at: new Date().toISOString(),
                });

            if (insertError) {
                console.error(
                    "BMI save error:",
                    insertError
                );

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
        } catch (error) {
            console.error(
                "Unexpected error:",
                error
            );

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
                                    onChange={(e) =>
                                        setWeight(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setHeight(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:bg-white focus:ring-4 focus:ring-[#EAF2FF]"
                                    placeholder="e.g. 175"
                                />
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
