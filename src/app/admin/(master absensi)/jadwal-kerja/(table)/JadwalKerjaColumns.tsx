import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { JadwalKerjaActions } from "./JadwalKerjaActions";
import { JadwalKerja } from "@/store/jadwalKerja/jadwalKerja.types";

export const jadwalKerjaColumns: ColumnDef<JadwalKerja>[] = [
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
    cell: ({ row }) => <span>{`${row.original.pegawai.nama}`}</span>,
  },
  {
    id: "shift_kerja",
    accessorFn: (row) => {
      const waktuMasuk = row.shift_kerja?.waktu_masuk ?? "N/A";
      const waktuPulang = row.shift_kerja?.waktu_pulang ?? "N/A";
      return `${waktuMasuk} - ${waktuPulang}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shift" />
    ),
    cell: ({ row }) => {
      const shiftKerja = row.original.shift_kerja;
      const waktuMasuk = shiftKerja?.waktu_masuk ?? "N/A";
      const waktuPulang = shiftKerja?.waktu_pulang ?? "N/A";
      return (
        <span>
          {waktuMasuk} - {waktuPulang}
        </span>
      );
    },
  },
  {
    id: "tanggal",
    accessorFn: (row) => {
      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.tanggal));
      return formattedDate;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.original.tanggal));
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JadwalKerjaActions row={row} />,
  },
];
