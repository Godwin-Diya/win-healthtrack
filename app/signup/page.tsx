"use client";
import { useState } from "react";       

export default function SignUpPage()
{
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("")


    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-xl border p-8 shadow-md">

                <h1 className="text-3xl font-bold text-center">
                    Create Your account
                </h1>

                <p className="mt-3 text-center text-gray-600">
                    Welcome to Win HealthTrack.
                    Start tracking your health today.
                </p>
                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                            setFullname(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 font-medium">
                        Email Address     
                    </label>

                    <input
                        type="email"
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounde-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
            </div>

        </main>
    );
}