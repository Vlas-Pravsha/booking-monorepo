import { useQuery } from "@tanstack/react-query";

import { mockRequest } from "@/shared/api";

import { MOCK_RESTAURANTS } from "../model/mock";
import type { Restaurant } from "../model/types";

export const restaurantQueryKeys = {
  all: ["restaurant"] as const,
  byDomain: (domain: string) => [...restaurantQueryKeys.all, domain] as const,
};

export const restaurantApi = {
  getByDomain: (domain: string): Promise<Restaurant | null> =>
    mockRequest(MOCK_RESTAURANTS[domain] ?? null, {
      delayMs: 500,
    }),
};

export const useRestaurantByDomain = (domain: string) =>
  useQuery({
    enabled: Boolean(domain),
    queryFn: () => restaurantApi.getByDomain(domain),
    queryKey: restaurantQueryKeys.byDomain(domain),
  });
