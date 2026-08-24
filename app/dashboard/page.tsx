"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HealthRecordForm from "@/components/hrf";
import DashboardSummary from "@/components/DS";
import RecentHealthChecks from "@/components/RHC";
import type { HealthRecord, User } from "@/types/health";
import EditHealthRecordForm from "@/components/EditHRF";
import GlucoseChart from "@/components/GlucoseChart";

export default function DashboardPage() {

    // 1. State
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [editingRecord, setEditingRecord] =
    useState<HealthRecord | null>(null);

    //2. Router 
    const router = useRouter();
    
    //3. useEffect
    useEffect(() => {
    if (!user) {
    router.replace("/login");
    }
    }, [user, router]);


    // 4. Functions
    function handleLogout() {
    localStorage.removeItem("currentUser");
    router.replace("/");
    }
    
    function handleDelete(id: string) {
    if (!user) {
    return;
    }

    const updatedHealthRecords =
    user.healthRecords?.filter((record) => record.id !== id) ?? [];

    const updatedUser = {
    ...user,
    healthRecords: updatedHealthRecords,
    };

    localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
    );

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
    const users: User[] = JSON.parse(savedUsers);

    const updatedUsers = users.map((existingUser) => {
        if (existingUser.email === user.email) {
        return updatedUser;
    }
    return existingUser;
    });
    localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
    );
    }
    setUser(updatedUser);
    }

    function handleEdit(record: HealthRecord) {
    setEditingRecord(record);
    }

    //5. Protection
    if (!user) {
    return null;
    }

    // 6. JSX
    return (
    <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">

        <div className="rounded-xl bg-white p-8 shadow-md">
            <h1 className="text-4xl font-bold">
            Welcome back
            {user ? `, ${user.fullName}` : ""}! 👋
            </h1>

            <p className="mt-3 text-gray-600">
            This is your personal health dashboard.
            </p>

            <div className="mt-6">
            <button
            onClick={() => router.push("/health-check")}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">
            🩺 Quick Health Check
            </button>
            </div>        

            <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border p-6">
  <h2 className="text-xl font-semibold">
    🩺 Blood Glucose
  </h2>

  {(() => {
    const glucoseRecords =
      (user.healthRecords ?? []).filter(
        (record) => record.glucose
      );

    const latest =
      glucoseRecords[glucoseRecords.length - 1];

    return latest ? (
      <>
        <p className="mt-4 text-3xl font-bold">
          {latest.glucose}
          <span className="ml-1 text-sm font-normal text-gray-500">
            mg/dL
          </span>
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Latest glucose reading
        </p>
      </>
    ) : (
      <p className="mt-3 text-gray-600">
        No glucose reading yet.
      </p>
    );
  })()}

  <button
    onClick={() => {
      const form = document.getElementById("glucose-form");

      if (form) {
        form.scrollIntoView({
          behavior: "smooth",
        });
      }
    }}
    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
  >
    Check Blood Glucose
  </button>
</div>

            <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
            🩸 Blood Pressure
            </h2>

            {(() => {
            const bloodPressureRecords =
            (user.healthRecords ?? []).filter(
            (record) =>
            record.systolic && record.diastolic
            );

            const latest =
            bloodPressureRecords[
            bloodPressureRecords.length - 1
            ];

            return latest ? (
            <>
            <p className="mt-4 text-3xl font-bold">
            {latest.systolic}/{latest.diastolic}
            <span className="ml-1 text-sm font-normal text-gray-500">
            mmHg
            </span>
            </p>

            <p className="mt-2 text-sm text-gray-600">
            Latest reading
            </p>
            </>
            ) : (
            <p className="mt-3 text-gray-600">
            No blood pressure reading yet.
            </p>
            );
            })()}

            <button
            onClick={() => router.push("/blood-pressure")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Check Blood Pressure
            </button>
            </div>
                        
            <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
            ⚖️ Body Mass Index
            </h2>

            {(() => {
            const bmiRecords =
            (user.healthRecords ?? []).filter(
            (record) => record.bmi
            );

            const latest =
            bmiRecords[bmiRecords.length - 1];

            return latest ? (
            <>
            <p className="mt-4 text-3xl font-bold">
            {latest.bmi}
            </p>

            <p className="mt-2 text-sm text-gray-600">
            Latest BMI reading
            </p>
            </>
            ) : (
            <p className="mt-3 text-gray-600">
            No BMI reading yet.
            </p>
            );
            })()}

            <button
            onClick={() => router.push("/bmi")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Calculate BMI
            </button>
            </div>
            </div>

            <RecentHealthChecks
            healthRecords={user.healthRecords ?? []}
            onDelete={handleDelete}
            onEdit={handleEdit}            
            />

            <GlucoseChart
            healthRecords={user.healthRecords ?? []}
            />
                    
            <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
            Blood Pressure History
            </h2>

            <p className="mt-2 text-sm text-gray-600">
            Your recorded blood pressure readings.
            </p>

            <div className="mt-6 space-y-3">
            {(user.healthRecords ?? [])
            .filter(
            (record) =>
            record.systolic && record.diastolic
            )
            .map((record) => (
            <div
            key={record.id}
            className="rounded-lg border p-4"
            >
            <p className="font-semibold">
            {record.systolic}/{record.diastolic} mmHg
            </p>

            <p className="mt-1 text-sm text-gray-600">
            {new Date(record.date).toLocaleDateString()}
            </p>
            </div>
            ))}
            </div>
            </div>
                    
            <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
            BMI History
            </h2>

            <p className="mt-2 text-sm text-gray-600">
            Your recorded body mass index readings.
            </p>

            <div className="mt-6 space-y-3">
            {(user.healthRecords ?? [])
            .filter(
            (record) =>
            record.bmi
            )
            .map((record) => (
            <div
            key={record.id}
            className="rounded-lg border p-4"
            >
            <p className="font-semibold">
            BMI: {record.bmi}
            </p>

            <p className="mt-1 text-sm text-gray-600">
            Weight: {record.weight} kg
            {" • "}
            Height: {record.height} cm
            </p>

            <p className="mt-1 text-sm text-gray-600">
            {new Date(record.date).toLocaleDateString()}
            </p>
            </div>
            ))}
            </div>
            </div>

            {editingRecord && (
            <EditHealthRecordForm
            record={editingRecord}
            onSave={(updatedRecord) => {
            if (!user) {
            return;
            }

    const updatedHealthRecords =
    user.healthRecords?.map((record) =>
        record.id === updatedRecord.id
        ? updatedRecord
        : record
    ) ?? [];

    const updatedUser = {
    ...user,
    healthRecords: updatedHealthRecords,
    };

    localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
    );

        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
        const users: User[] = JSON.parse(savedUsers);

        const updatedUsers = users.map((existingUser) => {
        if (existingUser.email === user.email) {
        return updatedUser;
        }

        return existingUser;
        });

        localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
        );
        }

        setUser(updatedUser);
        setEditingRecord(null);
        }}
            onCancel={() => setEditingRecord(null)}
            />
        )}

            <HealthRecordForm />
                    
            <button
            onClick={handleLogout}
            className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition"
            >
            Log Out
            </button>

        </div>

        </div>
    </main>
    );
}


