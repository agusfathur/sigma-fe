/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { PinjamanActions } from "./PinjamanActions";
import { Pinjaman } from "@/store/pinjaman/pinjaman.types";

export const PinjamanColumns: ColumnDef<Pinjaman>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "nominal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nominal" />
    ),
    cell: ({ row }) => {
      const total = new Intl.NumberFormat("id-Id").format(row.original.nominal);
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
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => <span>{row.original.keterangan}</span>,
  },
  {
    accessorKey: "status_pinjaman",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let color: string;
      switch (row.original.status_pinjaman) {
        case "pending":
          color = "bg-blue-200 text-blue-900";
          break;
        case "diterima":
          color = "bg-green-200 text-green-900";
          break;
        case "ditolak":
          color = "bg-red-200 text-red-900";
          break;
        default:
          color = "bg-gray-200 text-gray-900";
          break;
      }
      return (
        <span
          className={`rounded-2xl px-3 py-1 text-center text-xs font-bold ${color} capitalize`}
        >
          {row.original.status_pinjaman}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <PinjamanActions row={row} />,
  },
];
