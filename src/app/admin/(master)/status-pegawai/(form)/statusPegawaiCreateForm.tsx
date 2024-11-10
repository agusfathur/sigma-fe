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
import { useStatusKepegawaianStore } from "@/store/statusKepegawaian/statusKepegawaianStore";
import {
  StatusPegawaiCreateSchema,
  TypeStatusPegawaiCreate,
} from "./statusPegawaiSchema";

interface StatusPegawaiCreateFormProps {
  onSuccess: () => void;
}

export default function StatusPegawaiCreateForm({
  onSuccess,
}: StatusPegawaiCreateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const insertStatusKepegawaian = useStatusKepegawaianStore(
    (state) => state.insertStatusKepegawaian,
  );

  const formStatusPegawai = useForm<TypeStatusPegawaiCreate>({
    resolver: zodResolver(StatusPegawaiCreateSchema),
    defaultValues: {
      nama: "",
    },
  });

  const onSubmit = async (data: TypeStatusPegawaiCreate) => {
    setIsLoading(true);
    try {
      const res = await insertStatusKepegawaian(data);
      formStatusPegawai.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...formStatusPegawai}>
        <form onSubmit={formStatusPegawai.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formStatusPegawai.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Nama Status Pegawai
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="nama status pegawai" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Tambah Status Pegawai
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
