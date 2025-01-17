import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Maximum 8 Charactors are allowed" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
