import type { HealthRecord } from "@/types/health";
import { getGlucoseStatus } from "@/utils/glucoseStatus";

type HealthRecordCardProps = {
    record: HealthRecord;
    onDelete: (id: string) => void;
    onEdit: (record: HealthRecord) => void;
};

export default function HealthRecordCard({
    record,
    onDelete,
    onEdit,
}: HealthRecordCardProps) {
    const glucoseStatus = getGlucoseStatus(
    record.glucose,
    record.fasting
);
    return (
    <div className="rounded-xl, border bg-white p-5 shadow-sm">
        <p className="text-lg">
        <strong>Blood Glucose:</strong>{" "}
        {record.glucose} mg/dL
        </p>

        <p className="mt-2">
        <strong>Fasting:</strong>{" "}
        {record.fasting === "yes" ? "Yes" : "No"}
        </p>

        <p>
        <strong>Date:</strong>{" "}
        {record.date}
        </p>
            
        <div className="mt-3">
        <strong>Status:</strong>

        <span className="ml-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold">
        {glucoseStatus}
        </span>
        </div>
            
        <div className="mt-4 flex gap-3">
        <button
        onClick={() => onEdit(record)}
        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
        Edit
        </button>

        <button
        onClick={() => {
        const confirmed = window.confirm(
        "Are you sure you want to delete this health record?"
        );

        if (confirmed) {
        onDelete(record.id);
        }
        }}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
        Delete
        </button>        
        </div>
    </div>
    );
}

