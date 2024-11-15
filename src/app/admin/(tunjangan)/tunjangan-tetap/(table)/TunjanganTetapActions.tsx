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
import { TunjanganTetap } from "@/store/tunjanganTetap/tunjanganTetap.types";
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";

interface DataTableRowActionsProps<TunjanganTetap> {
  row: Row<TunjanganTetap>;
}

export function TunjanganTetapActions({
  row,
}: DataTableRowActionsProps<TunjanganTetap>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useTunjanganTetapStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useTunjanganTetapStore(
    (state) => state.setIsModalEditOpen,
  );
  const setTunjanganTetap = useTunjanganTetapStore(
    (state) => state.setTunjanganTetap,
  );
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: TunjanganTetap) => {
    setTunjanganTetap(row);
    setIsModalDeleteOpen(true);
  };

  const handleEdit = (row: TunjanganTetap) => {
    setTunjanganTetap(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setTunjanganTetap(row);
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
