import { z } from "zod";

export const contactRequestInputSchema = z.object({
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
  name: z.string().trim().min(2).max(128),
  phone: z.string().trim().min(7).max(32),
});

export type ContactRequestInput = z.infer<typeof contactRequestInputSchema>;
