/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pinjaman } from "@/store/pinjaman/pinjaman.types";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LapPinjamanColumns: ColumnDef<Pinjaman>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "pegawai.nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pegawai" />
    ),
    cell: ({ row }) => <span>{row.original.pegawai.nama}</span>,
  },
  {
    accessorKey: "pegawai.jabatan.nama",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
    cell: ({ row }) => <span>{row.original.pegawai.jabatan?.nama}</span>,
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
          new Date(row.original.tanggal),
        )}
      </span>
    ),
  },
  {
    accessorKey: "nominal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span>
        Rp. {new Intl.NumberFormat("id-ID").format(row.original.nominal || 0)}
      </span>
    ),
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => (
      <span className="text-sm capitalize">
        {row.original.keterangan || "-"}
      </span>
    ),
  },
];
