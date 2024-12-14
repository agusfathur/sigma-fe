/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
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
import { useDataLiburStore } from "@/store/dataLibur/dataLiburStore";
import { DataLiburUpdateSchema, TypeDataLiburUpdate } from "./DataLiburSchema";
import { useKategoriLiburStore } from "@/store/kategoriLibur/kategoriLiburStore";
import { useToastStore } from "@/store/toastStore";

interface DataLiburUpdateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function DataLiburUpdateForm({
  onSuccess,
}: DataLiburUpdateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const dataLiburData = useDataLiburStore((state) => state.dataLiburData);

  const updateDataLibur = useDataLiburStore((state) => state.updateDataLibur);

  const fetchKategoriLibur = useKategoriLiburStore(
    (state) => state.fetchKategoriLibur,
  );
  const kategoriLibur = useKategoriLiburStore((state) => state.kategoriLibur);

  const [tanggal, setTanggal] = useState(
    dataLiburData?.tanggal.split("T")[0] || "",
  );
  const kategoriLiburOptions: Option[] = kategoriLibur.map((kategoriLibur) => ({
    value: kategoriLibur.id_kategori_libur,
    label: kategoriLibur.jenis,
  }));

  const statusAbsenOptions: Option[] = [
    { value: "hadir", label: "Hadir" },
    { value: "tidak_hadir", label: "Tidak Hadir" },
  ];

  const formDataLibur = useForm<TypeDataLiburUpdate>({
    resolver: zodResolver(DataLiburUpdateSchema),
    defaultValues: {
      id_libur: dataLiburData?.id_libur || "",
      kategori_libur_id: dataLiburData?.kategori_libur_id || "",
      nama: dataLiburData?.nama || "",
      tanggal: dataLiburData?.tanggal.split("T")[0] || "",
      status_absen: dataLiburData?.status_absen || "",
    },
  });

  const onSubmit = async (data: TypeDataLiburUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateDataLibur({
        id_libur: data.id_libur,
        kategori_libur_id: data.kategori_libur_id,
        nama: data.nama,
        tanggal: tanggal + "T00:00:00.000Z",
        status_absen: data.status_absen,
      });
      formDataLibur.reset();
      onSuccess();
      setToast({
        isOpen: true,
        message: "Data Libur Berhasil Diupdate",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Libur Gagal Diupdate",
        type: "error",
      });
      console.error("Error Update Data Libur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKategoriLibur();
  }, [fetchKategoriLibur]);

  return (
    <>
      <FormProvider {...formDataLibur}>
        <form onSubmit={formDataLibur.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formDataLibur.control}
              name="kategori_libur_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Kategori Libur
                  </FormLabel>
                  <Select
                    {...field}
                    options={kategoriLiburOptions}
                    className="w-full rounded-md dark:text-black"
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
                      kategoriLiburOptions.find(
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
              control={formDataLibur.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Hari Libur
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama hari libur" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formDataLibur.control}
              name="status_absen"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Status Kehadiran
                  </FormLabel>
                  <Select
                    {...field}
                    options={statusAbsenOptions}
                    className="w-full rounded-md dark:text-black"
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
                      statusAbsenOptions.find(
                        (option: any) =>
                          String(option.value) === String(field.value),
                      ) || null
                    }
                  />
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formDataLibur.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tanggal
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="durasi kerja"
                      type="date"
                      {...field}
                      value={tanggal}
                      onChange={(e) => {
                        setTanggal(e.target.value);
                        formDataLibur.setValue("tanggal", e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Hari Libur
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
