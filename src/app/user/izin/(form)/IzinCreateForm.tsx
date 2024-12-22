/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { usePermohonanIzinStore } from "@/store/permohonanIzin/permohonanIzinStore";
import { IzinCreateSchema, TypeIzinCreateSchemaCreate } from "./IzinSchema";
import { useJenisIzinStore } from "@/store/jenisIzin/jenisIzinStore";
import { useSession } from "next-auth/react";
import axiosJWT from "@/lib/authJWT";
import { useToastStore } from "@/store/toastStore";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import { useAbsensiStore } from "@/store/absensi/absensiStore";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";
import { Absensi } from "@/store/absensi/absensi.types";
import { JadwalKerja } from "@/store/jadwalKerja/jadwalKerja.types";

interface IzinCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function IzinCreateForm({ onSuccess }: IzinCreateFormProps) {
  const { data: session } = useSession();
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [sumIzin, setSumIzin] = useState({
    tidak_hadir: 0,
    cuti: 0,
  });

  const { fetchJadwalKerjaPegawaiByUserFilter } = useJadwalKerjaStore();
  const { fetchAllAbsensiByUserFilter } = useAbsensiStore();

  const {
    fetchPermohonanIzinByUserFilter,
    insertPermohonanIzin,
    fetchPermohonanIzinByTahun,
  } = usePermohonanIzinStore();
  const date = useMemo(() => new Date(), []);

  const jenisIzin = useJenisIzinStore((state) => state.jenisIzin);
  const fetchJenisIzin = useJenisIzinStore((state) => state.fetchJenisIzin);

  const jenisIzinOptions: Option[] = jenisIzin.map((item) => ({
    value: item.id_jenis_izin,
    label: `${item.jenis} | ${item.nama} (sisa: ${item.jatah})`,
  }));

  const filterJenisIzin = useMemo(() => {
    return jenisIzin.find(
      (item) =>
        item.nama.toLowerCase().includes("tahunan") &&
        item.tahun === date.getFullYear(),
    );
  }, [date, jenisIzin]);

  const jenisMohonIzinOptions: Option[] = [
    { value: "cuti", label: "Cuti" },
    { value: "izin", label: "Izin" },
  ];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [buktiMessage, setBuktiMessage] = useState<string>("");

