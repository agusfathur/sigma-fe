import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { PegawaiActions } from "./PegawaiActions";
import Image from "next/image";

export const pegawaiColumns: ColumnDef<Pegawai>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "foto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foto" />
    ),
    cell: ({ row }) => (
      <Image
        src={row.original.foto}
        width={80}
        height={80}
        alt="image pegawai"
      />
    ),
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pegawai" />
    ),
    cell: ({ row }) => <span>{row.original.nama}</span>,
  },
  {
    accessorKey: "jabatan.nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
    cell: ({ row }) => <span>{row.original.jabatan.nama}</span>,
  },
  {
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span>{row.original.user.username}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <PegawaiActions row={row} />,
  },
];
