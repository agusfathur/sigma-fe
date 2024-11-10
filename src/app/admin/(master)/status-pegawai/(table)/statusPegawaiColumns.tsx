import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { StatusPegawaiActions } from "./statusPegawaiActions";
import { StatusKepegawaian } from "@/store/statusKepegawaian/statusKepegawaian.types";

export const statusPegawaiColumns: ColumnDef<StatusKepegawaian>[] = [
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
      <DataTableColumnHeader column={column} title="Nama Status Kepegawaian" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <StatusPegawaiActions row={row} />,
  },
];
