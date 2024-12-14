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
import { useToastStore } from "@/store/toastStore";
import { TypeUbahPassword, UbahPasswordSchema } from "./UbahPasswordSchema";
import { useSession } from "next-auth/react";
import axiosJWT from "@/lib/authJWT";
import { PasswordInput } from "@/components/custom/password-input";
import ModalToast from "@/components/custom/modal-toast";

export default function UbahPasswordForm() {
  const {
    isOpen: toastOpen,
    message,
    type: toastType,
    setToast,
  } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const formUbahPassword = useForm<TypeUbahPassword>({
    resolver: zodResolver(UbahPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: TypeUbahPassword) => {
    setIsLoading(true);
    try {
      const res = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/change-password/${session?.user.id}`,
        {
          password: data.password,
        },
      );
      formUbahPassword.reset();
      setToast({
        isOpen: true,
        message: "Password Berhasil Diubah",
        type: "success",
      });
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Password Gagal Diubah",
        type: "error",
      });
      console.error("Error Ubah Password:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ModalToast
        isOpen={toastOpen}
        message={message}
        type={toastType}
        onClose={() =>
          setToast({ isOpen: false, message: "", type: toastType })
        }
      />
      <FormProvider {...formUbahPassword}>
        <form onSubmit={formUbahPassword.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* password */}
            <FormField
              control={formUbahPassword.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm lg:text-base">
                      Password Baru
                    </FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="password baru" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={formUbahPassword.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm lg:text-base">
                      Konfirmasi Password Baru
                    </FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="konfirmasi password baru"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" loading={isLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
