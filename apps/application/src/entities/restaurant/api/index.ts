import {
  restaurantSchema,
  restaurantUpsertInputSchema,
} from "@booking/contracts/restaurant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { Restaurant, RestaurantUpsertPayload } from "../model/types";

export const restaurantQueryKeys = {
  all: ["restaurant"] as const,
  byDomain: (domain: string) => [...restaurantQueryKeys.all, domain] as const,
  me: (accessToken: string | null) =>
    [...restaurantQueryKeys.all, "me", accessToken] as const,
};

export const restaurantApi = {
  getByDomain: async (domain: string): Promise<Restaurant | null> => {
    try {
      const response = await apiRequest<ApiResult<Restaurant>>(
        `/api/restaurants/domain/${encodeURIComponent(domain)}`,
        {
          method: "GET",
        }
      );

      return restaurantSchema.parse(response.data);
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "status" in error &&
        error.status === 404
      ) {
        return null;
      }

      throw error;
    }
  },
  getMine: async (accessToken: string): Promise<Restaurant | null> => {
    const response = await apiRequest<ApiResult<Restaurant | null>>(
      "/api/restaurants/me",
      {
        headers: getAuthHeaders({ accessToken }),
        method: "GET",
      }
    );

    return response.data === null
      ? null
      : restaurantSchema.parse(response.data);
  },
  upsertMine: async (
    accessToken: string,
    payload: RestaurantUpsertPayload
  ): Promise<Restaurant> => {
    const response = await apiRequest<ApiResult<Restaurant>>(
      "/api/restaurants/me",
      {
        body: restaurantUpsertInputSchema.parse(payload),
        headers: getAuthHeaders({ accessToken }),
        method: "PUT",
      }
    );

    return restaurantSchema.parse(response.data);
  },
};

export const useRestaurantByDomain = (domain: string) =>
  useQuery({
    enabled: Boolean(domain),
    queryFn: () => restaurantApi.getByDomain(domain),
    queryKey: restaurantQueryKeys.byDomain(domain),
  });

export const useMyRestaurantQuery = (
  accessToken: string | null,
  enabled = true
) =>
  useQuery({
    enabled: enabled && Boolean(accessToken),
    queryFn: () => restaurantApi.getMine(accessToken ?? ""),
    queryKey: restaurantQueryKeys.me(accessToken),
  });

export const useUpsertMyRestaurantMutation = (accessToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RestaurantUpsertPayload) =>
      restaurantApi.upsertMine(accessToken ?? "", payload),
    onSuccess: (restaurant) => {
      queryClient.setQueryData(restaurantQueryKeys.me(accessToken), restaurant);
      queryClient.setQueryData(
        restaurantQueryKeys.byDomain(restaurant.domain),
        restaurant
      );
    },
  });
};
