/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Lembur } from "@/store/lembur/lembur.types";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { LemburActions } from "./LemburActions";

export const lemburColumns: ColumnDef<Lembur>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "absensi.pegawai.nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pegawai" />
    ),
    cell: ({ row }) => <span>{row.original.absensi.pegawai.nama}</span>,
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.getValue("tanggal")));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.getValue("tanggal")));

      return (
        <span>
          {tanggalHari.split(",")[0]}, {tanggal}
        </span>
      );
    },
  },
  {
    accessorKey: "jadwal_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jadwal Masuk | Pulang" />
    ),
    cell: ({ row }) => <JadwalCell row={row} />,
  },
  {
    id: "waktu_masuk_pulang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Masuk | Pulang" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.absensi.waktu_masuk ?? "-"} |{" "}
        {row.original.absensi.waktu_pulang ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "total_jam",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Jam" />
    ),
    cell: ({ row }) => <span>{row.original.total_jam}</span>,
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
  {
    accessorKey: "status_lembur",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <span>{row.original.status_lembur}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <LemburActions row={row} />,
  },
];

const JadwalCell = ({ row }: any) => {
  const getJamKerja = useJamKerjaStore((state) => state.jamKerjaById);

  const jamKerja = getJamKerja(row.original.absensi.jadwal_pegawai.shift_id);
  return (
    <span>
      {jamKerja?.waktu_masuk ?? "-"} | {jamKerja?.waktu_pulang ?? "-"}
    </span>
  );
};
