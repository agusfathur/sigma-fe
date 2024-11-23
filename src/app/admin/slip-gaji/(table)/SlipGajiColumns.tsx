/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Button } from "@/components/custom/button";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { SlipGajiActions } from "./SlipGajiActions";

//     gaji_pokok           Int             @default(0) @db.Integer
//     tunjangan_tetap      Int             @default(0) @db.Integer
//     tunjangan_kehadiran  Int             @default(0) @db.Integer
//     tunjangan_fungsional Int             @default(0) @db.Integer
//     tunjangan_bonus      Int             @default(0) @db.Integer
//     tunjangan_lembur     Int             @default(0) @db.Integer
//     pajak                Int             @default(0) @db.Integer
//     pinjaman             Int             @default(0) @db.Integer
//     potong_gaji          Int             @default(0) @db.Integer
//     total_gaji_kotor     Int             @default(0) @db.Integer
//     total_gaji_bersih    Int             @default(0) @db.Integer
//     tanggal              DateTime        @db.Date
//     status_pembayaran    StatusPmbayaran @default(pending)
//     bulan                Int             @db.Integer
//     tahun                Int             @db.Integer

export const SlipGajiColumns: ColumnDef<SlipGaji>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "pegawai.nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pegawai" />
    ),
    cell: ({ row }) => <span>{row.original.pegawai.nama}</span>,
  },
  {
    accessorKey: "total_gaji_bersih",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Gaji Bersih" />
    ),
    cell: ({ row }) => {
      const total = new Intl.NumberFormat("id-Id").format(
        row.original.total_gaji_bersih,
      );
      return <span>Rp. {total}</span>;
    },
  },
  {
    id: "tanggal",
    accessorFn: (row) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.tanggal));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.tanggal));

      return `${tanggalHari.split(",")[0]}, ${tanggal}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.getValue("tanggal")));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.getValue("tanggal")));

      return (
        <span>
          {tanggalHari.split(",")[0]}, {tanggal}
        </span>
      );
    },
  },
  {
    accessorKey: "status_pembayaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const variant = row.original.status_pembayaran;
      let color = "";
      switch (variant) {
        case "dibayar":
          color = "bg-green-600 text-white";
          break;
        case "proses":
          color = "bg-yellow-600 text-white";
          break;
        case "pending":
          color = "bg-blue-600 text-white";
          break;
        default:
          break;
      }

      return (
        <Button variant="ghost" className={color} size="sm">
          {row.original.status_pembayaran}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <SlipGajiActions row={row} />,
  },
];
