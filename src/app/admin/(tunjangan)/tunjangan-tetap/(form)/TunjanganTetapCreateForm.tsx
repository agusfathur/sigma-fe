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
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";
import {
  TunjanganTetapCreateSchema,
  TypeTunjanganTetapCreate,
} from "./TunjanganTetapSchema";
import { useToastStore } from "@/store/toastStore";

interface TunjanganTetapCreateFormProps {
  onSuccess: () => void;
}

export default function TunjanganTetapCreateForm({
  onSuccess,
}: TunjanganTetapCreateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const insertTunjanganTetap = useTunjanganTetapStore(
    (state) => state.insertTunjanganTetap,
  );

  const formTunjanganTetap = useForm<TypeTunjanganTetapCreate>({
    resolver: zodResolver(TunjanganTetapCreateSchema),
    defaultValues: {
      nama: "",
      nominal: 0,
    },
  });

  const onSubmit = async (data: TypeTunjanganTetapCreate) => {
    setIsLoading(true);
    try {
      const res = await insertTunjanganTetap(data);
      formTunjanganTetap.reset();
      setToast({
        isOpen: true,
        message: "Data Berhasil Ditambahkan",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Gagal Ditambahkan",
        type: "error",
      });
      console.error("Error Insert Tunjangan Tetap:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <FormProvider {...formTunjanganTetap}>
        <form onSubmit={formTunjanganTetap.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* nama */}
            <FormField
              control={formTunjanganTetap.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="nama" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            {/* nominal */}
            <FormField
              control={formTunjanganTetap.control}
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

            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah Tunjangan Tetap
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
