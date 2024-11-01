import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onClickTambah?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  onClickTambah,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Search..."
          // Menggunakan getGlobalFilterValue untuk mendapatkan nilai filter global
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Button
          variant="outline"
          onClick={() => table.setGlobalFilter("")}
          className="h-8 px-2 lg:px-3"
        >
          Reset
        </Button>
        {/* <DataTableViewOptions table={table} /> */}
        <Button
          variant="default"
          size="sm"
          className="ml-auto mr-1 h-8 justify-end px-2 text-sm lg:px-3"
          onClick={() => onClickTambah && onClickTambah()}
        >
          Tambah
        </Button>
      </div>
    </div>
  );
}
