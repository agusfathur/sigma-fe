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
import { useJenisIzinStore } from "@/store/jenisIzin/jenisIzinStore";
import { JenisIzinCreateSchema, TypeJenisIzinCreate } from "./jenisIzinSchema";

interface JenisIzinCreateFormProps {
  onSuccess: () => void;
}

export default function JenisIzinCreateForm({
  onSuccess,
}: JenisIzinCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertJenisIzin = useJenisIzinStore((state) => state.insertJenisIzin);

  const formJenisIzin = useForm<TypeJenisIzinCreate>({
    resolver: zodResolver(JenisIzinCreateSchema),
    defaultValues: {
      nama: "",
      jenis: "izin",
      jatah: 0,
      tahun: 0,
    },
  });

  const categoryOptions: any = [
    {
      value: "cuti",
      label: "Cuti",
    },
    {
      value: "izin",
      label: "Izin",
    },
  ];

  const onSubmit = async (data: TypeJenisIzinCreate) => {
    setIsLoading(true);
    try {
      const res = await insertJenisIzin(data);
      formJenisIzin.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formJenisIzin}>
        <form onSubmit={formJenisIzin.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formJenisIzin.control}
              name="jenis"
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
              control={formJenisIzin.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Jenis Izin
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama Jenis Izin" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formJenisIzin.control}
              name="jatah"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Jatah (0 jika izin)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jatah (0 jika izin)"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          formJenisIzin.setValue("jatah", value);
                        }
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
              control={formJenisIzin.control}
              name="tahun"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Tahun</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tahun"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          formJenisIzin.setValue("tahun", value);
                        }
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
              Tambah Jenis Izin
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
