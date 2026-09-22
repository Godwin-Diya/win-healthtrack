import type { HealthRecord } from "@/types/health";
import HealthRecordCard from "@/components/HRC";

type RecentHealthChecksProps = {
    healthRecords: HealthRecord[];
    onDelete: (id: string) => void;
    onEdit: (record: HealthRecord) => void;
};

export default function RecentHealthChecks({
    healthRecords,
    onDelete,
    onEdit,
}: RecentHealthChecksProps) {
    return (
        <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                    Health records
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                    Recent Health Checks
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    View and manage your recent blood glucose records.
                </p>
            </div>

            {healthRecords.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-blue-200 bg-[#F8FAFC] p-6 text-center">
                    <p className="font-semibold text-[#0B2559]">
                        No health records yet.
                    </p>

                    <p className="mt-2 text-sm text-[#64748B]">
                        Your saved readings will appear here.
                    </p>
                </div>
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

