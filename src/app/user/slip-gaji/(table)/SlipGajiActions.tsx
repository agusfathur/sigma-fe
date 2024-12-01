"use client";
import { GearIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { usePembayaranGajiStore } from "@/store/pembayaranGaji/pembayaranGajiStore";

interface DataTableRowActionsProps<SlipGaji> {
  row: Row<SlipGaji>;
}

export function SlipGajiActions({ row }: DataTableRowActionsProps<SlipGaji>) {
  const [isOpen, setIsOpen] = useState(false);

  // const setIsModalDeleteOpen = useSlipGajiStore(
  //   (state) => state.setIsModalDeleteOpen,
  // );
  const setIsModalEditOpen = useSlipGajiStore(
    (state) => state.setIsModalEditOpen,
  );
  const fetchPembayaranGaji = usePembayaranGajiStore(
    (state) => state.fetchPembayaranGajiBySlipGaji,
  );
  const setSlipGajiData = useSlipGajiStore((state) => state.setSlipGajiData);
  const setIsModalDetailOpen = useSlipGajiStore(
    (state) => state.setIsModalDetailOpen,
  );
  // const handleDelete = (row: SlipGaji) => {
  //   setIsModalDeleteOpen(true);
  //   setSlipGajiData(row);
  // };

  const handleEdit = async (row: SlipGaji) => {
    await fetchPembayaranGaji(row.id_slip_gaji);
    setSlipGajiData(row);
    setIsModalEditOpen(true);
  };
  const handleDetail = (row: SlipGaji) => {
    console.log(row);
    setSlipGajiData(row);
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

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(row.original)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
