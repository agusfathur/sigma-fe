/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Button } from "@/components/custom/button";
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
