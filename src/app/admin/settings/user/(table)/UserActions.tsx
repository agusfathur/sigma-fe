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
import { User } from "@/store/user/user.types";
import { useUserStore } from "@/store/user/userStore";

interface DataTableRowActionsProps<User> {
  row: Row<User>;
}

export function UserActions({ row }: DataTableRowActionsProps<User>) {
  const [isOpen, setIsOpen] = useState(false);

  const setIsModalDeleteOpen = useUserStore(
    (state) => state.setIsModalDeleteOpen,
  );
  const setIsModalEditOpen = useUserStore((state) => state.setIsModalEditOpen);
  const setUserData = useUserStore((state) => state.setUserData);
  // const setIsModalDetailOpen = useTHRStore(
  //   (state) => state.setIsModalDetailOpen,
  // );
  const handleDelete = (row: User) => {
    setIsModalDeleteOpen(true);
    setUserData(row);
  };

  const handleEdit = (row: User) => {
    setUserData(row);
    setIsModalEditOpen(true);
  };
  // const handleDetail = (row: THR) => {
  //   setUserData(row);
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
