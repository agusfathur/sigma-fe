/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Lembur } from "@/store/lembur/lembur.types";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LemburAbsensiColumns: ColumnDef<Lembur>[] = [
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
    cell: ({ row }) => <span>{row.original.absensi.pegawai.nama}</span>,
  },
  {
    accessorKey: "pegawai.jabatan.nama",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
    cell: ({ row }) => (
      <span>{row.original.absensi.pegawai.jabatan?.nama}</span>
    ),
  },
  {
    accessorKey: "tanggal",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => <span>{row.original.tanggal.split("T")[0] ?? "-"}</span>,
  },
  {
    accessorKey: "absensi.waktu_masuk",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jam Masuk" />
    ),
    cell: ({ row }) => <span>{row.original.absensi.waktu_masuk ?? "-"}</span>,
  },
  {
    accessorKey: "absensi.waktu_pulang",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jam Pulang" />
    ),
    cell: ({ row }) => <span>{row.original.absensi.waktu_pulang ?? 0}</span>,
  },
  {
    accessorKey: "total_jam",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Jam" />
    ),
    cell: ({ row }) => <span>{row.original.total_jam ?? 0} Jam</span>,
  },
  {
    accessorKey: "total_upah",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Upah" />
    ),
    cell: ({ row }) => {
      const upah = new Intl.NumberFormat("id-Id").format(
        row.original.total_upah,
      );
      return <span>Rp. {upah}</span>;
    },
  },
];
