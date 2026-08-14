"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { HealthRecord } from "@/types/health";

type GlucoseChartProps = {
    healthRecords: HealthRecord[];
};

export default function GlucoseChart({
    healthRecords,
}: GlucoseChartProps) {
    const chartData = [...healthRecords]
    .sort(
        (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    )
    .map((record) => ({
        date: new Date(record.date).toLocaleDateString(),
        glucose: Number(record.glucose),
    }));

    if (chartData.length === 0) {
    return (
        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
            Blood Glucose Trend
        </h2>

        <p className="mt-2 text-gray-600">
            Your glucose trend will appear here once you
            have recorded some health checks.
        </p>
        </section>
    );
    }

    return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
        Blood Glucose Trend
        </h2>

        <p className="mt-2 text-sm text-gray-600">
        Your recorded blood glucose readings over time.
        </p>

        <div className="mt-6 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="glucose"
                strokeWidth={2}
                dot
            />
            </LineChart>
        </ResponsiveContainer>
        </div>
    </section>
);
}