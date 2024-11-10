import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { LokasiActions } from "./LokasiActions";
import { Lokasi } from "@/store/lokasi/lokasi.types";

export const lokasiColumns: ColumnDef<Lokasi>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => <span>{row.getValue("kode")}</span>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Lokasi" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
    cell: ({ row }) => <span>{row.getValue("alamat")}</span>,
  },
  {
    accessorKey: "luas_lokasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Luas" />
    ),
    cell: ({ row }) => <span>{row.getValue("luas_lokasi") + " M"}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <LokasiActions row={row} />,
  },
];
