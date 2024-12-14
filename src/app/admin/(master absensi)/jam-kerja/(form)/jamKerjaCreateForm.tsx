/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { useJamKerjaStore } from "@/store/jamKerja/jamKerjaStore";
import { JamKerjaCreateSchema, TypeJamKerjaCreate } from "./jamKerjaSchema";
import { useToastStore } from "@/store/toastStore";

interface JamKerjaCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function JamKerjaCreateForm({
  onSuccess,
}: JamKerjaCreateFormProps) {
  const { setToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [waktuMasuk, setWaktuMasuk] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");
  const [durasiKerja, setDurasiKerja] = useState(0);
  const insertJamKerja = useJamKerjaStore((state) => state.insertJamKerja);

  const formJamKerja = useForm<TypeJamKerjaCreate>({
    resolver: zodResolver(JamKerjaCreateSchema),
    defaultValues: {
      shift_kerja: "masa_mbkm",
      waktu_masuk: "",
      waktu_pulang: "",
      durasi_kerja: 0,
      keterangan: "",
    },
  });

  const categoryOptions: Option[] = [
    {
      value: "masa_mbkm",
      label: "Masa MBKM",
    },
    {
      value: "libur_mbkm",
      label: "Masa Non MBKM",
    },
  ];

  const getDurasiKerja = ({
    waktuMasuk,
    waktuPulang,
  }: {
    waktuMasuk?: string | undefined;
    waktuPulang?: string | undefined;
  }) => {
    const waktu_masuk = waktuMasuk || "00:00";
    const waktu_pulang = waktuPulang || "00:00";

    const jamMasuk = parseInt(waktu_masuk.split(":")[0]);

    const jamPulang = parseInt(waktu_pulang.split(":")[0]);
    let durasiKerja = jamPulang - jamMasuk;
    if (durasiKerja < 0) {
      durasiKerja = 0;
    }
    setDurasiKerja(durasiKerja);
    formJamKerja.setValue("durasi_kerja", durasiKerja);
  };

  const onSubmit = async (data: TypeJamKerjaCreate) => {
    setIsLoading(true);
    try {
      const res = await insertJamKerja({
        shift_kerja: data.shift_kerja,
        waktu_masuk: waktuMasuk,
        waktu_pulang: waktuPulang,
        durasi_kerja: durasiKerja,
        keterangan: data.keterangan,
      });
      formJamKerja.reset();
      setToast({
        isOpen: true,
        message: "Data Jam Kerja berhasil ditambahkan",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Jam Kerja gagal ditambahkan",
        type: "error",
      });
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formJamKerja}>
        <form onSubmit={formJamKerja.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formJamKerja.control}
              name="shift_kerja"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Kategori
                  </FormLabel>
                  <Select
                    {...field}
                    options={categoryOptions}
                    className="w-full rounded-md"
                    classNamePrefix="react-select"
                    placeholder="Select a category"
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
                    value={
                      categoryOptions.find(
                        (option: Option) =>
                          String(option.value) === String(field.value),
                      ) || null
                    }
                  />
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJamKerja.control}
              name="waktu_masuk"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Waktu Masuk
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="waktu masuk"
                      type="time"
                      {...field}
                      value={waktuMasuk}
                      onChange={(e) => {
                        setWaktuMasuk(e.target.value);
                        formJamKerja.setValue("waktu_masuk", e.target.value);
                        getDurasiKerja({
                          waktuMasuk: e.target.value,
                          waktuPulang: waktuPulang,
                        });
                      }}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJamKerja.control}
              name="waktu_pulang"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Waktu Pulang
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="waktu masuk"
                      type="time"
                      {...field}
                      value={waktuPulang}
                      onChange={(e) => {
                        setWaktuPulang(e.target.value);
                        formJamKerja.setValue("waktu_pulang", e.target.value);
                        getDurasiKerja({
                          waktuPulang: e.target.value,
                          waktuMasuk: waktuMasuk,
                        });
                      }}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJamKerja.control}
              name="durasi_kerja"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Durasi Kerja (jam)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="durasi kerja"
                      type="number"
                      {...field}
                      value={durasiKerja}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJamKerja.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Keterangan
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="waktu masuk" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah Jam Kerja
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
