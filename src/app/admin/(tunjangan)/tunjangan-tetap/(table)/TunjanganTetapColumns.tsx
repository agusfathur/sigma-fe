/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { TunjanganTetapActions } from "./TunjanganTetapActions";
import { TunjanganTetap } from "@/store/tunjanganTetap/tunjanganTetap.types";

export const TunjanganTetapColumns: ColumnDef<TunjanganTetap>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <span>{row.original.nama}</span>,
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
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <TunjanganTetapActions row={row} />,
  },
];
