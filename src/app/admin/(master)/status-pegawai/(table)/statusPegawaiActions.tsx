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
import { StatusKepegawaian } from "@/store/statusKepegawaian/statusKepegawaian.types";
import { useStatusKepegawaianStore } from "@/store/statusKepegawaian/statusKepegawaianStore";

interface DataTableRowActionsProps<JabatanFungsional> {
  row: Row<JabatanFungsional>;
}

export function StatusPegawaiActions({
  row,
}: DataTableRowActionsProps<StatusKepegawaian>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useStatusKepegawaianStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useStatusKepegawaianStore(
    (state) => state.setIsModalEditOpen,
  );

  const setStatusKepegawaianData = useStatusKepegawaianStore(
    (state) => state.setStatusKepegawaianData,
  );

  const setData = (row: StatusKepegawaian) => {
    setStatusKepegawaianData(row);
  };

  const handleDelete = (row: StatusKepegawaian) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: StatusKepegawaian) => {
    setStatusKepegawaianData(row);
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
