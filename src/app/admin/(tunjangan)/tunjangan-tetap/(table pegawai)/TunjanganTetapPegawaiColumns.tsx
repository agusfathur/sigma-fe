/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/custom/button";
import { GearIcon } from "@radix-ui/react-icons";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";

export const absensiPegawaiColumns: ColumnDef<Pegawai>[] = [
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
    accessorKey: "jabatan",
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

const PegawaiActions = ({ row }: any) => {
  const setPegawaiData = usePegawaiStore((state) => state.setPegawaiData);

  return (
    <Link
      href={`/admin/tunjangan-tetap/pegawai/${row.original.id_pegawai}`}
      onClick={() => setPegawaiData(row.original)}
    >
      <Button className="h-8 w-8 p-0">
        <span className="sr-only">Detail</span>
        <GearIcon className="h-4 w-4" />
      </Button>
    </Link>
  );
};
