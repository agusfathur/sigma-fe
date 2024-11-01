import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { JabatanFungsionalActions } from "./JabatanFungsionalActions";
import { JabatanFungsional } from "@/store/jabatanFungsional/jabatanFungsional.types";

export const jabatanFungsionalColumns: ColumnDef<JabatanFungsional>[] = [
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
      <DataTableColumnHeader column={column} title="Nama Jabatan Fungsional" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "tunjangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tunjangan" />
    ),
    cell: ({ row }) => <span>{row.getValue("tunjangan")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JabatanFungsionalActions row={row} />,
  },
];
