/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { RekapGaji } from "./LapRekapGajiTable";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LapRekapGajiColumns: ColumnDef<RekapGaji>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "bulan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bulan" />
    ),
    cell: ({ row }) => {
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      return (
        <span>
          {monthNames[row.original.bulan - 1]} {row.original.tahun}
        </span>
      );
    },
  },
  {
    accessorKey: "totalGajiPokok",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TotalGaji Pokok" />
    ),
    cell: ({ row }) => (
      <span>Rp. {row.original.totalGajiPokok.toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "totalTunjangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Tunjangan" />
    ),
    cell: ({ row }) => (
      <span>Rp. {row.original.totalTunjangan.toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "totalPotongan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Potongan" />
    ),
    cell: ({ row }) => (
      <span>Rp. {row.original.totalPotongan.toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "totalPengeluaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Pengeluaran" />
    ),
    cell: ({ row }) => (
      <span>Rp. {row.original.totalPengeluaran.toLocaleString("id-ID")}</span>
    ),
  },
];
