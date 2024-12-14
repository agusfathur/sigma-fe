import { z } from "zod";

export const UbahPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimum 8 characters")
      .max(20, "Password is too long"),
    confirm_password: z
      .string()
      .min(8, "Password minimum 8 characters")
      .max(20, "Password is too long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });

export type TypeUbahPassword = z.infer<typeof UbahPasswordSchema>;
