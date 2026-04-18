import { z } from "zod";

export * from "@booking/contracts/admin";

export const entityIdParamsSchema = z.object({
  id: z.string().trim().min(1),
});
