import type { HealthRecord } from "@/types/health";

type RecentHealthChecksProps = {
    healthRecords: HealthRecord[];
    onDelete: (id: string) => void;
    onEdit: (record: HealthRecord) => void;
};


import HealthRecordCard from "@/components/HRC";


export default function RecentHealthChecks({
    healthRecords,
    onDelete,
    onEdit,
}: RecentHealthChecksProps) {

    return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
    <div className="mb-6">
        <h2 className="text-2xl font-bold">
        Recent Health Checks</h2>

        <p className="mt-1 text-sm text-gray-600">
        View and manage your recent health records.
        </p>
        </div>

        {healthRecords.length === 0 ? (
        <p className="text-gray-600">
        No health records yet.
        </p>
        ) : (
        <div className="space-y-4">
        {healthRecords.map((record) => (
            <HealthRecordCard
            key={record.id}
            record={record}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    ))}
    </div>
    )}
    </section>
);
}