  const formIzin = useForm<TypeIzinCreateSchemaCreate>({
    resolver: zodResolver(IzinCreateSchema),
    defaultValues: {
      jenis_izin_id: "",
      jenis_mohon_izin: "",
      tanggal_dari: "",
      tanggal_sampai: "",
      keterangan: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileName = file?.name;
      const fileExt = fileName.split(".")[fileName.split(".").length - 1];
      const ext = ["pdf", "png", "jpg", "jpeg", "PDF", "PNG", "JPG", "JPEG"];
      if (!ext.includes(fileExt)) {
        setBuktiMessage(
          "Format File Tidak Sesuai, Silahkan Upload File PDF, PNG, JPG, JPEG",
        );
        return;
      } else {
        setBuktiMessage("");
        formIzin.setValue("bukti", fileName);
        setSelectedFile(file); // Store the selected file
      }
    } else {
      setBuktiMessage("");
      setSelectedFile(null);
    }
  };

  const getSumIzin = useCallback(async () => {
    const tanggalHariIni = new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-");
    try {
      const getIzins =
        (await fetchPermohonanIzinByTahun(
          date.getFullYear().toString(),
          session?.user.id as string,
        )) || [];
      const getJadwal =
        (await fetchJadwalKerjaPegawaiByUserFilter(
          session?.user.id as string,
          `tahun=${date.getFullYear()}`,
        )) || [];

      const getAbsensi =
        (await fetchAllAbsensiByUserFilter(
          session?.user.id as string,
          `tahun=${date.getFullYear()}`,
        )) || [];

      const filterIzinDiterima = getIzins.filter(
        (izin: PermohonanIzin) => izin.status === "diterima",
      );
      const filterJadwal = getJadwal.filter((jadwal: JadwalKerja) => {
        const jadwalTanggal = new Date(jadwal.tanggal); // Konversi tanggal jadwal ke objek Date
        const hariIni = new Date(tanggalHariIni); // Konversi tanggal hari ini ke objek Date
        return jadwalTanggal <= hariIni; // Bandingkan dua objek Date
      });

      const filterAbsensiMasuk = getAbsensi.filter(
        (absensi: Absensi) =>
          absensi.status_absen === "hadir" ||
          absensi.status_absen === "terlambat",
      );

      setSumIzin({
        cuti: filterIzinDiterima.length,
        tidak_hadir: filterJadwal.length - filterAbsensiMasuk.length,
      });
    } catch (error) {
      console.log(error);
    }
  }, [
    date,
    fetchPermohonanIzinByTahun,
    session?.user.id,
    fetchJadwalKerjaPegawaiByUserFilter,
    fetchAllAbsensiByUserFilter,
  ]);

  const onSubmit = async (data: TypeIzinCreateSchemaCreate) => {
    setIsLoading(true);
    try {
      const findIzin = jenisIzin.find(
        (item) => item.id_jenis_izin === data.jenis_izin_id,
      );
      if (findIzin?.nama.toLowerCase().includes("tahunan")) {
        if (
          (filterJenisIzin?.jatah || 0) <
          sumIzin.cuti + sumIzin.tidak_hadir
        ) {
          formIzin.reset();
          onSuccess();
          setToast({
            isOpen: true,
            message: "Gagal: Jatah Cuti Telah Penuh",
            type: "error",
          });
          return;
        }
      }

      const pegawai = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pegawai/user/${session?.user?.id}`,
      );

      if (selectedFile) {
        const res = await insertPermohonanIzin({
          ...data,
          pegawai_id: pegawai.data.data.id_pegawai as string,
          bukti: selectedFile as File,
          status: "pending",
        });
      }
      formIzin.reset();
      onSuccess();
      setToast({
        isOpen: true,
        message: "izin cuti Berhasil Ditambahkan",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "izin cuti Gagal Ditambahkan",
        type: "error",
      });
      console.error("Error Insert Permohonan Izin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSumIzin();
    fetchJenisIzin();
  }, [fetchJenisIzin, getSumIzin]);

  return (
    <>
      <FormProvider {...formIzin}>
        <form onSubmit={formIzin.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* jenis mohon izin */}
            <FormField
              control={formIzin.control}
              name="jenis_mohon_izin"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Izin / Cuti
                  </FormLabel>
                  <Select
                    options={jenisMohonIzinOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Izin / Cuti"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "black", // Warna border saat di-focus
                        primary25: "#e5e7eb", // Warna abu-abu terang saat di-hover
                        primary50: "#d1d5db", // Warna abu-abu saat di-click
                        neutral20: "black", // Border default
                        neutral80: "black",
                      },
                    })}
                    onChange={(selectedOption) =>
                      field.onChange(
                        selectedOption ? String(selectedOption.value) : "",
                      )
                    }
                  />
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            {/* jenis izin */}

            <FormField
              control={formIzin.control}
              name="jenis_izin_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Jenis Izin
                  </FormLabel>
                  <Select
                    options={jenisIzinOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select jenis izin"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "black", // Warna border saat di-focus
                        primary25: "#e5e7eb", // Warna abu-abu terang saat di-hover
                        primary50: "#d1d5db", // Warna abu-abu saat di-click
                        neutral20: "black", // Border default
                        neutral80: "black",
                      },
                    })}
                    onChange={(selectedOption) =>
                      field.onChange(
                        selectedOption ? String(selectedOption.value) : "",
                      )
                    }
                  />

                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* tanggal */}
            <div className="flex w-full space-x-2">
              <div className="w-1/2">
                <FormField
                  control={formIzin.control}
                  name="tanggal_dari"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Dari Tanggal
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="tanggal" type="date" {...field} />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={formIzin.control}
                  name="tanggal_sampai"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Sampai Tanggal
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tanggal"
                          className="w-full"
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* keterangan */}
            <FormField
              control={formIzin.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Keterangan
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="keterangan" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* Bukti */}
            <FormField
              control={formIzin.control}
              name="bukti"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Bukti</FormLabel>
                  <FormControl>
                    <Input
                      name="bukti"
                      type="file"
                      className="w-full rounded-md border-black dark:text-white"
                      placeholder="foto pegawai"
                      accept="pdf/*, image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleFileChange(e);
                      }}
                    />
                  </FormControl>
                  <div className="flex h-2 space-x-1 md:space-x-2">
                    {buktiMessage && (
                      <p className="text-xs text-red-700">{buktiMessage}</p>
                    )}
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" loading={isLoading}>
              Buat Izin
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
