import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { JenisIzinActions } from "./jenisIzinActions";
import { JenisIzin } from "@/store/jenisIzin/jenisIzin.types";

export const jenisIzinColumns: ColumnDef<JenisIzin>[] = [
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
      <DataTableColumnHeader column={column} title="Nama Jenis Izin" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => <span>{row.getValue("jenis")}</span>,
  },
  {
    accessorKey: "jatah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jatah" />
    ),
    cell: ({ row }) => <span>{row.getValue("jatah")}</span>,
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <span>{row.getValue("tahun")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JenisIzinActions row={row} />,
  },
];
