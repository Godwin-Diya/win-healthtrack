"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HealthRecordForm from "@/components/hrf";
import RecentHealthChecks from "@/components/RHC";
import EditHealthRecordForm from "@/components/EditHRF";
import GlucoseChart from "@/components/GlucoseChart";

import type { HealthRecord, User } from "@/types/health";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === "undefined") {
            return null;
        }

        const savedUser =
            window.localStorage.getItem("currentUser");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [editingRecord, setEditingRecord] =
        useState<HealthRecord | null>(null);

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    function handleLogout() {
        localStorage.removeItem("currentUser");
        router.replace("/");
    }

    function handleDelete(id: string) {
        if (!user) {
            return;
        }

        const updatedHealthRecords =
            user.healthRecords?.filter(
                (record) => record.id !== id
            ) ?? [];

        const updatedUser = {
            ...user,
            healthRecords: updatedHealthRecords,
        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(updatedUser)
        );

        const savedUsers =
            localStorage.getItem("users");

        if (savedUsers) {
            const users: User[] = JSON.parse(savedUsers);

            const updatedUsers = users.map(
                (existingUser) => {
                    if (
                        existingUser.email ===
                        user.email
                    ) {
                        return updatedUser;
                    }

                    return existingUser;
                }
            );

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

    if (!user) {
        return null;
    }

    const glucoseRecords =
        (user.healthRecords ?? []).filter(
            (record) => record.glucose
        );

    const latestGlucose =
        glucoseRecords[glucoseRecords.length - 1];

    const bloodPressureRecords =
        (user.healthRecords ?? []).filter(
            (record) =>
                record.systolic &&
                record.diastolic
        );

    const latestBloodPressure =
        bloodPressureRecords[
            bloodPressureRecords.length - 1
        ];

    const bmiRecords =
        (user.healthRecords ?? []).filter(
            (record) => record.bmi
        );

    const latestBMI =
        bmiRecords[bmiRecords.length - 1];

    return (
        <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">

                {/* Welcome section */}
                <section className="rounded-3xl bg-[#0B2559] px-6 py-8 shadow-lg sm:px-8 lg:px-10 lg:py-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-blue-200">
                                Personal Health Dashboard
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Welcome back, {user.fullName}! 👋
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                                Keep track of your important health
                                measurements and understand your progress.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                router.push("/health-check")
                            }
                            className="w-full rounded-xl bg-white px-5 py-3 font-bold text-[#123B8C] shadow-md transition hover:bg-[#EAF2FF] sm:w-auto"
                        >
                            🩺 Quick Health Check
                        </button>
                    </div>
                </section>

                {/* Summary cards */}
                <section className="mt-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Glucose */}
                        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                                    🩺
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                    Glucose
                                </span>
                            </div>

                            {latestGlucose ? (
                                <>
                                    <p className="mt-6 text-3xl font-bold text-[#0B2559]">
                                        {latestGlucose.glucose}
                                        <span className="ml-1 text-sm font-normal text-[#64748B]">
                                            mg/dL
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-[#64748B]">
                                        Latest glucose reading
                                    </p>

                                    <p className="mt-2 text-sm font-bold text-[#123B8C]">
                                        {latestGlucose.result}
                                    </p>
                                </>
                            ) : (
                                <p className="mt-6 text-sm text-[#64748B]">
                                    No glucose reading yet.
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    const form =
                                        document.getElementById(
                                            "glucose-form"
                                        );

                                    if (form) {
                                        form.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                                className="mt-5 w-full rounded-xl bg-[#123B8C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B2559]"
                            >
                                Check Blood Glucose
                            </button>
                        </div>

                        {/* Blood pressure */}
                        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                                    ❤️
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                    Blood Pressure
                                </span>
                            </div>

                            {latestBloodPressure ? (
                                <>
                                    <p className="mt-6 text-3xl font-bold text-[#0B2559]">
                                        {latestBloodPressure.systolic}/
                                        {latestBloodPressure.diastolic}
                                        <span className="ml-1 text-sm font-normal text-[#64748B]">
                                            mmHg
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-[#64748B]">
                                        Latest reading
                                    </p>
                                </>
                            ) : (
                                <p className="mt-6 text-sm text-[#64748B]">
                                    No blood pressure reading yet.
                                </p>
                            )}

                            <button
                                onClick={() =>
                                    router.push(
                                        "/blood-pressure"
                                    )
                                }
                                className="mt-5 w-full rounded-xl bg-[#123B8C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B2559]"
                            >
                                Check Blood Pressure
                            </button>
                        </div>

                        {/* BMI */}
                        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                                    ⚖️
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                    BMI
                                </span>
                            </div>

                            {latestBMI ? (
                                <>
                                    <p className="mt-6 text-3xl font-bold text-[#0B2559]">
                                        {latestBMI.bmi}
                                    </p>

                                    <p className="mt-2 text-sm text-[#64748B]">
                                        Latest BMI reading
                                    </p>
                                </>
                            ) : (
                                <p className="mt-6 text-sm text-[#64748B]">
                                    No BMI reading yet.
                                </p>
                            )}

                            <button
                                onClick={() =>
                                    router.push("/bmi")
                                }
                                className="mt-5 w-full rounded-xl bg-[#123B8C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B2559]"
                            >
                                Calculate BMI
                            </button>
                        </div>
                    </div>
                </section>

                {/* Glucose form */}
                <section
                    id="glucose-form"
                    className="mt-8"
                >
                    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-[#123B8C]">
                                Health Record
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                                Add Blood Glucose Reading
                            </h2>
                        </div>

                        <HealthRecordForm />
                    </div>
                </section>

                {/* Saved glucose records */}
                <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                    <p className="text-sm font-semibold text-[#123B8C]">
                        Blood Glucose
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                        Saved Blood Glucose Records
                    </h2>

                    <p className="mt-2 text-sm text-[#64748B]">
                        View, edit, or delete your previous blood
                        glucose readings.
                    </p>

                    <div className="mt-6">
                        <RecentHealthChecks
                            healthRecords={
                                user.healthRecords ?? []
                            }
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </div>
                </section>

                {/* Glucose chart */}
                <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                    <p className="text-sm font-semibold text-[#123B8C]">
                        Health Trends
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                        Blood Glucose Trend
                    </h2>

                    <div className="mt-6 min-w-0 overflow-hidden">
                        <GlucoseChart
                            healthRecords={
                                user.healthRecords ?? []
                            }
                        />
                    </div>
                </section>

                {/* Blood pressure history */}
                <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                    <p className="text-sm font-semibold text-[#123B8C]">
                        Blood Pressure
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                        Blood Pressure History
                    </h2>

                    <p className="mt-2 text-sm text-[#64748B]">
                        Your recorded blood pressure readings.
                    </p>

                    <div className="mt-6 space-y-3">
                        {bloodPressureRecords.map(
                            (record) => (
                                <div
                                    key={record.id}
                                    className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="font-bold text-[#0B2559]">
                                            {record.systolic}/
                                            {record.diastolic}{" "}
                                            <span className="text-sm font-normal text-[#64748B]">
                                                mmHg
                                            </span>
                                        </p>

                                        <p className="mt-1 text-sm text-[#64748B]">
                                            {new Date(
                                                record.date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {record.bloodPressureResult && (
                                        <span className="w-fit rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold text-[#123B8C]">
                                            {record.bloodPressureResult}
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                    </div>

                    {bloodPressureRecords.length === 0 && (
                        <p className="mt-6 rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
                            No blood pressure records yet.
                        </p>
                    )}
                </section>

                {/* BMI history */}
                <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                    <p className="text-sm font-semibold text-[#123B8C]">
                        Body Mass Index
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                        BMI History
                    </h2>

                    <p className="mt-2 text-sm text-[#64748B]">
                        Your recorded body mass index readings.
                    </p>

                    <div className="mt-6 space-y-3">
                        {bmiRecords.map((record) => (
                            <div
                                key={record.id}
                                className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="font-bold text-[#0B2559]">
                                        BMI: {record.bmi}
                                    </p>

                                    <p className="mt-1 text-sm text-[#64748B]">
                                        Weight: {record.weight} kg
                                        {" • "}
                                        Height: {record.height} cm
                                    </p>

                                    <p className="mt-1 text-sm text-[#64748B]">
                                        {new Date(
                                            record.date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                {record.bmiResult && (
                                    <span className="w-fit rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold text-[#123B8C]">
                                        {record.bmiResult}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {bmiRecords.length === 0 && (
                        <p className="mt-6 rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
                            No BMI records yet.
                        </p>
                    )}
                </section>

                {/* Edit record */}
                {editingRecord && (
                    <section className="mt-8">
                        <EditHealthRecordForm
                            record={editingRecord}
                            onSave={(updatedRecord) => {
                                if (!user) {
                                    return;
                                }

                                const updatedHealthRecords =
                                    user.healthRecords?.map(
                                        (record) =>
                                            record.id ===
                                            updatedRecord.id
                                                ? updatedRecord
                                                : record
                                    ) ?? [];

                                const updatedUser = {
                                    ...user,
                                    healthRecords:
                                        updatedHealthRecords,
                                };

                                localStorage.setItem(
                                    "currentUser",
                                    JSON.stringify(
                                        updatedUser
                                    )
                                );

                                const savedUsers =
                                    localStorage.getItem(
                                        "users"
                                    );

                                if (savedUsers) {
                                    const users: User[] =
                                        JSON.parse(
                                            savedUsers
                                        );

                                    const updatedUsers =
                                        users.map(
                                            (existingUser) => {
                                                if (
                                                    existingUser.email ===
                                                    user.email
                                                ) {
                                                    return updatedUser;
                                                }

                                                return existingUser;
                                            }
                                        );

                                    localStorage.setItem(
                                        "users",
                                        JSON.stringify(
                                            updatedUsers
                                        )
                                    );
                                }

                                setUser(updatedUser);
                                setEditingRecord(null);
                            }}
                            onCancel={() =>
                                setEditingRecord(null)
                            }
                        />
                    </section>
                )}

                {/* Logout */}
                <div className="mt-10 flex justify-center pb-8">
                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </main>
    );
}

