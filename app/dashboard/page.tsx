
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import HealthRecordForm from "@/components/hrf";
import RecentHealthChecks from "@/components/RHC";
import EditHealthRecordForm from "@/components/EditHRF";
import GlucoseChart from "@/components/GlucoseChart";

import type { HealthRecord, User } from "@/types/health";

type DatabaseHealthRecord = {
    id: string;
    user_id: string;
    glucose: string | number | null;
    fasting: string | null;
    result: string | null;
    systolic: string | number | null;
    diastolic: string | number | null;
    blood_pressure_result: string | null;
    weight: string | number | null;
    height: string | number | null;
    bmi: string | number | null;
    bmi_result: string | null;
    recorded_at: string | null;
};

function mapDatabaseRecord(
    record: DatabaseHealthRecord
): HealthRecord {
    return {
        id: record.id,
        glucose:
            record.glucose == null
                ? ""
                : String(record.glucose),
        fasting: record.fasting ?? "",
        result: record.result ?? undefined,
        systolic:
            record.systolic == null
                ? undefined
                : String(record.systolic),
        diastolic:
            record.diastolic == null
                ? undefined
                : String(record.diastolic),
        bloodPressureResult:
            record.blood_pressure_result ?? undefined,
        weight:
            record.weight == null
                ? undefined
                : String(record.weight),
        height:
            record.height == null
                ? undefined
                : String(record.height),
        bmi:
            record.bmi == null
                ? undefined
                : String(record.bmi),
        bmiResult: record.bmi_result ?? undefined,
        date:
            record.recorded_at ??
            new Date().toISOString(),
    };
}

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [editingRecord, setEditingRecord] =
        useState<HealthRecord | null>(null);
    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // Fetch authenticated user and their health records
    useEffect(() => {
        let active = true;

        async function loadDashboard() {
            setLoading(true);
            setErrorMessage("");

            try {
                const {
                    data: { user: authenticatedUser },
                    error: authError,
                } = await supabase.auth.getUser();

                if (authError || !authenticatedUser) {
                    router.replace("/login");
                    return;
                }

                const { data, error } = await supabase
                    .from("health_records")
                    .select("*")
                    .eq("user_id", authenticatedUser.id)
                    .order("recorded_at", {
                        ascending: true,
                    });

                if (error) {
                    console.error(
                        "Dashboard records error:",
                        error
                    );

                    if (active) {
                        setErrorMessage(
                            "Unable to load your health records. Please refresh the page and try again."
                        );
                    }

                    return;
                }

                if (!active) {
                    return;
                }

                const healthRecords = (
                    (data ?? []) as DatabaseHealthRecord[]
                ).map(mapDatabaseRecord);

                const metadataName =
                    authenticatedUser.user_metadata?.full_name;

                const fullName =
                    typeof metadataName === "string" &&
                    metadataName.trim()
                        ? metadataName
                        : authenticatedUser.email?.split("@")[0] ??
                          "User";

                const dashboardUser: User = {
                    id: authenticatedUser.id,
                    fullName,
                    email: authenticatedUser.email ?? "",
                    healthRecords,
                };

                setUser(dashboardUser);
            } catch (error) {
                console.error(
                    "Dashboard loading error:",
                    error
                );

                if (active) {
                    setErrorMessage(
                        "Something went wrong while loading your dashboard."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadDashboard();

        return () => {
            active = false;
        };
    }, [router]);

    // Log out through Supabase Auth
    async function handleLogout() {
        setLoggingOut(true);

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            setActionMessage(
                "Unable to log out. Please try again."
            );
            setLoggingOut(false);
            return;
        }

        router.replace("/login");
        router.refresh();
    }

    // Delete a health record from Supabase
    async function handleDelete(id: string) {
        if (!user) {
            return;
        }

        setActionMessage("");

        const { error } = await supabase
            .from("health_records")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            console.error("Delete record error:", error);
            setActionMessage(
                "Unable to delete this record. Please try again."
            );
            return;
        }

        setUser((currentUser) => {
            if (!currentUser) {
                return currentUser;
            }

            return {
                ...currentUser,
                healthRecords:
                    currentUser.healthRecords?.filter(
                        (record) => record.id !== id
                    ) ?? [],
            };
        });

        if (editingRecord?.id === id) {
            setEditingRecord(null);
        }

        setActionMessage("Health record deleted successfully.");
    }

    function handleEdit(record: HealthRecord) {
        setEditingRecord(record);
        setActionMessage("");
    }

    // Update an existing glucose record in Supabase
    async function handleSave(
        updatedRecord: HealthRecord
    ) {
        if (!user || saving) {
            return;
        }

        setSaving(true);
        setActionMessage("");

        try {
            const { error } = await supabase
                .from("health_records")
                .update({
                    glucose: Number(updatedRecord.glucose),
                    fasting: updatedRecord.fasting,
                    result: updatedRecord.result,
                })
                .eq("id", updatedRecord.id)
                .eq("user_id", user.id);

            if (error) {
                console.error("Update record error:", error);
                setActionMessage(
                    "Unable to update this record. Please try again."
                );
                return;
            }

            setUser((currentUser) => {
                if (!currentUser) {
                    return currentUser;
                }

                return {
                    ...currentUser,
                    healthRecords:
                        currentUser.healthRecords?.map(
                            (record) =>
                                record.id === updatedRecord.id
                                    ? updatedRecord
                                    : record
                        ) ?? [],
                };
            });

            setEditingRecord(null);
            setActionMessage(
                "Health record updated successfully."
            );
        } catch (error) {
            console.error("Unexpected update error:", error);
            setActionMessage(
                "Something went wrong while updating the record."
            );
        } finally {
            setSaving(false);
        }
    }

    // Loading screen
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#123B8C]" />

                    <p className="mt-4 font-semibold text-[#0B2559]">
                        Loading your health dashboard...
                    </p>
                </div>
            </main>
        );
    }

    // Error screen
    if (errorMessage && !user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
                <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-xl font-bold text-[#0B2559]">
                        Dashboard unavailable
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#64748B]">
                        {errorMessage}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 rounded-xl bg-[#123B8C] px-6 py-3 font-semibold text-white transition hover:bg-[#0B2559]"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    // Separate the different types of health records
    const allRecords = user.healthRecords ?? [];

    const glucoseRecords = allRecords.filter(
        (record) => record.glucose !== ""
    );

    const latestGlucose =
        glucoseRecords[glucoseRecords.length - 1];

    const bloodPressureRecords = allRecords.filter(
        (record) =>
            record.systolic !== undefined &&
            record.systolic !== "" &&
            record.diastolic !== undefined &&
            record.diastolic !== ""
    );

    const latestBloodPressure =
        bloodPressureRecords[
            bloodPressureRecords.length - 1
        ];

    const bmiRecords = allRecords.filter(
        (record) =>
            record.bmi !== undefined &&
            record.bmi !== ""
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
                                    document
                                        .getElementById("glucose-form")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
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
                                    router.push("/blood-pressure")
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

                    {actionMessage && (
                        <p className="mt-4 rounded-xl border border-blue-100 bg-[#EAF2FF] p-3 text-sm font-semibold text-[#123B8C]">
                            {actionMessage}
                        </p>
                    )}

                    <div className="mt-6">
                        <RecentHealthChecks
                            healthRecords={glucoseRecords}
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
                            healthRecords={glucoseRecords}
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
                        {bloodPressureRecords.map((record) => (
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
                        ))}
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
                            onSave={handleSave}
                            onCancel={() =>
                                setEditingRecord(null)
                            }
                        />

                        {saving && (
                            <p className="mt-3 text-sm font-semibold text-[#123B8C]">
                                Saving your changes...
                            </p>
                        )}
                    </section>
                )}

                {/* Logout */}
                <div className="mt-10 flex justify-center pb-8">
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="rounded-xl border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loggingOut ? "Logging Out..." : "Log Out"}
                    </button>
                </div>
            </div>
        </main>
    );
}

