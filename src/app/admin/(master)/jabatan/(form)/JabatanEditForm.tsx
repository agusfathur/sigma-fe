/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { JabatanUpdateSchema, TypeJabatanUpdate } from "./JabatanSchema";
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
import { useJabatanStore } from "@/store/jabatan/jabatanStore";

interface JabatanEditFormProps {
  onSuccess: () => void;
}

export default function JabatanEditForm({ onSuccess }: JabatanEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const jabatanData = useJabatanStore((state) => state.jabatanData);
  const updateJabatan = useJabatanStore((state) => state.updateJabatan);

  const formJabatan = useForm<TypeJabatanUpdate>({
    resolver: zodResolver(JabatanUpdateSchema),
    defaultValues: {
      id_jabatan: jabatanData?.id_jabatan || "",
      nama: jabatanData?.nama || "",
      gaji: jabatanData?.gaji || 0,
    },
  });

  const onSubmit = async (data: TypeJabatanUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateJabatan(data);
      formJabatan.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formJabatan}>
        <form onSubmit={formJabatan.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formJabatan.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Jabatan
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama jabatan" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={formJabatan.control}
              name="gaji"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Gaji Pokok Jabatan
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gaji pokok"
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Jabatan
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
