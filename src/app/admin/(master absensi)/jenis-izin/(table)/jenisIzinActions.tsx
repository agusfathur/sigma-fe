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
import { JenisIzin } from "@/store/jenisIzin/jenisIzin.types";
import { useJenisIzinStore } from "@/store/jenisIzin/jenisIzinStore";

interface DataTableRowActionsProps<JenisIzin> {
  row: Row<JenisIzin>;
}

export function JenisIzinActions({ row }: DataTableRowActionsProps<JenisIzin>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useJenisIzinStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useJenisIzinStore(
    (state) => state.setIsModalEditOpen,
  );

  const setJenisIzinData = useJenisIzinStore((state) => state.setJenisIzinData);

  const setData = (row: JenisIzin) => {
    setJenisIzinData(row);
  };

  const handleDelete = (row: JenisIzin) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: JenisIzin) => {
    setJenisIzinData(row);
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
