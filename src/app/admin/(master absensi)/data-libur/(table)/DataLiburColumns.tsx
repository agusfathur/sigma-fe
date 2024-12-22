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
    cell: ({ row }) => {
      let color;
      let text;
      switch (row.getValue("status_absen")) {
        case "hadir":
          color = "bg-green-200 text-green-950";
          text = "Hadir";
          break;
        case "tidak_hadir":
          color = "bg-red-200 text-red-950";
          text = "Tidak Hadir";
          break;
        default:
          color = "bg-gray-200 text-gray-950";
          text = "-";
          break;
      }
      return (
        <span
          className={`rounded-2xl px-3 py-1 text-center text-xs font-bold ${color} capitalize`}
        >
          {text}
        </span>
      );
    },
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
