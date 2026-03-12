"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { CustomerListResponse } from "../model/types";

export const customerQueryKeys = {
  all: ["customers"] as const,
  list: (accessToken: string | null) =>
    [...customerQueryKeys.all, "list", accessToken] as const,
};

export const customerApi = {
  getList: async (accessToken: string): Promise<CustomerListResponse> => {
    const response = await apiRequest<ApiResult<CustomerListResponse>>(
      "/api/admin/customers",
      {
        headers: getAuthHeaders({ accessToken }),
        method: "GET",
      }
    );

    return response.data;
  },
  updateVip: async (
    accessToken: string,
    customerId: string,
    vip: boolean
  ): Promise<{ success: boolean }> => {
    const response = await apiRequest<ApiResult<{ success: boolean }>>(
      `/api/admin/customers/${encodeURIComponent(customerId)}`,
      {
        body: {
          vip,
        },
        headers: getAuthHeaders({ accessToken }),
        method: "PATCH",
      }
    );

    return response.data;
  },
};

export const useCustomersQuery = (accessToken: string | null) =>
  useQuery({
    enabled: Boolean(accessToken),
    queryFn: () => customerApi.getList(accessToken ?? ""),
    queryKey: customerQueryKeys.list(accessToken),
  });

export const useUpdateCustomerVipMutation = (accessToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, vip }: { customerId: string; vip: boolean }) =>
      customerApi.updateVip(accessToken ?? "", customerId, vip),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: customerQueryKeys.all,
      });
    },
  });
};
