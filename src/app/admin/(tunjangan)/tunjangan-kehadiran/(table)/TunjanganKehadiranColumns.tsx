/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { TunjanganKehadiran } from "@/store/tunjanganKehadiran/tunjanganKehadiran.types";
import { TunjanganKehadiranActions } from "./TunjanganKehadiranActions";

export const TunjanganKehadiranColumns: ColumnDef<TunjanganKehadiran>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "nominal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nominal" />
    ),
    cell: ({ row }) => {
      const total = new Intl.NumberFormat("id-Id").format(row.original.nominal);
      return <span>Rp. {total}</span>;
    },
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <span>{row.original.tahun}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <TunjanganKehadiranActions row={row} />,
  },
];
