"use client";

import { useMutation } from "@tanstack/react-query";

import type { LoginPayload, RegisterPayload } from "@/features/auth/session";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/session";
import { apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  token: string;
}

export const authApi = {
  forgotPassword: (
    payload: ForgotPasswordPayload
  ): Promise<{ success: true }> =>
    apiRequest<ApiResult<{ success: true }>>("/api/auth/forgot-password", {
      body: payload,
      method: "POST",
    }).then((response) => response.data),
  resetPassword: (payload: ResetPasswordPayload): Promise<{ success: true }> =>
    apiRequest<ApiResult<{ success: true }>>("/api/auth/reset-password", {
      body: payload,
      method: "POST",
    }).then((response) => response.data),
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authApi.forgotPassword(payload),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authApi.resetPassword(payload),
  });

export const useLogin = () => useLoginMutation();

export const useRegister = () => useRegisterMutation();

export type { LoginPayload, RegisterPayload };
