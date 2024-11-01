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
import { JabatanFungsional } from "@/store/jabatanFungsional/jabatanFungsional.types";
import { useJabatanFungsionalStore } from "@/store/jabatanFungsional/jabatanFungsionalStore";

interface DataTableRowActionsProps<JabatanFungsional> {
  row: Row<JabatanFungsional>;
}

export function JabatanFungsionalActions({
  row,
}: DataTableRowActionsProps<JabatanFungsional>) {
  const [isOpen, setIsOpen] = useState(false);

  const setJabatanFungsionalData = useJabatanFungsionalStore(
    (state) => state.setJabatanFungsionalData,
  );
  const setIsModalDeleteOpen = useJabatanFungsionalStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useJabatanFungsionalStore(
    (state) => state.setIsModalEditOpen,
  );

  const setData = (row: JabatanFungsional) => {
    setJabatanFungsionalData(row);
  };

  const handleDelete = (row: JabatanFungsional) => {
    setIsModalDeleteOpen(true);
    setData(row);
  };
  const handleEdit = (row: JabatanFungsional) => {
    setJabatanFungsionalData(row);
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
