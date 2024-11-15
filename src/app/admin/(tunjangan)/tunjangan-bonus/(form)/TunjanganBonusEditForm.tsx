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
  TunjanganBonusUpdateSchema,
  TypeTunjanganBonusUpdate,
} from "./TunjanganBonusSchema";
import { usePegawaiStore } from "@/store/pegawai/pegawaiStore";
import { useTunjanganBonusStore } from "@/store/tunjanganBonus/tunjanganBonusStore";

interface THREditFormProps {
  onSuccess: () => void;
}

export default function THREditForm({ onSuccess }: THREditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const tunjanganBonusData = useTunjanganBonusStore(
    (state) => state.tunjanganBonusData,
  );
  const updateTunjanganBonus = useTunjanganBonusStore(
    (state) => state.updateTunjanganBonus,
  );

  const pegawais = usePegawaiStore((state) => state.pegawai);
  const fetchPegawai = usePegawaiStore((state) => state.fetchPegawai);

  const pegawaiOptions = pegawais.map((pegawai) => ({
    value: pegawai.id_pegawai,
    label: pegawai.nama,
  }));

  const formTunjanganBonus = useForm<TypeTunjanganBonusUpdate>({
    resolver: zodResolver(TunjanganBonusUpdateSchema),
    defaultValues: {
      id_tunjangan_bonus: tunjanganBonusData?.id_tunjangan_bonus || "",
      pegawai_id: tunjanganBonusData?.pegawai_id || "",
      nominal: tunjanganBonusData?.nominal || 0,
      tanggal: tunjanganBonusData?.tanggal.split("T")[0] || "",
      keterangan: tunjanganBonusData?.keterangan || "",
    },
  });

  const onSubmit = async (data: TypeTunjanganBonusUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateTunjanganBonus({
        ...data,
        id_tunjangan_bonus: tunjanganBonusData?.id_tunjangan_bonus as string,
        tanggal: data.tanggal + "T00:00:00.000Z",
      });
      formTunjanganBonus.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPegawai();
  }, [fetchPegawai]);

  return (
    <>
      <FormProvider {...formTunjanganBonus}>
        <form onSubmit={formTunjanganBonus.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* pegawai */}

            <FormField
              control={formTunjanganBonus.control}
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
              control={formTunjanganBonus.control}
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

            {/* tanggal */}
            <FormField
              control={formTunjanganBonus.control}
              name="tanggal"
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

            {/* keterangan */}
            <FormField
              control={formTunjanganBonus.control}
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Tunjangan Bonus
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
