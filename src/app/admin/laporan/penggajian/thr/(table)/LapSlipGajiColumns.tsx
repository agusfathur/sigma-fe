/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { THR } from "@/store/THR/THR.types";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LapTHRColumns: ColumnDef<THR>[] = [
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
    accessorKey: "Bulan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <span>{row.original.tahun}</span>,
  },
  {
    accessorKey: "gaji_pokok",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total THR" />
    ),
    cell: ({ row }) => (
      <span>
        Rp. {new Intl.NumberFormat("id-ID").format(row.original.nominal || 0)}
      </span>
    ),
  },
  {
    accessorKey: "tanggal_pembayaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gaji Bersih" />
    ),
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
          new Date(row.original.tanggal_pembayaran),
        )}
      </span>
    ),
  },
];
