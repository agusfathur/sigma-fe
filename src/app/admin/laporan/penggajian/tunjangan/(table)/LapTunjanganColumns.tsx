/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LapSlipGajiColumns: ColumnDef<SlipGaji>[] = [
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
      <DataTableColumnHeader column={column} title="Bulan" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.bulan} - {row.original.tahun}
      </span>
    ),
  },
  {
    accessorKey: "tunjangan_tetap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tetap" />
    ),
    cell: ({ row }) => {
      const totalTj = row.original.tunjangan_tetap;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    accessorKey: "tunjangan_fungsional",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan Fungsional" />
    ),
    cell: ({ row }) => {
      const totalTj = row.original.tunjangan_fungsional;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    accessorKey: "tunjangan_kehadiran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kehadiran" />
    ),
    cell: ({ row }) => {
      const totalTj = row.original.tunjangan_kehadiran;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    accessorKey: "tunjangan_lembur",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lembur" />
    ),
    cell: ({ row }) => {
      const totalTj = row.original.tunjangan_lembur;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    accessorKey: "tunjangan_bonus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bonus" />
    ),
    cell: ({ row }) => {
      const totalTj = row.original.tunjangan_bonus;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    id: "total_tunjangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const totalTj =
        row.original.tunjangan_kehadiran +
        row.original.tunjangan_lembur +
        row.original.tunjangan_tetap +
        row.original.tunjangan_bonus +
        row.original.tunjangan_fungsional;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
];
