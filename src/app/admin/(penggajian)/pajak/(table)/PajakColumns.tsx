/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pajak } from "@/store/pajak/pajak.types";
import { PajakActions } from "./PajakActions";

export const PajakColumns: ColumnDef<Pajak>[] = [
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
    accessorKey: "persen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Persen" />
    ),
    cell: ({ row }) => <span>{row.original.persen} %</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <PajakActions row={row} />,
  },
];
