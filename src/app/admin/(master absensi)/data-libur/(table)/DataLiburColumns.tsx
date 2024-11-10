import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { DataLiburActions } from "./DataLiburActions";
import { DataLibur } from "@/store/dataLibur/dataLibur.types";

export const dataLiburColumns: ColumnDef<DataLibur>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hari Libur" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.getValue("tanggal")));

      return <span>{tanggal}</span>;
    },
  },
  {
    accessorKey: "status_absen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Kehadiran" />
    ),
    cell: ({ row }) => (
      <span>
        {row.getValue("status_absen") === "hadir" ? "Hadir" : "Tidak Hadir"}
      </span>
    ),
  },
  {
    accessorKey: "kategori_libur",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => <span>{row.original.kategori_libur.jenis}</span>,
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <DataLiburActions row={row} />,
  },
];
