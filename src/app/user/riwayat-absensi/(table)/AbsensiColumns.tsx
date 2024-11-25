/* eslint-disable @typescript-eslint/no-explicit-any */
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
    cell: ({ row }) => {
      if (row.original.jadwal_id) {
        return <JadwalCell row={row} />;
      } else {
        return <span>-</span>;
      }
    },
  },
  {
    accessorKey: "waktu_masuk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu Masuk | Pulang" />
    ),
    cell: ({ row }) => {
      if (row.original.waktu_masuk || row.original.waktu_pulang) {
        return (
          <span>
            {row.original.waktu_masuk ?? "-"} {row.original.waktu_pulang ?? "-"}
          </span>
        );
      } else {
        return <span>-</span>;
      }
    },
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
            width={65}
            height={65}
            alt="image pegawai"
            className="rounded"
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
    accessorKey: "status_absen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let color: string;
      let status: string;
      switch (row.original.status_absen) {
        case "izin":
          status = "Izin";
          color = "bg-blue-200 text-blue-900";
          break;
        case "cuti":
          status = "Cuti";
          color = "bg-cyan-200 text-cyan-900";
          break;
        case "tidak_hadir":
          status = "Tidak Hadir";
          color = "bg-red-200 text-red-900";
          break;
        case "hadir":
          status = "Hadir";
          color = "bg-green-200 text-green-900";
          break;
        case "terlambat":
          status = "Terlambat";
          color = "bg-yellow-200 text-yellow-900";
        default:
          status = "Unknown";
          color = "bg-gray-200 text-gray-900";
          break;
      }
      return (
        <span
          className={`rounded-2xl px-2.5 py-1 text-center text-xs font-bold ${color} capitalize`}
        >
          {status}
        </span>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Action" />
  //   ),
  //   cell: ({ row }) => <AbsensiActions row={row} />,
  // },
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
