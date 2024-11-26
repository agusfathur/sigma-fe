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
import {
  PinjamanCreateSchema,
  PinjamanUpdateSchema,
  TypePinjamanCreate,
  TypePinjamanUpdate,
} from "./PinjamanSchema";

interface PinjamanEditFormProps {
  onSuccess: () => void;
}

interface Option {
  value: string;
  label: string;
}

export default function PinjamanEditForm({ onSuccess }: PinjamanEditFormProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const updatePinjaman = usePinjamanStore((state) => state.updatePinjaman);
  const pinjamanData = usePinjamanStore((state) => state.pinjamanData);

  const formPinjaman = useForm<TypePinjamanUpdate>({
    resolver: zodResolver(PinjamanUpdateSchema),
    defaultValues: {
      nominal: (pinjamanData?.nominal as number) || 0,
      tanggal: (pinjamanData?.tanggal.split("T")[0] as string) || "",
      keterangan: (pinjamanData?.keterangan as string) || "",
    },
  });

  const onSubmit = async (data: TypePinjamanUpdate) => {
    setIsLoading(true);
    try {
      const tahun = new Date(data.tanggal).getFullYear();
      const res = await updatePinjaman({
        ...data,
        id_pinjaman: pinjamanData?.id_pinjaman as string,
        pegawai_id: pinjamanData?.pegawai_id as string,
        tahun: tahun as number,
        tanggal: (data.tanggal + "T00:00:00.000Z") as string,
        status_pinjaman: "pending",
      });
      formPinjaman.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Tunjangan Bonus:", error);
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
              Update Pinjaman
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
