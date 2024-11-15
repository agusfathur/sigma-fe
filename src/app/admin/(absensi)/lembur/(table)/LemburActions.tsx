"use client";
import { GearIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useLemburStore } from "@/store/lembur/lemburStore";
import { Lembur } from "@/store/lembur/lembur.types";

interface DataTableRowActionsProps<Lembur> {
  row: Row<Lembur>;
}

export function LemburActions({ row }: DataTableRowActionsProps<Lembur>) {
  const [isOpen, setIsOpen] = useState(false);

  // const setIsModalDeleteOpen = useAbsensiStore(
  //   (state) => state.setIsModalDeleteOpen,
  // );
  const setIsModalEditOpen = useLemburStore(
    (state) => state.setIsModalEditOpen,
  );
  const setLemburData = useLemburStore((state) => state.setLemburData);
  const setIsModalDetailOpen = useLemburStore(
    (state) => state.setIsModalDetailOpen,
  );
  // const handleDelete = (row: Absensi) => {
  //   setIsModalDeleteOpen(true);
  //   setData(row);
  // };

  const handleEdit = (row: Lembur) => {
    setLemburData(row);
    setIsModalEditOpen(true);
  };
  const handleDetail = (row: Lembur) => {
    setLemburData(row);
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
          Edit Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDetail(row.original)}>
          Detail
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => handleDelete(row.original)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
