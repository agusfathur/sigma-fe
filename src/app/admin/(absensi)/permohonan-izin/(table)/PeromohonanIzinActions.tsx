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
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";

interface DataTableRowActionsProps<PermohonanIzin> {
  row: Row<PermohonanIzin>;
}

export function PermohonanIzinActions({
  row,
}: DataTableRowActionsProps<PermohonanIzin>) {
  const [isOpen, setIsOpen] = useState(false);

  // const setIsModalDeleteOpen = useAbsensiStore(
  //   (state) => state.setIsModalDeleteOpen,
  // );
  const setIsModalEditOpen = usePermohonanIzinStore(
    (state) => state.setIsModalEditOpen,
  );
  const setPermohonanIzinData = usePermohonanIzinStore(
    (state) => state.setPermohonanIzinData,
  );
  const setIsModalDetailOpen = usePermohonanIzinStore(
    (state) => state.setIsModalDetailOpen,
  );
  // const handleDelete = (row: Absensi) => {
  //   setIsModalDeleteOpen(true);
  //   setData(row);
  // };

  const handleEdit = (row: PermohonanIzin) => {
    setPermohonanIzinData(row);
    setIsModalEditOpen(true);
  };
  const handleDetail = (row: PermohonanIzin) => {
    setPermohonanIzinData(row);
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
