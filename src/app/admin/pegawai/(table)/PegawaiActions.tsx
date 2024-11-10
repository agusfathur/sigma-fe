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
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { Pegawai } from "@/store/pegawai/pegawai.types";

interface DataTableRowActionsProps<Pegawai> {
  row: Row<Pegawai>;
}

export function PegawaiActions({ row }: DataTableRowActionsProps<Pegawai>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = usePegawaiStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = usePegawaiStore(
    (state) => state.setIsModalEditOpen,
  );
  const setIsModalDetailOpen = usePegawaiStore(
    (state) => state.setIsModalDetailOpen,
  );

  const setPegawaiData = usePegawaiStore((state) => state.setPegawaiData);

  const setData = (row: Pegawai) => {
    setPegawaiData(row);
  };

  const handleDelete = (row: Pegawai) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: Pegawai) => {
    setPegawaiData(row);
    setIsModalEditOpen(true);
  };

  const handleDetail = (row: Pegawai) => {
    setPegawaiData(row);
    setIsModalDetailOpen(true);
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
        <DropdownMenuItem onClick={() => handleDetail(row.original)}>
          Detail
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(row.original)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
