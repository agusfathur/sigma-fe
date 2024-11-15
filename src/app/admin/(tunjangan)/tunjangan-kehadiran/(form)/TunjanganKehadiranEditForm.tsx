/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FormProvider, useForm } from "react-hook-form";
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
import {
  TunjanganKehadiranUpdateSchema,
  TypeTunjanganKehadiranUpdate,
} from "./TunjanganKehadiranSchema";
import { useTunjanganKehadiranStore } from "@/store/tunjanganKehadiran/tunjanganKehadiranStore";

interface TunjanganKehadiranEditFormProps {
  onSuccess: () => void;
}

export default function TunjanganKehadiranEditForm({
  onSuccess,
}: TunjanganKehadiranEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const updateTunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.updateTunjanganKehadiran,
  );

  const tunjanganKehadiranData = useTunjanganKehadiranStore(
    (state) => state.tunjanganKehadiranData,
  );

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

  const formTunjanganKehadiran = useForm<TypeTunjanganKehadiranUpdate>({
    resolver: zodResolver(TunjanganKehadiranUpdateSchema),
    defaultValues: {
      id_tunjangan_kehadiran:
        (tunjanganKehadiranData?.id_tunjangan_kehadiran as string) || "",
      nominal: tunjanganKehadiranData?.nominal || 0,
      tahun: tunjanganKehadiranData?.tahun || 0,
    },
  });

  const onSubmit = async (data: TypeTunjanganKehadiranUpdate) => {
    setIsLoading(true);
    try {
      const res = updateTunjanganKehadiran(data);
      formTunjanganKehadiran.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTahunOption();
  }, []);

  return (
    <>
      <FormProvider {...formTunjanganKehadiran}>
        <form onSubmit={formTunjanganKehadiran.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* tahum */}
            <FormField
              control={formTunjanganKehadiran.control}
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

            {/* nominal */}
            <FormField
              control={formTunjanganKehadiran.control}
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Tunjangan Kehadiran
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
