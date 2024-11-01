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
// import Modal from "@/components/custom/modal";
import { useState } from "react";
import { Jabatan } from "@/store/jabatan/jabatan.types";
import { useJabatanStore } from "@/store/jabatan/jabatanStore";

interface DataTableRowActionsProps<Jabatan> {
  row: Row<Jabatan>;
}

export function JabatanActions({ row }: DataTableRowActionsProps<Jabatan>) {
  const [isOpen, setIsOpen] = useState(false);

  const setJabatanData = useJabatanStore((state) => state.setJabatanData);
  const setIsModalDeleteOpen = useJabatanStore(
    (state) => state.setIsModalDeleteOpen,
  );

  const setIsModalEditOpen = useJabatanStore(
    (state) => state.setIsModalEditOpen,
  );

  const setData = (row: Jabatan) => {
    setJabatanData(row);
  };

  const handleDelete = (row: Jabatan) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: Jabatan) => {
    setJabatanData(row);
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
