/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { TunjanganTetapPegawai } from "@/store/tunjanganTetap/tunjanganTetapPegawai,types";
import { TunjanganTetapPegawaiActions } from "./TunjanganTetapPegawaiActions";

export const TunjanganTetapPegawaiColumns: ColumnDef<TunjanganTetapPegawai>[] =
  [
    {
      id: "no",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No" />
      ),
      cell: ({ row }) => <span>{row.index + 1}</span>,
      accessorFn: (row, index) => index + 1,
    },
    {
      accessorKey: "tunjangan_tetap.nama",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nominal" />
      ),
      cell: ({ row }) => {
        return <span>{row.original.tunjangan_tetap.nama}</span>;
      },
    },
    {
      accessorKey: "jumlah",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jumlah" />
      ),
      cell: ({ row }) => <span>{row.original.jumlah}</span>,
    },

    {
      id: "total",
      accessorFn: (row) => row.tunjangan_tetap.nominal * row.jumlah,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nominal" />
      ),
      cell: ({ row }) => {
        const total = new Intl.NumberFormat("id-Id").format(
          row.original.tunjangan_tetap.nominal * row.original.jumlah,
        );
        return <span>Rp. {total}</span>;
      },
    },

    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => <TunjanganTetapPegawaiActions row={row} />,
    },
  ];
