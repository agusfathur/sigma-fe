import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password is required"),
  email: z.string().min(1, "Email is required"),
  role: z.string().min(1, "Role is required"),
});

export const UserUpdateSchema = z.object({
  id_user: z.string(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .or(z.literal("")),

  email: z.string().min(1, "Email is required"),
  role: z.string().min(1, "Role is required"),
});

export type TypeUserCreate = z.infer<typeof UserCreateSchema>;
export type TypeUserUpdate = z.infer<typeof UserUpdateSchema>;
