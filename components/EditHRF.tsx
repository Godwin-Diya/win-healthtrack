"use client";

import { useState } from "react";
import type { HealthRecord } from "@/types/health";
import { getGlucoseStatus } from "@/utils/glucoseStatus";

type EditHealthRecordFormProps = {
    record: HealthRecord;
    onSave: (updatedRecord: HealthRecord) => void;
    onCancel: () => void;
};

export default function EditHealthRecordForm({
    record,
    onSave,
    onCancel,
}: EditHealthRecordFormProps) {
    const [glucose, setGlucose] = useState(record.glucose);
    const [fasting, setFasting] = useState(record.fasting);

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const updatedRecord: HealthRecord = {
            ...record,
            glucose,
            fasting,
            result: getGlucoseStatus(glucose, fasting),
        };

        onSave(updatedRecord);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-5 w-full rounded-3xl border border-blue-100 bg-[#F8FAFC] p-5 shadow-sm sm:p-8"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-lg">
                    ✏️
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#0B2559]">
                        Edit Health Record
                    </h3>

                    <p className="mt-1 text-sm text-[#64748B]">
                        Update the reading details below.
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="edit-glucose"
                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                >
                    Blood Glucose (mg/dL)
                </label>

                <input
                    id="edit-glucose"
                    type="number"
                    value={glucose}
                    required
                    onChange={(e) => setGlucose(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-800 outline-none transition focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                />
            </div>

            <div className="mt-5">
                <label
                    htmlFor="edit-fasting"
                    className="mb-2 block text-sm font-semibold text-[#0B2559]"
                >
                    Was this a fasting reading?
                </label>

                <select
                    id="edit-fasting"
                    value={fasting}
                    onChange={(e) => setFasting(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-800 outline-none transition focus:border-[#123B8C] focus:ring-4 focus:ring-[#EAF2FF]"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="submit"
                    className="w-full rounded-xl bg-[#123B8C] px-4 py-3 font-semibold text-white transition hover:bg-[#0B2559] sm:w-auto"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-[#0B2559] transition hover:bg-[#EAF2FF] sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

