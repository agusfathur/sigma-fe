/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Pegawai } from "@/store/pegawai/pegawai.types";
import { Absensi } from "@/store/absensi/absensi.types";

export interface RekapKehadiranTypes {
  pegawai: Pegawai;
  absensi: Absensi;
}

export const RekapKehadiranColumns: ColumnDef<RekapKehadiranTypes>[] = [
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
    accessorKey: "absensi.tanggal_absen",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.absensi.tanggal_absen
          ? row.original.absensi.tanggal_absen.split("T")[0]
          : "-"}
      </span>
    ),
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
    cell: ({ row }) => <span>{row.original.absensi.waktu_pulang ?? "-"}</span>,
  },
  {
    accessorKey: "absensi.status_absen",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.absensi.status_absen ?? "Tidak Hadir"}
      </span>
    ),
  },
];
