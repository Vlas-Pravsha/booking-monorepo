import { z } from "zod";

import { successResponseSchema } from "./shared";

export const contactRequestInputSchema = z.object({
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
  name: z.string().trim().min(2).max(128),
  phone: z.string().trim().min(7).max(32),
});

export const contactRequestResultSchema = successResponseSchema.extend({
  submittedAt: z.string().min(1),
});

export type ContactRequestInput = z.infer<typeof contactRequestInputSchema>;
export type ContactRequestPayload = ContactRequestInput;
export type ContactRequestResult = z.infer<typeof contactRequestResultSchema>;
