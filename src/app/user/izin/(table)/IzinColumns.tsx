/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { Button } from "@/components/custom/button";
import { IconEye } from "@tabler/icons-react";
import { IzinActions } from "./IzinActions";

export const permohonanIzinColumns: ColumnDef<PermohonanIzin>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <span>{row.index + 1}</span>,
    accessorFn: (row, index) => index + 1,
  },
  {
    accessorKey: "pegawai.nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pegawai" />
    ),
    cell: ({ row }) => <span>{row.original.pegawai.nama}</span>,
  },
  {
    id: "tanggal",
    accessorFn: (row) => `${row.tanggal_dari} ${row.tanggal_sampai}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggalDari = row.original.tanggal_dari.split("T")[0];
      const tanggalSampai = row.original.tanggal_sampai.split("T")[0];
      return (
        <div className="tex-xs flex flex-col">
          <span>{tanggalDari}</span>
          <span>{tanggalSampai}</span>
        </div>
      );
    },
  },
  {
    id: "jenis_izin",
    accessorFn: (row) => {
      const jenisMohonIzin = row.jenis_mohon_izin;
      const kategoriIzin = row.jenis_izin.nama;

      return `${jenisMohonIzin}  ${kategoriIzin}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jeniz Izin" />
    ),
    cell: ({ row }) => {
      const jenisMohonIzin = row.original.jenis_mohon_izin;
      const kategoriIzin = row.original.jenis_izin.nama;

      return (
        <div className="tex-xs flex flex-col capitalize">
          <span>{jenisMohonIzin}</span>
          <span>{kategoriIzin}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_hari",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berapa Hari" />
    ),
    cell: ({ row }) => <span>{row.original.total_hari} Hari</span>,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.keterangan}</span>;
    },
  },
  {
    accessorKey: "bukti",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bukti" />
    ),
    cell: ({ row }) => <BuktiCell row={row.original} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let color: string;
      switch (row.original.status) {
        case "pending":
          color = "bg-blue-200 text-blue-900";
          break;
        case "diterima":
          color = "bg-green-200 text-green-900";
          break;
        case "ditolak":
          color = "bg-red-200 text-red-900";
          break;
        default:
          color = "bg-gray-200 text-gray-900";
          break;
      }
      return (
        <span
          className={`rounded-2xl px-3 py-1 text-center text-xs font-bold ${color} capitalize`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <IzinActions row={row} />,
  },
];

const BuktiCell = ({ row }: { row: PermohonanIzin }) => {
  const setIsModalDetailOpen = usePermohonanIzinStore(
    (state) => state.setIsModalDetailOpen,
  );

  const setPermohonanIzinData = usePermohonanIzinStore(
    (state) => state.setPermohonanIzinData,
  );

  const handleDetail = (row: PermohonanIzin) => {
    setPermohonanIzinData(row);
    setIsModalDetailOpen(true);
  };

  return (
    <Button
      size={"icon"}
      className="h-7 w-7 p-0"
      onClick={() => handleDetail(row)}
    >
      <span className="sr-only">Detail</span>
      <IconEye className="h-4 w-4" />
    </Button>
  );
};
