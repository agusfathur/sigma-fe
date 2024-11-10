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
import { Lokasi } from "@/store/lokasi/lokasi.types";
import { useLokasiStore } from "@/store/lokasi/lokasiStore";

interface DataTableRowActionsProps<Lokasi> {
  row: Row<Lokasi>;
}

export function LokasiActions({ row }: DataTableRowActionsProps<Lokasi>) {
  const [isOpen, setIsOpen] = useState(false);

  const setLokasiData = useLokasiStore((state) => state.setLokasiData);
  const setIsModalDeleteOpen = useLokasiStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useLokasiStore(
    (state) => state.setIsModalEditOpen,
  );

  const setIsModalDetailOpen = useLokasiStore(
    (state) => state.setIsModalDetailOpen,
  );
  const setData = (row: Lokasi) => {
    setLokasiData(row);
  };

  const handleDelete = (row: Lokasi) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: Lokasi) => {
    setLokasiData(row);
    setIsModalEditOpen(true);
  };

  const handleDetail = (row: Lokasi) => {
    setLokasiData(row);
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
