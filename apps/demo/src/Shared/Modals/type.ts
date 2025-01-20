import { z } from "zod";

export const FormSchema = z.object({
  discription: z.string().min(2, { message: "Discription is required" }),
  skills: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
  profession: z.string().min(2, {
    message: "Profession is required",
  }),
  gender: z.enum(["Male", "Female", "Other"]).refine(
    (value) => {
      return value !== undefined;
    },
    {
      message: "Gender is required",
    }
  ),
});

export const EditFormSchema = FormSchema.extend({
  username: z
    .string()
    .min(2, { message: "Username is required" })
    .max(10, { message: "Only 10 characters are allowed" }),
});

export type TypeForm = z.infer<typeof FormSchema>;
export type EditForm = z.infer<typeof EditFormSchema>;
