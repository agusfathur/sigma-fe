/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";
import { PermohonanIzinActions } from "./PeromohonanIzinActions";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { Button } from "@/components/custom/button";
import { IconEye } from "@tabler/icons-react";

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
    accessorFn: (row) => `${row.tanggal_dari} | ${row.tanggal_sampai}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggalDari = row.original.tanggal_dari.split("T")[0];
      const tanggalSampai = row.original.tanggal_sampai.split("T")[0];
      return (
        <span>
          {tanggalDari} | {tanggalSampai}
        </span>
      );
    },
  },
  {
    id: "jenis_izin",
    accessorFn: (row) => {
      const jenisMohonIzin = row.jenis_mohon_izin;
      const kategoriIzin = row.jenis_izin.nama;

      return `${jenisMohonIzin} | ${kategoriIzin}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jeniz Izin" />
    ),
    cell: ({ row }) => {
      const jenisMohonIzin = row.original.jenis_mohon_izin;
      const kategoriIzin = row.original.jenis_izin.nama;

      return (
        <span>
          {jenisMohonIzin} | {kategoriIzin}
        </span>
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
    cell: ({ row }) => <BuktiCell row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <PermohonanIzinActions row={row} />,
  },
];

const BuktiCell = ({ row }: any) => {
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
      className="h-8 w-8 p-0"
      onClick={() => handleDetail(row.original)}
    >
      <span className="sr-only">Detail</span>
      <IconEye className="h-4 w-4" />
    </Button>
  );
};
