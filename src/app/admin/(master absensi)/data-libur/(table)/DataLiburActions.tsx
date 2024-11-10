"use client";
import { GearIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DataLibur } from "@/store/dataLibur/dataLibur.types";
import { useDataLiburStore } from "@/store/dataLibur/dataLiburStore";

interface DataTableRowActionsProps<DataLibur> {
  row: Row<DataLibur>;
}

export function DataLiburActions({ row }: DataTableRowActionsProps<DataLibur>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useDataLiburStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useDataLiburStore(
    (state) => state.setIsModalEditOpen,
  );

  const setDataLiburData = useDataLiburStore((state) => state.setDataLiburData);

  const setData = (row: DataLibur) => {
    setDataLiburData(row);
  };

  const handleDelete = (row: DataLibur) => {
    setDataLiburData(row);
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: DataLibur) => {
    setDataLiburData(row);
    setIsModalEditOpen(true);
  };
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <GearIcon
            className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
          />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleEdit(row.original)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Detail</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(row.original)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
