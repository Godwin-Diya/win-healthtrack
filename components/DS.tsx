import type { HealthRecord } from "@/types/health";

type DashboardSummaryProps = {
    healthRecords: HealthRecord[];
};

export default function DashboardSummary({
    healthRecords,
    }: DashboardSummaryProps) {
    if (healthRecords.length === 0) {
    return (
        <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
            🩺 Blood Glucose Summary
        </h2>

        <p className="mt-3 text-gray-600">
            No health records yet.
        </p>
        </div>
    );
}

        const latestRecord = healthRecords[healthRecords.length - 1];

    return (
    <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
        🩺 Blood Glucose Summary
        </h2>

        <p className="mt-3">
        <strong>Total Records:</strong>{" "}
        {healthRecords.length}
        </p>

        <p className="mt-2">
        <strong>Latest Reading:</strong>{" "}
        {latestRecord.glucose} mg/dL
        </p>

        <p className="mt-2">
        <strong>Fasting:</strong>{" "}
        {latestRecord.fasting === "yes" ? "Yes" : "No"}
        </p>
    </div>
);
}