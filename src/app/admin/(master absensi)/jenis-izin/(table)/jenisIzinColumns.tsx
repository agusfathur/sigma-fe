import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { JenisIzinActions } from "./jenisIzinActions";
import { JenisIzin } from "@/store/jenisIzin/jenisIzin.types";

export const jenisIzinColumns: ColumnDef<JenisIzin>[] = [
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
      <DataTableColumnHeader column={column} title="Nama Jenis Izin" />
    ),
    cell: ({ row }) => <span>{row.getValue("nama")}</span>,
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => {
      let color;
      let text;
      switch (row.getValue("jenis")) {
        case "cuti":
          color = "bg-green-200 text-green-950";
          text = "Cuti";
          break;
        case "izin":
          color = "bg-blue-200 text-blue-950";
          text = "Izin";
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
    accessorKey: "jatah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jatah" />
    ),
    cell: ({ row }) => <span>{row.getValue("jatah")}</span>,
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <span>{row.getValue("tahun")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <JenisIzinActions row={row} />,
  },
];
