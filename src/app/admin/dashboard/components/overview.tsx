"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OverviewData {
  pegawai: number;
  hadir: number;
  terlambat: number;
  izin: number;
}

const data: OverviewData[] = [
  { pegawai: 10, hadir: 8, terlambat: 1, izin: 1 },
  { pegawai: 20, hadir: 15, terlambat: 3, izin: 2 },
  { pegawai: 30, hadir: 25, terlambat: 2, izin: 3 },
  { pegawai: 40, hadir: 30, terlambat: 5, izin: 5 },
  { pegawai: 50, hadir: 45, terlambat: 3, izin: 2 },
  { pegawai: 60, hadir: 50, terlambat: 7, izin: 3 },
  { pegawai: 70, hadir: 60, terlambat: 5, izin: 5 },
  { pegawai: 80, hadir: 70, terlambat: 6, izin: 4 },
  { pegawai: 90, hadir: 80, terlambat: 7, izin: 3 },
  { pegawai: 100, hadir: 90, terlambat: 5, izin: 5 },
];

export function Overview() {
  return (
    <div className="mx-auto">
      <div className="rounded-lg bg-gray-50 p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Overview Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
            <XAxis dataKey="pegawai" className="text-gray-600" />
            <YAxis className="text-gray-600" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Legend wrapperStyle={{ color: "#374151" }} />
            <Bar dataKey="hadir" stackId="a" fill="#4F46E5" />{" "}
            {/* Tailwind indigo-600 */}
            <Bar dataKey="terlambat" stackId="a" fill="#F59E0B" />{" "}
            {/* Tailwind amber-500 */}
            <Bar dataKey="izin" stackId="a" fill="#EF4444" />{" "}
            {/* Tailwind red-500 */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
