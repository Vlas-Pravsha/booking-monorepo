import { z } from "zod";

export * from "@booking/contracts/restaurant";

export const restaurantDomainParamsSchema = z.object({
  domain: z.string().trim().min(2).max(63),
});
