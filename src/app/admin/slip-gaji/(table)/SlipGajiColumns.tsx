/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { SlipGajiActions } from "./SlipGajiActions";

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
    accessorKey: "bulan tahun",

    accessorFn: (row) =>
      `${new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric", // Tambahkan jika ingin menampilkan tahun juga
      }).format(new Date(row.tahun, row.bulan - 1))}`,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bulan" />
    ),
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat("id-ID", {
          month: "long",
          year: "numeric", // Tambahkan jika ingin menampilkan tahun juga
        }).format(new Date(row.original.tahun, row.original.bulan - 1))}
      </span>
    ),
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
    accessorKey: "status_pembayaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const variant = row.original.status_pembayaran;
      let color = "";
      switch (variant) {
        case "dibayar":
          color = "bg-green-200 text-green-950";
          break;
        case "proses":
          color = "bg-yellow-200 text-yellow-950";
          break;
        case "pending":
          color = "bg-blue-200 text-blue-950";
          break;
        default:
          break;
      }

      return (
        <span
          className={`rounded-2xl px-3 py-1 text-center text-xs font-bold ${color} capitalize`}
        >
          {row.original.status_pembayaran}
        </span>
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
