/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PembayaranGajiUpdateSchema,
  TypePembayaranGajiUpdate,
} from "./PembayaranGajiSchema";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { usePembayaranGajiStore } from "@/store/pembayaranGaji/pembayaranGajiStore";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

interface PembayaranGajiCreateFormProps {
  onSuccess: () => void;
}

export default function PembayaranGajiCreateForm({
  onSuccess,
}: PembayaranGajiCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session }: { data: any } = useSession();

  const slipGajiData = useSlipGajiStore((state) => state.SlipGajiData);
  const pembayaranGaji = usePembayaranGajiStore(
    (state) => state.pembayaranGaji,
  );
  const fetchPembayaranGajiBySlipGaji = usePembayaranGajiStore(
    (state) => state.fetchPembayaranGajiBySlipGaji,
  );
  const createPembayaranGaji = usePembayaranGajiStore(
    (state) => state.createPembayaranGaji,
  );

  const updatePembayaranGaji = usePembayaranGajiStore(
    (state) => state.updatePembayaranGaji,
  );

  const metodePembayaranOptions = [
    {
      value: "transfer",
      label: "transfer",
    },
    {
      value: "cash",
      label: "cash",
    },
  ];

  const formPembayaranGaji = useForm<TypePembayaranGajiUpdate>({
    resolver: zodResolver(PembayaranGajiUpdateSchema),
    defaultValues: {
      id_pembayaran_gaji: (pembayaranGaji?.id_pembayaran_gaji as string) || "",
      slip_gaji_id: (pembayaranGaji?.slip_gaji_id as string) || "",
      user_id: (pembayaranGaji?.user_id as string) || "",
      metode_pembayaran: (pembayaranGaji?.metode_pembayaran as string) || "",
      tanggal_pembayaran:
        (pembayaranGaji?.tanggal_pembayaran?.split("T")[0] as string) || "",
      nomor_transaksi: (pembayaranGaji?.nomor_transaksi as string) || "",
    },
  });

  const onSubmit = async (data: TypePembayaranGajiUpdate) => {
    setIsLoading(true);
    try {
      if (pembayaranGaji?.id_pembayaran_gaji) {
        await updatePembayaranGaji({
          ...data,
          tanggal_pembayaran: (data.tanggal_pembayaran +
            "T00:00:00.000Z") as string,
          user_id: session?.user?.id,
          slip_gaji_id: slipGajiData?.id_slip_gaji as string,
        });
      } else {
        await createPembayaranGaji({
          ...data,
          tanggal_pembayaran: data.tanggal_pembayaran + "T00:00:00.000Z",
          user_id: session?.user?.id,
          slip_gaji_id: slipGajiData?.id_slip_gaji as string,
        });
      }
      formPembayaranGaji.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Tunjangan Bonus:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPembayaranGajiBySlipGaji(slipGajiData?.id_slip_gaji as string);
  }, [fetchPembayaranGajiBySlipGaji, slipGajiData?.id_slip_gaji]);

  return (
    <>
      <FormProvider {...formPembayaranGaji}>
        <form onSubmit={formPembayaranGaji.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formPembayaranGaji.control}
              name="tanggal_pembayaran"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tunjangan Kehadiran
                  </FormLabel>
                  <Input {...field} type="date" />
                  <FormControl></FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* metode pembayaran*/}
            <FormField
              control={formPembayaranGaji.control}
              name="metode_pembayaran"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Metode Pembayaran
                  </FormLabel>
                  <Select
                    {...field}
                    options={metodePembayaranOptions}
                    className="w-full rounded-md dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="Tunjangan Kehadiran"
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              {pembayaranGaji?.id_pembayaran_gaji ? "Update" : "Create"}{" "}
              Pembayaran Gaji
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
