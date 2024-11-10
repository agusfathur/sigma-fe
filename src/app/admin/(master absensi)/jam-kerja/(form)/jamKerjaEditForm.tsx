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
import { JamKerjaUpdateSchema, TypeJamKerjaUpdate } from "./jamKerjaSchema";

interface JamKerjaUpdateFormProps {
  onSuccess: () => void;
}

export default function JamKerjaUpdateForm({
  onSuccess,
}: JamKerjaUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const jamKerjaData = useJamKerjaStore((state) => state.jamKerjaData);

  const [waktuMasuk, setWaktuMasuk] = useState(jamKerjaData?.waktu_masuk || "");
  const [waktuPulang, setWaktuPulang] = useState(
    jamKerjaData?.waktu_pulang || "",
  );
  const [durasiKerja, setDurasiKerja] = useState(
    jamKerjaData?.durasi_kerja || 0,
  );

  const updateJamKerja = useJamKerjaStore((state) => state.updateJamKerja);

  const formJamKerja = useForm<TypeJamKerjaUpdate>({
    resolver: zodResolver(JamKerjaUpdateSchema),
    defaultValues: {
      id_shift_kerja: jamKerjaData?.id_shift_kerja,
      shift_kerja: jamKerjaData?.shift_kerja || "",
      waktu_masuk: jamKerjaData?.waktu_masuk || "00:00",
      waktu_pulang: jamKerjaData?.waktu_pulang || "00:00",
      durasi_kerja: jamKerjaData?.durasi_kerja || 0,
      keterangan: jamKerjaData?.keterangan || "",
    },
  });

  const categoryOptions: any = [
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

  const onSubmit = async (data: TypeJamKerjaUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateJamKerja(data);
      formJamKerja.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Update Status Pegawai:", error);
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
                        (option: any) =>
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
              Update Jam Kerja
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
