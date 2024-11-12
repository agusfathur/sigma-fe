import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import Image from "next/image";
import { AbsensiActions } from "./AbsensiActions";
import { Absensi } from "@/store/absensi/absensi.types";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { IconEye } from "@tabler/icons-react";
import { Button } from "@/components/custom/button";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";

export const absensiColumns: ColumnDef<Absensi>[] = [
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
    accessorKey: "tanggal_absen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const tanggalHari = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(new Date(row.getValue("tanggal_absen")));

      const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
      }).format(new Date(row.getValue("tanggal_absen")));

      return (
        <span>
          {tanggalHari.split(",")[0]}, {tanggal}
        </span>
      );
    },
  },
  {
    accessorKey: "jadwal_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jadwal Masuk | Pulang" />
    ),
    cell: ({ row }) => <JadwalCell row={row} />,
  },
  {
    accessorKey: "waktu_masuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Masuk | Pulang" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.waktu_masuk ?? "-"} | {row.original.waktu_pulang ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "foto_masuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foto Masuk" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.foto_masuk && (
          <Image
            src={row.original.foto_masuk}
            width={50}
            height={50}
            alt="image pegawai"
          />
        )}
      </>
    ),
  },
  {
    accessorKey: "foto_pulang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foto Pulang" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.foto_pulang && (
          <Image
            src={row.original.foto_pulang}
            width={50}
            height={50}
            alt="image pegawai"
          />
        )}
      </>
    ),
  },
  {
    accessorKey: "koordinat_masuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Koordinat" />
    ),
    cell: ({ row }) => <KoordinatCell row={row} />,
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <AbsensiActions row={row} />,
  },
];

const JadwalCell = ({ row }: any) => {
  const getJamKerja = useJamKerjaStore((state) => state.jamKerjaById);

  const jamKerja = getJamKerja(row.original.jadwal_pegawai.shift_id);
  return (
    <span>
      {jamKerja?.waktu_masuk ?? "-"} | {jamKerja?.waktu_pulang ?? "-"}
    </span>
  );
};

const KoordinatCell = ({ row }: any) => {
  const setIsModalKoordinatOpen = useAbsensiStore(
    (state) => state.setIsModalKoordinatOpen,
  );

  const setAbsensiData = useAbsensiStore((state) => state.setAbsensiData);

  const handleKoordinat = (row: Absensi) => {
    setAbsensiData(row);
    setIsModalKoordinatOpen(true);
  };

  return (
    <Button
      size={"icon"}
      className="h-8 w-8 p-0"
      onClick={() => handleKoordinat(row.original)}
    >
      <span className="sr-only">Detail</span>
      <IconEye className="h-4 w-4" />
    </Button>
  );
};
