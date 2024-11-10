import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { KategoriLiburActions } from "./kategoriLiburActions";
import { KategoriLibur } from "@/store/kategoriLibur/katagoriLibur.types";

export const kategoriLiburColumns: ColumnDef<KategoriLibur>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori Libur" />
    ),
    cell: ({ row }) => <span>{row.getValue("jenis")}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <KategoriLiburActions row={row} />,
  },
];
