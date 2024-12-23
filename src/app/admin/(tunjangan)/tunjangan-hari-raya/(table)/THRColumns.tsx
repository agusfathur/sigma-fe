/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { THRActions } from "./THRActions";
import { THR } from "@/store/THR/THR.types";

export const THRColumns: ColumnDef<THR>[] = [
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
    id: "tanggal_pembayaran",
    accessorFn: (row) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.tanggal_pembayaran));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.tanggal_pembayaran));

      return `${tanggalHari.split(",")[0]}, ${tanggal}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pembayaran" />
    ),
    cell: ({ row }) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.getValue("tanggal_pembayaran")));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.getValue("tanggal_pembayaran")));

      return (
        <span>
          {tanggalHari.split(",")[0]}, {tanggal}
        </span>
      );
    },
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <span>{row.original.tahun}</span>,
  },
  {
    accessorKey: "metode_pembayaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metode Pembayaran" />
    ),
    cell: ({ row }) => {
      switch (row.original.metode_pembayaran) {
        case "transfer":
          return (
            <span className="items-center rounded-xl bg-sky-200 px-3 py-1 font-bold text-sky-900">
              Transfer
            </span>
          );
        case "cash":
          return (
            <span className="items-center rounded-xl bg-emerald-200 px-3 py-1 font-bold text-emerald-900">
              Cash
            </span>
          );
        default:
          return <span>Unknown</span>;
      }
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <THRActions row={row} />,
  },
];
