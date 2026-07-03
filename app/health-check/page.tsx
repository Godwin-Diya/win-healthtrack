"use client";
import { useState } from "react";

export default function HealthCheckPage() {
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [result, setResult] = useState("");

    function checkResult() {
        const glucoseNumber = Number(glucose);
        if (glucoseNumber < 70) {
            setResult("🟠 Low Blood Glucose");
        } else if (glucoseNumber <= 99) {
            setResult("🟢 Normal Blood Glucose");
        } else {
            setResult("🔴 High Blood Glucose");
        }
    }

    <p className="mt-6 text-center text-xl font-semibold text-green-700">
        {result}
    </p>

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
                    <button
                        onClick={checkResult}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg mt-6 hover:bg-blue-800">
                        Check Result
                    </button>

                    <p className="mt-6 text-center text-xl font-semibold text-green-700">
                        {result}
                    </p>
                    


            </div>

        </div>
        </main>
    );
}