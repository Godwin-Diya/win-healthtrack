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
            <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                    Health insights
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                    Blood Glucose Trend
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                    Your glucose trend will appear here once you have recorded
                    some health checks.
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8 min-w-0 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#123B8C]">
                Health insights
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#0B2559]">
                Blood Glucose Trend
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Your recorded blood glucose readings over time.
            </p>

            <div className="mt-6 h-72 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#DCE7F7"
                        />

                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#64748B", fontSize: 12 }}
                            axisLine={{ stroke: "#CBD5E1" }}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: "#64748B", fontSize: 12 }}
                            axisLine={{ stroke: "#CBD5E1" }}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #DCE7F7",
                                boxShadow:
                                    "0 4px 14px rgba(11, 37, 89, 0.08)",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="glucose"
                            stroke="#123B8C"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#123B8C",
                                strokeWidth: 2,
                                stroke: "#FFFFFF",
                            }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}