/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
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
import { useSession } from "next-auth/react";
import { usePinjamanStore } from "@/store/pinjaman/pinjamanStore";
import { PinjamanCreateSchema, TypePinjamanCreate } from "./PinjamanSchema";
import { useToastStore } from "@/store/toastStore";

interface PinjamanCreateFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function PinjamanCreateForm({
  onSuccess,
}: PinjamanCreateFormProps) {
  const { data: session } = useSession();
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const insertPinjaman = usePinjamanStore((state) => state.insertPinjaman);

  const formPinjaman = useForm<TypePinjamanCreate>({
    resolver: zodResolver(PinjamanCreateSchema),
    defaultValues: {
      nominal: 0,
      tanggal: "",
      keterangan: "",
    },
  });

  const onSubmit = async (data: TypePinjamanCreate) => {
    setIsLoading(true);
    try {
      const tahun = new Date(data.tanggal).getFullYear();

      const res = await insertPinjaman(session?.user?.id as string, {
        nominal: data.nominal as number,
        tahun: tahun as number,
        tanggal: (data.tanggal + "T00:00:00.000Z") as string,
        keterangan: data.keterangan as string,
      });
      formPinjaman.reset();
      onSuccess();
      setToast({
        isOpen: true,
        message: "Berhasil Menambah Pinjaman",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Gagal Menambah Pinjaman",
        type: "error",
      });
      console.error("Error Insert Pinjama:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formPinjaman}>
        <form onSubmit={formPinjaman.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* tanggal */}
            <FormField
              control={formPinjaman.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Tanggal
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

            {/* nominal */}
            <FormField
              control={formPinjaman.control}
              name="nominal"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nominal
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="nominal"
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

            {/* keterangan */}
            <FormField
              control={formPinjaman.control}
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
              Buat Pinjaman
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
