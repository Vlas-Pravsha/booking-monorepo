"use client";

import {
  authSessionSchema,
  authUserEnvelopeSchema,
  logoutResultSchema,
  refreshTokenInputSchema,
} from "@booking/contracts/auth";
import type {
  AuthSession,
  AuthUserEnvelope,
  LogoutResult,
} from "@booking/contracts/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

export const authQueryKeys = {
  currentUser: (accessToken: string | null) =>
    ["auth", "current-user", accessToken] as const,
};

export const authApi = {
  getCurrentUser: async (accessToken: string): Promise<AuthUserEnvelope> => {
    const response = await apiRequest<ApiResult<AuthUserEnvelope>>(
      "/api/auth/me",
      {
        headers: getAuthHeaders({ accessToken }),
        method: "GET",
      }
    );

    return authUserEnvelopeSchema.parse(response.data);
  },
  logout: async (refreshToken: string): Promise<LogoutResult> => {
    const response = await apiRequest<ApiResult<LogoutResult>>(
      "/api/auth/logout",
      {
        body: refreshTokenInputSchema.parse({ refreshToken }),
        method: "POST",
      }
    );

    return logoutResultSchema.parse(response.data);
  },
  refresh: async (refreshToken: string): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/refresh",
      {
        body: refreshTokenInputSchema.parse({ refreshToken }),
        method: "POST",
      }
    );

    return authSessionSchema.parse(response.data);
  },
};

export const useCurrentUserQuery = (
  accessToken: string | null,
  enabled = true
) =>
  useQuery({
    enabled: enabled && Boolean(accessToken),
    queryFn: () => authApi.getCurrentUser(accessToken ?? ""),
    queryKey: authQueryKeys.currentUser(accessToken),
    retry: false,
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
  });

export const useRefreshSessionMutation = () =>
  useMutation({
    mutationFn: (refreshToken: string) => authApi.refresh(refreshToken),
  });
