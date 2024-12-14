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
import { useKategoriLiburStore } from "@/store/kategoriLibur/kategoriLiburStore";
import {
  KategoriLiburUpdateSchema,
  TypeKategoriLiburUpdate,
} from "./kategoriLiburSchema";
import { useToastStore } from "@/store/toastStore";

interface KategoriLiburUpdateFormProps {
  onSuccess: () => void;
}

export default function KategoriLiburUpdateForm({
  onSuccess,
}: KategoriLiburUpdateFormProps) {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const kategoriLiburData = useKategoriLiburStore(
    (state) => state.kategoriLiburData,
  );

  const updateKategoriLibur = useKategoriLiburStore(
    (state) => state.updateKategoriLibur,
  );

  const formKategoriLibur = useForm<TypeKategoriLiburUpdate>({
    resolver: zodResolver(KategoriLiburUpdateSchema),
    defaultValues: {
      id_kategori_libur: kategoriLiburData?.id_kategori_libur || "",
      jenis: kategoriLiburData?.jenis || "",
    },
  });

  const onSubmit = async (data: TypeKategoriLiburUpdate) => {
    setIsLoading(true);
    try {
      const res = await updateKategoriLibur(data);
      formKategoriLibur.reset();
      setToast({
        isOpen: true,
        message: "Data Kategori Libur berhasil diubah",
        type: "success",
      });
      onSuccess();
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Data Kategori Libur gagal diubah",
        type: "error",
      });
      console.error("Error Update Kategori Libur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formKategoriLibur}>
        <form onSubmit={formKategoriLibur.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formKategoriLibur.control}
              name="jenis"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Kategori Libur
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama kategori libur" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Kategori Libur
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
