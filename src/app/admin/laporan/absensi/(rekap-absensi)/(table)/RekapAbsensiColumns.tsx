/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pegawai } from "@/store/pegawai/pegawai.types";

export interface RekapAbsensiTypes {
  pegawai: Pegawai;
  countJadwal: number;
  countHadir: number;
  countTerlambat: number;
  countIzin: number;
  countCuti: number;
  countTidakHadir: number;
}

export const RekapAbsensiColumns: ColumnDef<RekapAbsensiTypes>[] = [
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
    accessorKey: "countJadwal",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Jadwal" />
    ),
    cell: ({ row }) => <span>{row.original.countJadwal}</span>,
  },
  {
    accessorKey: "countHadir",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kehadiran" />
    ),
    cell: ({ row }) => <span>{row.original.countHadir}</span>,
  },
  {
    accessorKey: "countTerlambat",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Terlambat" />
    ),
    cell: ({ row }) => <span>{row.original.countTerlambat}</span>,
  },
  {
    accessorKey: "countIzin",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Izin" />
    ),
    cell: ({ row }) => <span>{row.original.countIzin}</span>,
  },
  {
    accessorKey: "countCuti",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cuti" />
    ),
    cell: ({ row }) => <span>{row.original.countCuti}</span>,
  },
  {
    accessorKey: "countTidakHadir",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tidak Hadir" />
    ),
    cell: ({ row }) => <span>{row.original.countTidakHadir}</span>,
  },
];
