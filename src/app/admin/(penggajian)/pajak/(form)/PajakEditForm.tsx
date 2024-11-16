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
import { usePajakStore } from "@/store/pajak/pajakStore";
import {
  PajakCreateSchema,
  TypePajakCreate,
  TypePajakUpdate,
} from "./PajakSchema";

interface PajakEditFormProps {
  onSuccess: () => void;
}

export default function PajakEditForm({ onSuccess }: PajakEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const updatePajak = usePajakStore((state) => state.updatePajak);
  const pajakData = usePajakStore((state) => state.pajakData);
  const formPajak = useForm<TypePajakUpdate>({
    resolver: zodResolver(PajakCreateSchema),
    defaultValues: {
      id_pajak: (pajakData?.id_pajak as string) || "",
      nama: (pajakData?.nama as string) || "",
      persen: (pajakData?.persen as number) || 0,
    },
  });

  const onSubmit = async (data: TypePajakUpdate) => {
    setIsLoading(true);
    try {
      const res = await updatePajak({
        ...data,
        id_pajak: pajakData?.id_pajak as string,
        persen: Number(data.persen),
      });
      formPajak.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert THR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formPajak}>
        <form onSubmit={formPajak.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* nama */}
            <FormField
              control={formPajak.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="nama pajak" />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formPajak.control}
              name="persen"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">Persen</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="persen pajak"
                      type="number"
                      step="0.01" // Mengizinkan input desimal dengan step 0.1
                      min="0"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      // Pastikan value selalu dalam format yang benar
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Pajak
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
