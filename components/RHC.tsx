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
    <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
        Recent Health Checks
        </h2>

        {healthRecords.length > 0 ? (
        <div className="mt-4 space-y-4">
            {healthRecords.map((record, index) => (
            <HealthRecordCard
        key={index}
        record={record}
        onDelete={onDelete}  
        onEdit={onEdit}            
        />
        ))}
        </div>
        ) : (
            <p className="mt-3 text-gray-600">
            No health records yet.
            </p>
    )}
    </div>
);
}