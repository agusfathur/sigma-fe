/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
import { useLokasiStore } from "@/store/lokasi/lokasiStore";
import {
  LokasiCreateSchema,
  LokasiUpdateSchema,
  TypeLokasiCreate,
  TypeLokasiUpdate,
} from "./LokasiSchema";

export default function LokasiDetail() {
  const lokasiData = useLokasiStore((state) => state.lokasiData);

  const formLokasi = useForm<TypeLokasiUpdate>({
    resolver: zodResolver(LokasiUpdateSchema),
    defaultValues: {
      nama: lokasiData?.nama || "",
      kode: lokasiData?.kode || "",
      alamat: lokasiData?.alamat || "",
      luas_lokasi: lokasiData?.luas_lokasi || 0,
      koordinat: {
        latitude: Number(lokasiData?.koordinat.split(",")[0]) || 0,
        longitude: Number(lokasiData?.koordinat.split(",")[1]) || 0,
      },
    },
  });

  return (
    <>
      <FormProvider {...formLokasi}>
        <form>
          <div className="grid gap-2">
            <FormLabel className="text-sm lg:text-base">
              Koordinat Lokasi
            </FormLabel>

            {formLokasi.getValues("koordinat.latitude") !== 0 &&
            formLokasi.getValues("koordinat.longitude") !== 0 ? (
              <div className="flex justify-center">
                <iframe
                  id="googleMap"
                  src={`https://maps.google.com/maps?q=${formLokasi.getValues("koordinat.latitude")},${formLokasi.getValues("koordinat.longitude")}&z=15&output=embed&layer=t`}
                  className="h-72 w-[400px] rounded-md md:w-[600px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <p>Maps Loading...</p>
            )}
            <div className="flex w-full justify-between space-x-1">
              <div className="w-1/2">
                <FormField
                  control={formLokasi.control}
                  name="koordinat.latitude"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Latitude
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="latitude" readOnly />
                      </FormControl>

                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={formLokasi.control}
                  name="koordinat.longitude"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm lg:text-base">
                        Longitude
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="longitude" readOnly />
                      </FormControl>
                      <div className="h-2">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={formLokasi.control}
                name="kode"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Kode Lokasi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="kode Lokasi" {...field} readOnly />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formLokasi.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Nama Lokasi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="nama Lokasi" {...field} readOnly />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formLokasi.control}
                name="luas_lokasi"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Luas Lokasi (Meter)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="gaji pokok" {...field} readOnly />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formLokasi.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm lg:text-base">
                      Alamat
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="alamat" {...field} readOnly />
                    </FormControl>
                    <div className="h-2">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
