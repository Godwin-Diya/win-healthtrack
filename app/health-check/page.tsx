"use client";
import { useState, useEffect } from "react";
import ResultCard from "@/components/ResultCard"; 
import Link from "next/link";

export default function HealthCheckPage() {
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [result, setResult] = useState("");
    const [isFasting, setIsFasting] = useState("");
    const [cardColor, setCardColor] = useState("bg-gray-100");
    const [explanation, setExplanation] = useState("");
    const [advice, setAdvice] = useState("");
    const [history, setHistory] = useState<{
        age: string;
        glucose: string;
        fasting: string;
        result: string;
    }[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }
    
        const savedHistory =
            localStorage.getItem("healthHistory");
        
        return savedHistory ?
            JSON.parse(savedHistory) : [];
    });
    
    useEffect(() => {
        localStorage.setItem(
            "healthHistory",
            JSON.stringify(history)
        );
    }, [history]);

    function checkResult() {
        if (age === "" || glucose === "") {
            setResult("⚠️ Please enter both your age, blood glucose level and whether the reading was taken while fasting.");
            setCardColor("bg-yellow-100");
            return;
        }
        
        if (Number(age) <= 0) {
            setResult("⚠️ Please enter a valid age greater than 0.")
            setCardColor("bg-yellow-100");
            return;
        }

        if (Number(glucose) <= 0) {
            setResult("⚠️ Please enter a valid blood glucose value.");
            return;
        }

        if (isNaN(Number(age)) ||
            isNaN(Number(glucose))) {
            setResult("⚠️ Please enter valid numbers for age and blood glucose.");
            setCardColor("bg-yellow-100");
            return;
        }
        

        let resultMessage = "";
        let explanationMessage = "";
        let adviceMessage = "";
        let cardColorMessage = "bg-gray-100";
        const glucoseNumber = Number(glucose);

        if (isFasting === "yes") {
            if (glucoseNumber < 70) {
                resultMessage = "🟠 lower than the expexcted fasting range.";

                explanationMessage = "Your blood glucose reading is below the expected fasting range.";

                adviceMessage = "If you have symptoms such as dizziness, sweating, or confusion, seek appropriate medical advice promptly.";

                setCardColor("bg-yellow-100");

            } else if (glucoseNumber <= 99) {
                resultMessage = "🟢 Normal Blood Glucose";

                explanationMessage = "Your fasting blood glucose reading is within the expected range.";

                adviceMessage = "Continue maintaining a balanced diet, regular physical activity and healthy lifestyle habits.";
                
                cardColorMessage = "bg-green-100"
            } else {
                resultMessage = "🔴 Higher than the expected fasting range.";

                explanationMessage = "Your fasting blood glucose reading is above the expected range.";

                adviceMessage = "Consider monitoring your blood glucode regularly and discussing persistent high readings with a healthcare professional.";

                setCardColor("bg-red-100");
            }
        } else {
            if (glucoseNumber < 70) {
                resultMessage = "🟠 Lower than the expected range.";

                explanationMessage = "Your blood glucose reading is below the expected fasting range.";

                adviceMessage = "If you have symptoms such as dizziness, sweating, or confusion, seek appropriate medical advice promptly.";

                setCardColor("bg-yellow-100");

            } else if (glucoseNumber <= 140) {
                resultMessage = "🟢 Within the expected non-fasting range."

                explanationMessage = "Your fasting blood glucose reading is within the expected range.";

                adviceMessage = "Continue maintaining a balanced diet, regular physical activity and healthy lifestyle habits.";

                setCardColor("bg-green-100");

            } else {
                resultMessage = "🔴 Higher than the expected non-fasting range."

                explanationMessage = "Your fasting blood glucose reading is above the expected range.";

                adviceMessage = "Consider monitoring your blood glucode regularly and discussing persistent high readings with a healthcare professional.";

                setCardColor("bg-red-100");
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
        setCardColor("bg-gray-100");
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-blue-700">
                    Guest Blood Glucose Checker
                </h1>

                <p className="mt-4 text-gray-600">
                    Check your blood glucose level without creating an account.
                </p>
                <div className="mt-6">

                    <label className="font-medium">
                        Age
                    </label>

                    <input
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        className="w-full border rounded-lg p-3 mt-2" />
                    <p className="mt-4 text-blue-700">
                        Your age is: {age}
                    </p>
                </div>

                <div className="mt-6">
                    <label className="font-medium">
                        Blood Glucose (mg/dL)
                    </label>

                    <input
                        type="number"
                        placeholder="e.g. 95"
                        value={glucose}
                        onChange={(event) =>
                            setGlucose(event.target.value)}
                        className="w-full mt-2 p-3 border rounded-lg"
                    />
                
                    <div className="mt-6">
                        <p className="font-medium">
                            Was this blood glucose reading taken while fasting?
                        </p>

                        <label className="flex items-center mt-3">
                            <input
                                type="radio"
                                name="fasting"
                                value="yes"
                                checked={isFasting === "yes"}
                                onChange={(event) =>
                                    setIsFasting(event.target.value)}
                            />
                            <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-center mt-2">
                            <input
                                type="radio"
                                name="fasting"
                                value="no"
                                checked={isFasting === "no"}
                                onChange={(event) =>
                                    setIsFasting(event.target.value)}
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                    <button
                        onClick={checkResult}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg mt-6 hover:bg-blue-800">
                        Check Result
                    </button>
                
                    <button
                        onClick={resetForm}
                        className="w-full mt-3 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700">
                        Reset
                    </button>

                    {result && (
                        <ResultCard
                            result={result}
                            explanation={explanation}
                            advice={advice}
                            cardColor={cardColor}
                        />
                    )}

                </div>

                {history.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">
                            Recent Checks
                        </h2>
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 mb-3">
                                            
                                <p><strong>Age:</strong>
                                    {item.age}</p>
                                            
                                <p><strong>Blood Glucose:</strong>
                                    {item.glucose} mg/dL</p>
                                            
                                <p><strong>Fasting:</strong>{""}
                                    {item.fasting === "yes" ? "Yes" : "No"}
                                </p>

                                <p><strong>Result:</strong>{item.result}</p>
                            </div>
                        ))}
                    
                    </div>
                )}
            </div>
        </main>
    );
}