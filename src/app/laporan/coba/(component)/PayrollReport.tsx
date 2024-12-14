"use client";
import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import {
  IconCalendar,
  IconClock,
  IconDownload,
  IconEyeDollar,
  IconUser,
} from "@tabler/icons-react";

interface PayrollData {
  employeeName: string;
  employeeId: string;
  month: string;
  year: number;
  position: string;
  basicSalary: number;
  allowances: { name: string; amount: number }[];
  deductions: { name: string; amount: number }[];
}

const PayrollSlip: React.FC = () => {
  const payrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const payrollData: PayrollData = {
    employeeName: "Ahmad Saiful",
    employeeId: "EMP-2024-001",
    month: "Januari",
    year: 2024,
    position: "Staff Administrasi",
    basicSalary: 5000000,
    allowances: [
      { name: "Tunjangan Transportasi", amount: 500000 },
      { name: "Tunjangan Makan", amount: 300000 },
    ],
    deductions: [
      { name: "BPJS Kesehatan", amount: 200000 },
      { name: "Pajak Penghasilan", amount: 150000 },
    ],
  };

  const calculateTotal = (items: { amount: number }[]) =>
    items.reduce((sum, item) => sum + item.amount, 0);

  const handleDownloadPDF = () => {
    if (payrollRef.current) {
      setIsLoading(true);
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Slip_Gaji_${payrollData.employeeName}_${payrollData.month}_${payrollData.year}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(options)
        .from(payrollRef.current)
        .save()
        .finally(() => setIsLoading(false));
    }
  };

  const totalAllowances = calculateTotal(payrollData.allowances);
  const totalDeductions = calculateTotal(payrollData.deductions);
  const netSalary = payrollData.basicSalary + totalAllowances - totalDeductions;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 text-right">
          <button
            onClick={handleDownloadPDF}
            disabled={isLoading}
            className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <IconDownload className="mr-2 h-5 w-5" />
            {isLoading ? "Mengunduh..." : "Unduh PDF"}
          </button>
        </div>

        <div ref={payrollRef} className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <IconCalendar className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-blue-600">
                {payrollData.month} {payrollData.year}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Slip Gaji Karyawan
            </h1>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <IconUser className="h-5 w-5 text-gray-500" />
                <p>
                  <strong>Nama:</strong> {payrollData.employeeName}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <IconClock className="h-5 w-5 text-gray-500" />
                <p>
                  <strong>ID Karyawan:</strong> {payrollData.employeeId}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <IconUser className="h-5 w-5 text-gray-500" />
                <p>
                  <strong>Posisi:</strong> {payrollData.position}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <h2 className="mb-2 flex items-center space-x-2 font-semibold text-green-600">
                <IconEyeDollar className="h-5 w-5" />
                <span>Pendapatan</span>
              </h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Gaji Pokok</span>
                  <span>Rp {payrollData.basicSalary.toLocaleString()}</span>
                </div>
                {payrollData.allowances.map((allowance, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{allowance.name}</span>
                    <span>Rp {allowance.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-1 font-bold">
                  <span>Total Pendapatan</span>
                  <span>
                    Rp{" "}
                    {(
                      payrollData.basicSalary + totalAllowances
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-2 flex items-center space-x-2 font-semibold text-red-600">
                <IconEyeDollar className="h-5 w-5" />
                <span>Potongan</span>
              </h2>
              <div className="space-y-1 text-sm">
                {payrollData.deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{deduction.name}</span>
                    <span>Rp {deduction.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-1 font-bold">
                  <span>Total Potongan</span>
                  <span>Rp {totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded bg-blue-50 p-4 text-right">
            <p className="text-lg font-bold text-blue-700">
              Gaji Bersih: Rp {netSalary.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSlip;
