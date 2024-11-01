import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { Jabatan } from "@/store/jabatan/jabatan.types";
import { JabatanActions } from "./JabatanActions";

export const jabatanColumns: ColumnDef<Jabatan>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Jabatan" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "gaji",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gaji" />
    ),
    cell: ({ row }) => <span>{row.getValue("gaji")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JabatanActions row={row} />,
  },
];
