import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  whatsapp: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val) return true; 
      return !Number.isNaN(parseInt(val));
    }, {
      message: "Invalid phone number",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
