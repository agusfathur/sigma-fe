/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { User } from "@/store/user/user.types";
import { UserActions } from "./UserActions";
import Image from "next/image";

export const UserColumns: ColumnDef<User>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    id: "image",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foto" sortable={false} />
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={`${row.original?.image}` || ""}
          alt="image"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span>{row.original.username}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <span>{row.original.role}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <UserActions row={row} />,
  },
];
