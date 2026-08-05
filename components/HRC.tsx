import type { HealthRecord } from "@/types/health";

type HealthRecordCardProps = {
    record: HealthRecord;
};

export default function HealthRecordCard({
    record,
}: HealthRecordCardProps) {
    return (
    <div className="rounded-lg border p-4">
        <p>
        <strong>Blood Glucose:</strong>{" "}
        {record.glucose} mg/dL
        </p>

        <p>
        <strong>Fasting:</strong>{" "}
        {record.fasting}
        </p>

        <p>
        <strong>Date:</strong>{" "}
        {record.date}
        </p>
            
        <div className="mt-4 flex gap-3">
        <button
        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
        Edit
        </button>

        <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete
        </button>
        </div>
    </div>
    );
}

