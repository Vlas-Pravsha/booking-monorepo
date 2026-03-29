"use client";

import {
  tableListResponseSchema,
  tableStatusOverrideUpdateInputSchema,
  tableStatusOverrideUpdateResultSchema,
} from "@booking/contracts/admin";
import type { TableStatusOverrideUpdateResult } from "@booking/contracts/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { TableListResponse } from "../model/types";

export const tableQueryKeys = {
  all: ["tables"] as const,
  list: (accessToken: string | null) =>
    [...tableQueryKeys.all, "list", accessToken] as const,
};

export const tableApi = {
  getList: async (accessToken: string): Promise<TableListResponse> => {
    const response = await apiRequest<ApiResult<TableListResponse>>(
      "/api/admin/tables",
      {
        headers: getAuthHeaders({ accessToken }),
        method: "GET",
      }
    );

    return tableListResponseSchema.parse(response.data);
  },
  updateStatus: async (
    accessToken: string,
    tableId: string,
    status: "available" | "maintenance"
  ): Promise<TableStatusOverrideUpdateResult> => {
    const response = await apiRequest<
      ApiResult<TableStatusOverrideUpdateResult>
    >(`/api/admin/tables/${encodeURIComponent(tableId)}/status`, {
      body: tableStatusOverrideUpdateInputSchema.parse({
        status,
      }),
      headers: getAuthHeaders({ accessToken }),
      method: "PATCH",
    });

    return tableStatusOverrideUpdateResultSchema.parse(response.data);
  },
};

export const useTablesQuery = (accessToken: string | null) =>
  useQuery({
    enabled: Boolean(accessToken),
    queryFn: () => tableApi.getList(accessToken ?? ""),
    queryKey: tableQueryKeys.list(accessToken),
  });

export const useUpdateTableStatusMutation = (accessToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      status,
      tableId,
    }: {
      tableId: string;
      status: "available" | "maintenance";
    }) => tableApi.updateStatus(accessToken ?? "", tableId, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tableQueryKeys.all,
      });
    },
  });
};
