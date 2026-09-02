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
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        className="mt-4 rounded-lg border bg-gray-50 p-4"
    >
        <h3 className="text-lg font-semibold">
        Edit Health Record
        </h3>

        <div className="mt-4">
        <label className="mb-2 block font-medium">
            Blood Glucose (mg/dL)
        </label>

        <input
            type="number"
            value={glucose}
            required
            onChange={(e) => setGlucose(e.target.value)}
            className="w-full rounded-lg border p-3"
        />
        </div>

        <div className="mt-4">
        <label className="mb-2 block font-medium">
            Was this a fasting reading?
        </label>

        <select
            value={fasting}
            onChange={(e) => setFasting(e.target.value)}
            className="w-full rounded-lg border p-3"
        >
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
        </div>

        <div className="mt-4 flex gap-3">
        <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
            Save Changes
        </button>

        <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 font-semibold hover:bg-gray-100"
        >
            Cancel
        </button>
        </div>
        </form>
    );
}
