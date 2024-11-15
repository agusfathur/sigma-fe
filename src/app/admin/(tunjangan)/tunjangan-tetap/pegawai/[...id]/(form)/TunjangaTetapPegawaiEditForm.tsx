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
import { useTunjanganTetapPegawaiStore } from "@/store/tunjanganTetap/tunjanganTetapPegawaiStore";
import {
  TunjangaTetapPegawaiUpdateSchema,
  TypeTunjangaTetapPegawaiUpdate,
} from "./TunjangaTetapPegawaiSchema";
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";

interface TunjangaTetapPegawaiEditFormProps {
  onSuccess: () => void;
}

export default function TunjangaTetapPegawaiEditForm({
  onSuccess,
}: TunjangaTetapPegawaiEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tunjanganTetapOptions, setTunjanganTetapOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const updateTunjangaTetapPegawai = useTunjanganTetapPegawaiStore(
    (state) => state.updateTunjanganTetapPegawai,
  );
  const tunjanganTetapPegawaiData = useTunjanganTetapPegawaiStore(
    (state) => state.tunjanganTetapPegawaiData,
  );

  const tunjanganTetap = useTunjanganTetapStore(
    (state) => state.tunjanganTetap,
  );

  const fetchTunjanganTetap = useTunjanganTetapStore(
    (state) => state.fetchTunjanganTetap,
  );

  const getTunjanganTetapOptions = () => {
    const options = tunjanganTetap.map((tunjanganTetap) => ({
      value: tunjanganTetap.id_tunjangan_tetap,
      label: `${tunjanganTetap.nama} - Rp. ${new Intl.NumberFormat(
        "id-ID",
      ).format(tunjanganTetap.nominal)}`,
    }));
    setTunjanganTetapOptions(options as any);
  };

  const formTunjangaTetapPegawai = useForm<TypeTunjangaTetapPegawaiUpdate>({
    resolver: zodResolver(TunjangaTetapPegawaiUpdateSchema),
    defaultValues: {
      id_tunjangan_tetap_pegawai:
        (tunjanganTetapPegawaiData?.id_tunjangan_tetap_pegawai as string) || "",
      pegawai_id: (tunjanganTetapPegawaiData?.pegawai_id as string) || "",
      tunjangan_tetap_id:
        (tunjanganTetapPegawaiData?.tunjangan_tetap_id as string) || "",
      jumlah: tunjanganTetapPegawaiData?.jumlah || 0,
    },
  });

  const onSubmit = async (data: TypeTunjangaTetapPegawaiUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateTunjangaTetapPegawai(data);
      formTunjangaTetapPegawai.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert THR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTunjanganTetap();
    getTunjanganTetapOptions();
  }, [fetchTunjanganTetap]);

  return (
    <>
      <FormProvider {...formTunjangaTetapPegawai}>
        <form onSubmit={formTunjangaTetapPegawai.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* tunjangan tetap */}
            <FormField
              control={formTunjangaTetapPegawai.control}
              name="tunjangan_tetap_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Tahun</FormLabel>
                  <Select
                    {...field}
                    isDisabled
                    options={tunjanganTetapOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Select tunjangan tetap"
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
                      tunjanganTetapOptions.find(
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
              control={formTunjangaTetapPegawai.control}
              name="jumlah"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nominal
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="jumlah "
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
              Update Tunjangan Tetap Pegawai
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
