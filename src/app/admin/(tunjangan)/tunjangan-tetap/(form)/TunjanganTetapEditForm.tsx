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
  TunjanganTetapUpdateSchema,
  TypeTunjanganTetapUpdate,
} from "./TunjanganTetapSchema";

interface TunjanganTetapEditFormProps {
  onSuccess: () => void;
}

export default function TunjanganTetapEditForm({
  onSuccess,
}: TunjanganTetapEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const updateTunjanganTetap = useTunjanganTetapStore(
    (state) => state.updatetunjanganTetap,
  );

  const tunjanganTetapData = useTunjanganTetapStore(
    (state) => state.tunjanganTetapData,
  );

  const formTunjanganTetap = useForm<TypeTunjanganTetapUpdate>({
    resolver: zodResolver(TunjanganTetapUpdateSchema),
    defaultValues: {
      id_tunjangan_tetap: tunjanganTetapData?.id_tunjangan_tetap || "",
      nominal: tunjanganTetapData?.nominal || 0,
      nama: tunjanganTetapData?.nama || "",
    },
  });

  const onSubmit = async (data: TypeTunjanganTetapUpdate) => {
    setIsLoading(true);
    try {
      const res = updateTunjanganTetap(data);
      formTunjanganTetap.reset();
      onSuccess();
    } catch (error) {
      console.error("Error Insert Jabatan:", error);
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
                    <Input {...field} placeholder="nama " />
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
              Update Tunjangan Tetap
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
