"use client";

import { useState, useEffect } from "react";
import ResultCard from "@/components/ResultCard";

export default function HealthCheckPage() {
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [result, setResult] = useState("");
    const [isFasting, setIsFasting] = useState("");
    const [cardColor, setCardColor] = useState("bg-slate-50");
    const [explanation, setExplanation] = useState("");
    const [advice, setAdvice] = useState("");

    const [history, setHistory] = useState<
        {
            age: string;
            glucose: string;
            fasting: string;
            result: string;
        }[]
    >(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const savedHistory = localStorage.getItem("healthHistory");

        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem("healthHistory", JSON.stringify(history));
    }, [history]);

    function checkResult() {
        if (age === "" || glucose === "" || isFasting === "") {
            setResult(
                "⚠️ Please enter your age, blood glucose level and select whether the reading was taken while fasting."
            );
            setCardColor("bg-yellow-100");
            return;
        }

        if (Number(age) <= 0) {
            setResult("⚠️ Please enter a valid age greater than 0.");
            setCardColor("bg-yellow-100");
            return;
        }

        if (Number(glucose) <= 0) {
            setResult("⚠️ Please enter a valid blood glucose value.");
            setCardColor("bg-yellow-100");
            return;
        }

        if (isNaN(Number(age)) || isNaN(Number(glucose))) {
            setResult(
                "⚠️ Please enter valid numbers for age and blood glucose."
            );
            setCardColor("bg-yellow-100");
            return;
        }

        let resultMessage = "";
        let explanationMessage = "";
        let adviceMessage = "";
        let cardColorMessage = "bg-slate-50";

        const glucoseNumber = Number(glucose);

        if (isFasting === "yes") {
            if (glucoseNumber < 70) {
                resultMessage = "🟠 Lower than the expected fasting range.";

                explanationMessage =
                    "Your blood glucose reading is below the expected fasting range.";

                adviceMessage =
                    "If you have symptoms such as dizziness, sweating, or confusion, seek appropriate medical advice promptly.";

                cardColorMessage = "bg-yellow-100";
            } else if (glucoseNumber <= 99) {
                resultMessage = "🟢 Normal Blood Glucose";

                explanationMessage =
                    "Your fasting blood glucose reading is within the expected range.";

                adviceMessage =
                    "Continue maintaining a balanced diet, regular physical activity and healthy lifestyle habits.";

                cardColorMessage = "bg-green-100";
            } else {
                resultMessage = "🔴 Higher than the expected fasting range.";

                explanationMessage =
                    "Your fasting blood glucose reading is above the expected range.";

                adviceMessage =
                    "Consider monitoring your blood glucose regularly and discussing persistent high readings with a healthcare professional.";

                cardColorMessage = "bg-red-100";
            }
        } else {
            if (glucoseNumber < 70) {
                resultMessage = "🟠 Lower than the expected range.";

                explanationMessage =
                    "Your blood glucose reading is below the expected range.";

                adviceMessage =
                    "If you have symptoms such as dizziness, sweating, or confusion, seek appropriate medical advice promptly.";

                cardColorMessage = "bg-yellow-100";
            } else if (glucoseNumber <= 140) {
                resultMessage = "🟢 Within the expected non-fasting range.";

                explanationMessage =
                    "Your blood glucose reading is within the expected non-fasting range.";

                adviceMessage =
                    "Continue maintaining a balanced diet, regular physical activity and healthy lifestyle habits.";

                cardColorMessage = "bg-green-100";
            } else {
                resultMessage = "🔴 Higher than the expected non-fasting range.";

                explanationMessage =
                    "Your blood glucose reading is above the expected non-fasting range.";

                adviceMessage =
                    "Consider monitoring your blood glucose regularly and discussing persistent high readings with a healthcare professional.";

                cardColorMessage = "bg-red-100";
            }
        }

        setResult(resultMessage);
        setExplanation(explanationMessage);
        setAdvice(adviceMessage);
        setCardColor(cardColorMessage);

        setHistory((previousHistory) => [
            {
                age,
                glucose,
                fasting: isFasting,
                result: resultMessage,
            },
            ...previousHistory,
        ]);
    }

    function resetForm() {
        setAge("");
        setGlucose("");
        setIsFasting("");
        setResult("");
        setExplanation("");
        setAdvice("");
        setCardColor("bg-slate-50");
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">
                <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-2xl">
                            🩸
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                                Free health screening
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0B2559] sm:text-4xl">
                                Guest Blood Glucose Checker
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                                Check your blood glucose level without creating
                                an account. This quick tool provides general
                                guidance based on the information you enter.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                        <div className="rounded-2xl border border-blue-100 bg-[#F8FAFC] p-4 sm:p-6">
                            <h2 className="text-lg font-bold text-[#0B2559]">
                                Enter your reading
                            </h2>

                            <div className="mt-6">
                                <label
                                    htmlFor="age"
                                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                                >
                                    Age
                                </label>

                                <input
                                    id="age"
                                    type="number"
                                    placeholder="Enter your age"
                                    value={age}
                                    onChange={(event) =>
                                        setAge(event.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                />

                                {age && (
                                    <p className="mt-2 text-sm text-[#123B8C]">
                                        Your age is: {age}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5">
                                <label
                                    htmlFor="glucose"
                                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                                >
                                    Blood Glucose (mg/dL)
                                </label>

                                <input
                                    id="glucose"
                                    type="number"
                                    placeholder="e.g. 95"
                                    value={glucose}
                                    onChange={(event) =>
                                        setGlucose(event.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                                />
                            </div>

                            <div className="mt-6">
                                <p className="text-sm font-semibold text-[#0B2559]">
                                    Was this reading taken while fasting?
                                </p>

                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition hover:border-[#123B8C]">
                                        <input
                                            type="radio"
                                            name="fasting"
                                            value="yes"
                                            checked={isFasting === "yes"}
                                            onChange={(event) =>
                                                setIsFasting(
                                                    event.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-[#123B8C]"
                                        />
                                        Yes, fasting
                                    </label>

                                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition hover:border-[#123B8C]">
                                        <input
                                            type="radio"
                                            name="fasting"
                                            value="no"
                                            checked={isFasting === "no"}
                                            onChange={(event) =>
                                                setIsFasting(
                                                    event.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-[#123B8C]"
                                        />
                                        No, non-fasting
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={checkResult}
                                    className="w-full rounded-xl bg-[#123B8C] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#0B2559]"
                                >
                                    Check Result
                                </button>

                                <button
                                    onClick={resetForm}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#0B2559] transition hover:bg-[#EAF2FF]"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-[#EAF2FF] p-4 sm:p-6">
                            <h2 className="text-lg font-bold text-[#0B2559]">
                                About this checker
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#64748B]">
                                Enter your age, glucose reading and fasting
                                status to receive a quick interpretation.
                            </p>

                            <div className="mt-5 rounded-xl bg-white/80 p-4">
                                <p className="text-sm font-semibold text-[#123B8C]">
                                    Important
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    This tool is for general information and
                                    does not replace professional medical
                                    assessment.
                                </p>
                            </div>

                            {result && (
                                <div className="mt-5">
                                    <ResultCard
                                        result={result}
                                        explanation={explanation}
                                        advice={advice}
                                        cardColor={cardColor}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {history.length > 0 && (
                    <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                                Your activity
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                                Recent Checks
                            </h2>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Your recent guest glucose checks are stored in
                                this browser.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-bold text-[#0B2559]">
                                            Check {history.length - index}
                                        </p>

                                        <span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold text-[#123B8C]">
                                            {item.fasting === "yes"
                                                ? "Fasting"
                                                : "Non-fasting"}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                                        <p>
                                            <strong className="text-[#0B2559]">
                                                Age:
                                            </strong>{" "}
                                            {item.age}
                                        </p>

                                        <p>
                                            <strong className="text-[#0B2559]">
                                                Blood Glucose:
                                            </strong>{" "}
                                            {item.glucose} mg/dL
                                        </p>

                                        <p>
                                            <strong className="text-[#0B2559]">
                                                Result:
                                            </strong>{" "}
                                            {item.result}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}