/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  TunjangaTetapPegawaiCreateSchema,
  TypeTunjangaTetapPegawaiCreate,
} from "./TunjangaTetapPegawaiSchema";
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";
import { useToastStore } from "@/store/toastStore";

interface TunjangaTetapPegawaiCreateFormProps {
  onSuccess: () => void;
  pegawaiId: string;
}

interface Option {
  value: string;
  label: string;
}

export default function TunjangaTetapPegawaiCreateForm({
  onSuccess,
  pegawaiId,
}: TunjangaTetapPegawaiCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [tunjanganTetapOptions, setTunjanganTetapOptions] = useState<Option[]>(
    [],
  );

  const insertTunjangaTetapPegawai = useTunjanganTetapPegawaiStore(
    (state) => state.insertTunjanganTetapPegawai,
  );

  const tunjanganTetap = useTunjanganTetapStore(
    (state) => state.tunjanganTetap,
  );

  const fetchTunjanganTetap = useTunjanganTetapStore(
    (state) => state.fetchTunjanganTetap,
  );

  const tunjanganTetapPegawai = useTunjanganTetapPegawaiStore(
    (state) => state.tunjanganTetapPegawai,
  );
  const fetchTunjanganTetapPegawaiById = useTunjanganTetapPegawaiStore(
    (state) => state.fetchTunjanganTetapPegawaiById,
  );

  const getTunjanganTetapOptions = useCallback(() => {
    const availableTunjanganTetap = tunjanganTetap.filter(
      (tt) =>
        !tunjanganTetapPegawai.some(
          (ttp) => ttp.tunjangan_tetap_id === tt.id_tunjangan_tetap,
        ),
    );

    const options: Option[] = availableTunjanganTetap.map((tunjanganTetap) => ({
      value: tunjanganTetap.id_tunjangan_tetap,
      label: `${tunjanganTetap.nama} - Rp. ${new Intl.NumberFormat(
        "id-ID",
      ).format(tunjanganTetap.nominal)}`,
    }));

    setTunjanganTetapOptions(options);
  }, [tunjanganTetap, tunjanganTetapPegawai]); // Pastikan dependensi benar

  const formTunjangaTetapPegawai = useForm<TypeTunjangaTetapPegawaiCreate>({
    resolver: zodResolver(TunjangaTetapPegawaiCreateSchema),
    defaultValues: {
      tunjangan_tetap_id: "",
      jumlah: 0,
    },
  });

  const onSubmit = async (data: TypeTunjangaTetapPegawaiCreate) => {
    setIsLoading(true);
    try {
      const res = await insertTunjangaTetapPegawai({
        ...data,
        pegawai_id: pegawaiId,
      });
      formTunjangaTetapPegawai.reset();

      setToast({
        isOpen: true,
        message: "Data Tunjangan Tetap Pegawai Berhasil Ditambahkan",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Tunjangan Tetap Pegawai Gagal Ditambahkan",
        type: "error",
      });
      console.error("Error Insert THR:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTunjanganTetap();
    fetchTunjanganTetapPegawaiById(pegawaiId);
    getTunjanganTetapOptions();
  }, [
    fetchTunjanganTetap,
    fetchTunjanganTetapPegawaiById,
    getTunjanganTetapOptions,
    pegawaiId,
  ]);

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
              Create Tunjangan Tetap Pegawai
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
