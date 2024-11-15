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
import { TunjanganTetapPegawai } from "@/store/tunjanganTetap/tunjanganTetapPegawai,types";
import { useTunjanganTetapPegawaiStore } from "@/store/tunjanganTetap/tunjanganTetapPegawaiStore";

interface DataTableRowActionsProps<TunjanganTetapPegawai> {
  row: Row<TunjanganTetapPegawai>;
}

export function TunjanganTetapPegawaiActions({
  row,
}: DataTableRowActionsProps<TunjanganTetapPegawai>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useTunjanganTetapPegawaiStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useTunjanganTetapPegawaiStore(
    (state) => state.setIsModalEditOpen,
  );
  const setTunjanganTetapPegawaiData = useTunjanganTetapPegawaiStore(
    (state) => state.setTunjanganTetapPegawaiData,
  );
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: TunjanganTetapPegawai) => {
    setTunjanganTetapPegawaiData(row);
    setIsModalDeleteOpen(true);
  };

  const handleEdit = (row: TunjanganTetapPegawai) => {
    setTunjanganTetapPegawaiData(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setTunjanganTetapPegawaiData(row);
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
