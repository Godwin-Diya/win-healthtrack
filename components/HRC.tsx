import type { HealthRecord } from "@/types/health";

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

