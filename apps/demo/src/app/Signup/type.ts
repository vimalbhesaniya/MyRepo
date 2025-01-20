import { object, z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const passwordSchema = z
  .string()
  .min(8, { message: "Maximum 8 characters are allowed" })
  .refine((data) => passwordRegex.test(data), {
    message:
      "At least one letter, one number, and one special character are required",
  });

const confirmPasswordSchema = z
  .string()
  .min(8, { message: "Maximum 8 characters are allowed" })
  .refine((data) => passwordRegex.test(data), {
    message:
      "At least one letter, one number, and one special character are required",
  });

export const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username is required" })
      .max(10, { message: "Only 10 characters are allowed" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirm password should match",
    path: ["confirmPassword"],
  });

export type TypeForm = z.infer<typeof FormSchema>;

export const PasswordForm = z
  .object({
    currentPassword: passwordSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirm password should match",
    path: ["confirmPassword"],
  });

export type TypePassword = z.infer<typeof PasswordForm>;
