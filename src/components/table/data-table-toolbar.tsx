import { Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onClickTambah?: () => void;
  onFilterChange?: () => void;
  onSettingChange?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  onClickTambah,
  onFilterChange,
  onSettingChange,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-start gap-y-2 space-x-1 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-1">
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
        </div>
        {/* <DataTableViewOptions table={table} /> */}
        <div className="flex space-x-1">
          {onFilterChange && (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto h-8 justify-end border-black px-2 text-sm dark:border-white lg:px-3"
              onClick={() => onFilterChange && onFilterChange()}
            >
              Filter
            </Button>
          )}
          {onSettingChange && (
            <Button
              variant="default"
              size="sm"
              className="ml-auto h-8 justify-end px-2 text-sm lg:px-3"
              onClick={() => onSettingChange()}
            >
              Setting
            </Button>
          )}
          {onClickTambah && (
            <Button
              variant="default"
              size="sm"
              className="ml-auto h-8 justify-end px-2 text-sm lg:px-3"
              onClick={() => onClickTambah()}
            >
              Tambah
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
