"use client";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { loginFormSchema } from "./login.schema";
import { signIn } from "next-auth/react";
type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const callbackUrl = "/admin/dashboard";
  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setIsLoading(false);
        setError("Username atau Password Salah");
      }
      if (!res?.error) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div
      className={cn("my-6 grid w-[80%] gap-6 md:w-[70%]", className)}
      {...props}
    >
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-xl font-bold tracking-tight md:text-2xl">
          Log In Pengguna
        </h1>
        <p className="text-xs text-muted-foreground md:text-sm">
          Silahkan menggunakan username dan password untuk Login
        </p>
      </div>
      <Form {...form}>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 md:gap-4">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1 md:space-y-2">
                  <FormLabel className="text-sm lg:text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="border border-slate-700"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1 md:space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm lg:text-base">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className="border border-slate-700"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              className="mt-4 w-full rounded-3xl bg-black font-semibold text-white sm:w-auto"
              type="submit"
              variant={"default"}
              loading={isLoading}
            >
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
