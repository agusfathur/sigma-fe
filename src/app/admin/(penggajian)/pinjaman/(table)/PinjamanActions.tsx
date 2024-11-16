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
import { Pinjaman } from "@/store/pinjaman/pinjaman.types";
import { usePinjamanStore } from "@/store/pinjaman/pinjamanStore";

interface DataTableRowActionsProps<Pinjaman> {
  row: Row<Pinjaman>;
}

export function PinjamanActions({ row }: DataTableRowActionsProps<Pinjaman>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = usePinjamanStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = usePinjamanStore(
    (state) => state.setIsModalEditOpen,
  );
  const setPinjamanData = usePinjamanStore((state) => state.setPinjamanData);
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: Pinjaman) => {
    setIsModalDeleteOpen(true);
    setPinjamanData(row);
  };

  const handleEdit = (row: Pinjaman) => {
    setPinjamanData(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setPinjamanData(row);
  //   setIsModalDetailOpen(true);
  // };

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
