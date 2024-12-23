/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { SlipGaji } from "@/store/slipGaji/slipGaji.types";
import { Button } from "@/components/custom/button";
import { IconPrinter } from "@tabler/icons-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { LapSlipGajiPegawaiPDF } from "../(pdf)/LapSlipGajiPegawaiPDF";
import { useDataSekolahStore } from "@/store/dataSekolah/dataSekolahStore";

// export interface LapIzinCutiTypes {
//   izinCuti;
// }

export const LapSlipGajiColumns: ColumnDef<SlipGaji>[] = [
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
    accessorKey: "pegawai.jabatan.nama",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jabatan" />
    ),
    cell: ({ row }) => <span>{row.original.pegawai.jabatan?.nama}</span>,
  },
  {
    accessorKey: "Bulan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bulan" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.bulan} - {row.original.tahun}
      </span>
    ),
  },
  {
    accessorKey: "gaji_pokok",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gaji Pokok" />
    ),
    cell: ({ row }) => (
      <span>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID").format(row.original.gaji_pokok || 0)}
      </span>
    ),
  },
  {
    id: "total_tunjangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Tunjangan" />
    ),
    cell: ({ row }) => {
      const totalTj =
        row.original.tunjangan_kehadiran +
        row.original.tunjangan_lembur +
        row.original.tunjangan_tetap +
        row.original.tunjangan_bonus +
        row.original.tunjangan_fungsional;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalTj || 0)}</span>
      );
    },
  },
  {
    id: "total_potongan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Potongan" />
    ),
    cell: ({ row }) => {
      const totalPt =
        row.original.pinjaman + row.original.potong_gaji + row.original.pajak;
      return (
        <span>Rp. {new Intl.NumberFormat("id-ID").format(totalPt || 0)}</span>
      );
    },
  },
  {
    accessorKey: "total_gaji_kotor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gaji Kotor" />
    ),
    cell: ({ row }) => (
      <span>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID").format(
          row.original.total_gaji_kotor || 0,
        )}
      </span>
    ),
  },
  {
    accessorKey: "total_gaji_bersih",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gaji Bersih" />
    ),
    cell: ({ row }) => (
      <span>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID").format(
          row.original.total_gaji_bersih || 0,
        )}
      </span>
    ),
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <ButtonPrint slipGaji={row.original} />,
  },
];

export const ButtonPrint = ({ slipGaji }: { slipGaji: SlipGaji }) => {
  const { dataSekolah } = useDataSekolahStore();

  return (
    <>
      <PDFDownloadLink
        document={
          <LapSlipGajiPegawaiPDF gaji={slipGaji} dataSekolah={dataSekolah} />
        }
        fileName={`Slip Gaji - ${slipGaji.bulan}-${slipGaji.tahun} - ${slipGaji.pegawai.nama} .pdf`}
      >
        <Button variant="default">
          <IconPrinter className="h-5 w-5" />
        </Button>
      </PDFDownloadLink>
    </>
  );
};
