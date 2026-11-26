"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HealthRecordForm() {
    const [glucose, setGlucose] = useState("");
    const [fasting, setFasting] = useState("yes");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Default test date and time to the current local date and time.
    const [testedDate, setTestedDate] = useState(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    });

    const [testedTime, setTestedTime] = useState(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        return `${hours}:${minutes}`;
    });

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

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setMessage("");

        const glucoseValue = Number(glucose);

        if (
            !glucose ||
            Number.isNaN(glucoseValue) ||
            glucoseValue <= 0
        ) {
            setMessage("Please enter a valid blood glucose value.");
            return;
        }

        // Use the selected test date/time, or the current time
        // if either optional field is left blank.
        const selectedTestDateTime =
            testedDate && testedTime
                ? new Date(`${testedDate}T${testedTime}`)
                : new Date();

        if (Number.isNaN(selectedTestDateTime.getTime())) {
            setMessage("Please enter a valid test date and time.");
            return;
        }

        setLoading(true);

        try {
            // Get the currently authenticated Supabase user.
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setMessage("Your session has expired. Please log in again.");
                router.push("/login");
                return;
            }

            // Interpret the glucose reading.
            const result = getGlucoseStatus(glucoseValue, fasting);

            // Save the reading to Supabase.
            const { error: insertError } = await supabase
                .from("health_records")
                .insert({
                    user_id: user.id,
                    glucose: glucoseValue,
                    fasting,
                    result,
                    tested_at: selectedTestDateTime.toISOString(),
                });

            if (insertError) {
                console.error("Glucose record error:", insertError);
                setMessage("Unable to save your reading. Please try again.");
                return;
            }

            setMessage("Health record saved successfully!");

            setGlucose("");
            setFasting("yes");

            router.refresh();
        } catch (error) {
            console.error("Unexpected error:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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
                    min="0.1"
                    step="any"
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

            {/* Optional test date and time */}
            <div className="mt-5 rounded-2xl border border-blue-100 bg-[#F8FAFC] p-4">
                <h3 className="text-sm font-bold text-[#0B2559]">
                    When was this test performed?
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    These fields are optional. You can change them if the
                    test was performed earlier.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="glucose-test-date"
                            className="mb-2 block text-sm font-semibold text-[#0B2559]"
                        >
                            Test Date
                        </label>

                        <input
                            id="glucose-test-date"
                            type="date"
                            value={testedDate}
                            onChange={(e) => setTestedDate(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="glucose-test-time"
                            className="mb-2 block text-sm font-semibold text-[#0B2559]"
                        >
                            Test Time
                        </label>

                        <input
                            id="glucose-test-time"
                            type="time"
                            value={testedTime}
                            onChange={(e) => setTestedTime(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-[#123B8C] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#0B2559] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
                {loading ? "Saving Reading..." : "Save Glucose Reading"}
            </button>

            {message && (
                <p className="mt-4 rounded-xl border border-blue-100 bg-[#EAF2FF] p-3 text-sm font-semibold text-[#123B8C]">
                    {message}
                </p>
            )}
        </form>
    );
}
