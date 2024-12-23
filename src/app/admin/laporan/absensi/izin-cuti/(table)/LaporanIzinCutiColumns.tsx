/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LaporanIzinCutiColumns: ColumnDef<PermohonanIzin>[] = [
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
    accessorKey: "jenis_izin.nama",
    accessorFn: (row) => `${row.jenis_mohon_izin} | ${row.jenis_izin.nama}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jeniz Izin" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.jenis_mohon_izin} | {row.original.jenis_izin.nama}
      </span>
    ),
  },
  {
    accessorKey: "tanggal_dari",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tangggal Mulai" />
    ),
    cell: ({ row }) => <span>{row.original.tanggal_dari.split("T")[0]}</span>,
  },
  {
    accessorKey: "tanggal_sampai",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tangggal Sampai" />
    ),
    cell: ({ row }) => <span>{row.original.tanggal_sampai.split("T")[0]}</span>,
  },
  {
    accessorKey: "total_hari",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Hari" />
    ),
    cell: ({ row }) => <span>{row.original.total_hari ?? 0} Hari</span>,
  },
  {
    accessorKey: "keterangan",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => <span>{row.original.keterangan}</span>,
  },
];
