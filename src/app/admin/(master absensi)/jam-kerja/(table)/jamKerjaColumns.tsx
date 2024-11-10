import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { JamKerjaActions } from "./jamKerjaActions";
import { JamKerja } from "@/store/jamKerja/jamKerja.types";

export const jamKerjaColumns: ColumnDef<JamKerja>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "shift_kerja",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Shift" />
    ),
    cell: ({ row }) => (
      <span>
        {row.getValue("shift_kerja") === "masa_mbkm"
          ? "Masa MBKM"
          : "Masa Non MBKM"}
      </span>
    ),
  },

  {
    accessorKey: "waktu_masuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Masuk" />
    ),
    cell: ({ row }) => <span>{row.getValue("waktu_masuk")}</span>,
  },
  {
    accessorKey: "waktu_pulang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Pulang" />
    ),
    cell: ({ row }) => <span>{row.getValue("waktu_pulang")}</span>,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => <span>{row.getValue("keterangan")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JamKerjaActions row={row} />,
  },
];
