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
import { useTunjanganKehadiranStore } from "@/store/tunjanganKehadiran/tunjanganKehadiranStore";
import {
  TunjanganKehadiranCreateSchema,
  TypeTunjanganKehadiranCreate,
} from "./TunjanganKehadiranSchema";
import { useToastStore } from "@/store/toastStore";

interface TunjanganKehadiranCreateFormProps {
  onSuccess: () => void;
}

interface OptionNumber {
  value: number;
  label: string;
}

export default function TunjanganKehadiranCreateForm({
  onSuccess,
}: TunjanganKehadiranCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const insertTunjanganKehadiran = useTunjanganKehadiranStore(
    (state) => state.insertTunjanganKehadiran,
  );

  const [tahunOptions, setTahunOptions] = useState<OptionNumber[]>([]);

  const getTahunOption = () => {
    const tahun = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const options = [];
    for (let i = tahun; i >= 2024; i--) {
      options.push({ value: i, label: i.toString() });
    }

    setTahunOptions(options);
  };

  const formTunjanganKehadiran = useForm<TypeTunjanganKehadiranCreate>({
    resolver: zodResolver(TunjanganKehadiranCreateSchema),
    defaultValues: {
      nominal: 0,
      tahun: 0,
    },
  });

  const onSubmit = async (data: TypeTunjanganKehadiranCreate) => {
    setIsLoading(true);
    try {
      const res = await insertTunjanganKehadiran(data);
      formTunjanganKehadiran.reset();
      setToast({
        isOpen: true,
        message: "Data tunjangan kehadiran berhasil ditambahkan",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data tunjangan kehadiran gagal ditambahkan",
        type: "error",
      });
      console.error("Error Insert Tunjangan kehadiran:", error);
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
                        (option: OptionNumber) =>
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
              Tambah Tunjangan Kehadiran
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
