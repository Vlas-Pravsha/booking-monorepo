"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getAuthHeaders, apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type {
  AuthSession,
  AuthUserEnvelope,
  LoginPayload,
  RegisterPayload,
} from "../model/types";

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

    return response.data;
  },
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/login",
      {
        body: payload,
        method: "POST",
      }
    );

    return response.data;
  },
  logout: async (refreshToken: string): Promise<{ success: boolean }> => {
    const response = await apiRequest<ApiResult<{ success: boolean }>>(
      "/api/auth/logout",
      {
        body: { refreshToken },
        method: "POST",
      }
    );

    return response.data;
  },
  refresh: async (refreshToken: string): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/refresh",
      {
        body: { refreshToken },
        method: "POST",
      }
    );

    return response.data;
  },
  register: async (payload: RegisterPayload): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/register",
      {
        body: payload,
        method: "POST",
      }
    );

    return response.data;
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

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
  });

export const useRefreshSessionMutation = () =>
  useMutation({
    mutationFn: (refreshToken: string) => authApi.refresh(refreshToken),
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
