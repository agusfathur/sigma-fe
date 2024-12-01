/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { Button } from "@/components/custom/button";
import { IconEye, IconPrinter } from "@tabler/icons-react";

export const SlipGajiColumns: ColumnDef<SlipGaji>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },

  {
    accessorKey: "bulan tahun",

    accessorFn: (row) =>
      `${new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric", // Tambahkan jika ingin menampilkan tahun juga
      }).format(new Date(row.tahun, row.bulan - 1))}`,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bulan" />
    ),
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat("id-ID", {
          month: "long",
          year: "numeric", // Tambahkan jika ingin menampilkan tahun juga
        }).format(new Date(row.original.tahun, row.original.bulan - 1))}
      </span>
    ),
  },
  {
    accessorKey: "total_gaji_bersih",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Gaji Bersih" />
    ),
    cell: ({ row }) => {
      const total = new Intl.NumberFormat("id-Id").format(
        row.original.total_gaji_bersih,
      );
      return <span>Rp. {total}</span>;
    },
  },

  {
    accessorKey: "status_pembayaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pembayaran" />
    ),
    cell: ({ row }) => {
      let color: string = "";
      switch (row.original.status_pembayaran) {
        case "proses":
          color = "bg-blue-200 text-blue-900";
          break;
        case "dibayar":
          color = "bg-green-200 text-green-900";
          break;
        case "pending":
          color = "bg-red-200 text-red-900";
          break;
        default:
          break;
      }

      let colorPembayaran: string = "";
      switch (row.original.pembayaran_gaji[0].metode_pembayaran) {
        case "transfer":
          colorPembayaran = "bg-blue-200 text-blue-900";
          break;
        case "cash":
          colorPembayaran = "bg-green-200 text-green-900";
          break;
        default:
          colorPembayaran = "bg-red-200 text-red-900";
          break;
      }

      return (
        <div className="inline-flex flex-col gap-2">
          <span
            className={`inline-block rounded-2xl px-2.5 py-1 text-center text-xs font-bold ${colorPembayaran} capitalize`}
          >
            {row.original.pembayaran_gaji[0].metode_pembayaran ?? "-"}
          </span>
          <span
            className={`inline-block rounded-2xl px-2.5 py-1 text-center text-xs font-bold ${color} capitalize`}
          >
            {row.original.status_pembayaran}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <SlipGajiActions row={row.original} />,
  },
];

export const SlipGajiActions = ({ row }: { row: SlipGaji }) => {
  const setSlipGajiData = useSlipGajiStore((state) => state.setSlipGajiData);
  const setIsModalDetailOpen = useSlipGajiStore(
    (state) => state.setIsModalDetailOpen,
  );

  const handleDetail = (row: SlipGaji) => {
    setSlipGajiData(row);
    setIsModalDetailOpen(true);
  };

  return (
    <div className="flex space-x-2">
      <Button className="h-8 w-8 p-0" onClick={() => handleDetail(row)}>
        <IconEye className="h-4 w-4" />
      </Button>
      <Button className="h-8 w-8 p-0">
        <IconPrinter className="h-4 w-4" onClick={() => handleDetail(row)} />
      </Button>
    </div>
  );
};
