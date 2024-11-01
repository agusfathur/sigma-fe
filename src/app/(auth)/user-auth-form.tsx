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
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setIsLoading(false);
        setError("Error logging in");
      }
      if (!res?.error) {
        router.push(callbackUrl);
        setIsLoading(false);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <p>{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm lg:text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm lg:text-base">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <div className="h-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button className="mt-4" loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
