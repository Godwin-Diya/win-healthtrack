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
    const glucoseStatus = record.result ?? "Unknown";

    const statusClass = glucoseStatus.toLowerCase().includes("high")
        ? "border-red-100 bg-red-50 text-red-700"
        : glucoseStatus.toLowerCase().includes("low")
          ? "border-yellow-100 bg-yellow-50 text-yellow-700"
          : "border-blue-100 bg-[#EAF2FF] text-[#123B8C]";

    return (
        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-lg font-bold text-[#0B2559]">
                        Blood Glucose:{" "}
                        <span className="text-[#123B8C]">
                            {record.glucose} mg/dL
                        </span>
                    </p>

                    <div className="mt-3 space-y-2 text-sm text-[#64748B]">
                        <p>
                            <strong className="text-[#0B2559]">
                                Fasting:
                            </strong>{" "}
                            {record.fasting === "yes" ? "Yes" : "No"}
                        </p>

                        <p>
                            <strong className="text-[#0B2559]">
                                Date:
                            </strong>{" "}
                            {new Date(record.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                >
                    {glucoseStatus}
                </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
                <button
                    onClick={() => onEdit(record)}
                    className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600 sm:w-auto"
                >
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
                    className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

