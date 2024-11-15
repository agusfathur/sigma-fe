/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
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
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { useTHRStore } from "@/store/THR/THRStore";
import { THRCreateSchema, TypeTHRCreate } from "./THRSchema";
import { number } from "zod";

interface THRCreateFormProps {
  onSuccess: () => void;
}

export default function THRCreateForm({ onSuccess }: THRCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertTHR = useTHRStore((state) => state.insertTHR);

  const pegawais = usePegawaiStore((state) => state.pegawai);
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);

  const pegawaiOptions = pegawais.map((pegawai) => ({
    value: pegawai.id_pegawai,
    label: pegawai.nama,
  }));

  const metodePembayaranOptions = [
    {
      value: "cash",
      label: "Cash",
    },
    {
      value: "transfer",
      label: "Transfer",
    },
  ];

  const [tahunOptions, setTahunOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const getTahunOption = () => {
    const tahun = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const options = [];
    for (let i = tahun; i >= 2024; i--) {
      options.push({ value: i, label: i.toString() });
    }

    setTahunOptions(options);
  };
  const formTHR = useForm<TypeTHRCreate>({
    resolver: zodResolver(THRCreateSchema),
    defaultValues: {
      pegawai_id: "",
      nominal: 0,
      metode_pembayaran: "",
      tahun: 0,
      tanggal_pembayaran: "",
    },
  });

  const onSubmit = async (data: TypeTHRCreate) => {
    setIsLoading(true);
    try {
      const res = await insertTHR({
        ...data,
        tanggal_pembayaran: data.tanggal_pembayaran + "T00:00:00.000Z",
      });
      formTHR.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert THR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTahunOption();
    fetchPegawai();
  }, [fetchPegawai]);

  return (
    <>
      <FormProvider {...formTHR}>
        <form onSubmit={formTHR.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* tahum */}
            <FormField
              control={formTHR.control}
              name="tahun"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Tahun</FormLabel>
                  <Select
                    {...field}
                    options={tahunOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select tahun"
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
                        selectedOption ? Number(selectedOption.value) : "",
                      )
                    }
                    value={
                      tahunOptions.find(
                        (option: any) =>
                          Number(option.value) === Number(field.value),
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

            {/* pegawai */}

            <FormField
              control={formTHR.control}
              name="pegawai_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Pegawai
                  </FormLabel>
                  <Select
                    {...field}
                    options={pegawaiOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select pegawai"
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
                      pegawaiOptions.find(
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

            {/* nominal */}
            <FormField
              control={formTHR.control}
              name="nominal"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nominal
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="nominal THR"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* metode pembayaran */}
            <FormField
              control={formTHR.control}
              name="metode_pembayaran"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Tahun</FormLabel>
                  <Select
                    {...field}
                    options={metodePembayaranOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select metode pembayaran"
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
                      metodePembayaranOptions.find(
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

            {/* tanggal */}
            <FormField
              control={formTHR.control}
              name="tanggal_pembayaran"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tanggal Pembayaran
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah THR
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
