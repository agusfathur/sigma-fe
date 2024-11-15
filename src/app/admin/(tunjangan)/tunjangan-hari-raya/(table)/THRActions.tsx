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
import { useTHRStore } from "@/store/THR/THRStore";
import { THR } from "@/store/THR/THR.types";

interface DataTableRowActionsProps<THR> {
  row: Row<THR>;
}

export function THRActions({ row }: DataTableRowActionsProps<THR>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useTHRStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useTHRStore((state) => state.setIsModalEditOpen);
  const setTHRData = useTHRStore((state) => state.setTHRData);
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: THR) => {
    setIsModalDeleteOpen(true);
    setTHRData(row);
  };

  const handleEdit = (row: THR) => {
    setTHRData(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setTHRData(row);
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
