"use client";
import { useState } from "react";

export default function HealthCheckPage() {
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [result, setResult] = useState("");
    const [isFasting, setIsFasting] = useState("");
    const [cardColor, setCardColor] = useState("bg-gray-100");
    const [explanation, setExplanation] = useState("");
    const [advice, setAdvice] = useState("");

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
        const glucoseNumber = Number(glucose);

        if (isFasting === "yes") {
            if (glucoseNumber < 70) {
                setResult(
                    "🟠 lower than the expexcted fasting range."
                );
                setCardColor("bg-yellow-100");
            } else if (glucoseNumber <= 99) {
                setResult(
                    "🟢 Normal Blood Glucose.");
                setExplanation(
                    "Your fasting blood glucose reading is within the expexcted range."
                );

                setAdvice(
                    "Continue maintaining a balanced diet, regular, physical activity and healthy lifestyle habits."
                );
                setCardColor("bg-green-100");
            } else {
                setResult(
                    "🔴 Higher than the expected fasting range."
                );
                setCardColor("bg-red-100");
            }
        } else {
            if (glucoseNumber < 70) {
                setResult(
                    "🟠 Lower than the expected range."
                );
                setCardColor("bg-yellow-100");
            } else if (glucoseNumber <= 140) {
                setResult(
                    "🟢 Within the expected non-fasting range."
                );
                setCardColor("bg-green-100");
            } else {
                setResult(
                    "🔴 Higher than the expected non-fasting range."
                );
                setCardColor("bg-red-100");
            }
        }
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
                <label className="block font-medium">
                    Age 
                </label>

            <input  
        type="number"
            placeholder="Enter your age"
            value={age}
            onChange={ (event) => setAge(event.target.value)}
            className="w-full border rounded-lg p-3 mt-2" />
            <p className="mt-4 text-blue-700">
                Your age is: {age}
            </p>
            </div>

            <div className="mt-6">
                <label className="block font-medium">
                    Blood Glucose (mg/dL) 
                </label>

                <input 
                        type="number"
                        placeholder="Enter your blood glucose"
                        value={glucose}
                        onChange={(event) => 
                            setGlucose(event.target.value)}
                        className="w-full border rounded-lg p-3 mt-2"
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
                    <div className={`mt-6 rounded-xl border p-5 shadow-md ${cardColor}`}>
                <h2 className="text-2xl font-bold">
                            {result}
                        </h2>
                        
                <div className="mt-4">
                <h3 className="font-semibold">
                📖 Meaning
                </h3>

                <p className="mt-3 text-gray-700">
                {explanation}
                </p>
                </div>    
                        
                        <div className="mt-4">
                            <h3 className="font-semibold">
                                💡Recommendation
                            </h3>
                <p className="text-gray-700"> {advice}
                            </p>
                        </div>
                        
                        <div className="mt-5 text-sm text-gray-500">
                            ⚠️ This tool provides health education and awareness. It does not replace professional medical advice.
                        </div>
                

            </div>
        )}
                    


            </div>

        </div>
        </main>
    );
}