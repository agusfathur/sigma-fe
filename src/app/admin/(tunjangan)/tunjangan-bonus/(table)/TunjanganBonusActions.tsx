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
import { TunjanganBonus } from "@/store/tunjanganBonus/tunjanganBonus.types";
import { useTunjanganBonusStore } from "@/store/tunjanganBonus/tunjanganBonusStore";

interface DataTableRowActionsProps<TunjanganBonus> {
  row: Row<TunjanganBonus>;
}

export function TunjanganBonusActions({
  row,
}: DataTableRowActionsProps<TunjanganBonus>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useTunjanganBonusStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useTunjanganBonusStore(
    (state) => state.setIsModalEditOpen,
  );
  const setTunjanganBonusData = useTunjanganBonusStore(
    (state) => state.setTunjanganBonusData,
  );
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: TunjanganBonus) => {
    setIsModalDeleteOpen(true);
    setTunjanganBonusData(row);
  };

  const handleEdit = (row: TunjanganBonus) => {
    setTunjanganBonusData(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setTunjanganBonusData(row);
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
