"use client";
import { useState } from "react";

export default function HealthCheckPage() {
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [result, setResult] = useState("");


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

        </div>
        </main>
    );
}