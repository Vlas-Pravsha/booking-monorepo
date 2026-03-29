import { z } from "zod";

export const successResponseSchema = z.object({
  success: z.literal(true),
});

export const restaurantSummarySchema = z.object({
  domain: z.string().trim().min(1),
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export interface ApiResult<T> {
  data: T;
}

export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type RestaurantSummary = z.infer<typeof restaurantSummarySchema>;
