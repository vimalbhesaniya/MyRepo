import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username is required" })
      .max(10, { message: "Only 10 characters are allowed" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Maximum 8 Charactors are allowed" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Maximum 8 Charactors are allowed" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password and confirm password should be match",
    path: ["confirmPassword"],
  })
  .refine((data) => passwordRegex.test(data.confirmPassword), {
    message: "At least one letter and one number",
    path: ["confirmPassword"],
  })
  .refine((data) => passwordRegex.test(data.confirmPassword), {
    message: "At least one letter and one number",
    path: ["password"],
  });

export type TypeForm = z.infer<typeof FormSchema>;
