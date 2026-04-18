"use client";

import {
  authSessionSchema,
  forgotPasswordInputSchema,
  forgotPasswordResultSchema,
  loginInputSchema,
  registerInputSchema,
  resetPasswordInputSchema,
  resetPasswordResultSchema,
} from "@booking/contracts/auth";
import type {
  AuthSession,
  ForgotPasswordInput,
  ForgotPasswordResult,
  LoginPayload,
  RegisterPayload,
  ResetPasswordResult,
  ResetPasswordInput,
} from "@booking/contracts/auth";
import { useMutation } from "@tanstack/react-query";

import { apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

export type ForgotPasswordPayload = ForgotPasswordInput;
export type ResetPasswordPayload = ResetPasswordInput;

export const authApi = {
  forgotPassword: (
    payload: ForgotPasswordPayload
  ): Promise<ForgotPasswordResult> =>
    apiRequest<ApiResult<ForgotPasswordResult>>("/api/auth/forgot-password", {
      body: forgotPasswordInputSchema.parse(payload),
      method: "POST",
    }).then((response) => forgotPasswordResultSchema.parse(response.data)),
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/login",
      {
        body: loginInputSchema.parse(payload),
        method: "POST",
      }
    );

    return authSessionSchema.parse(response.data);
  },
  register: async (payload: RegisterPayload): Promise<AuthSession> => {
    const response = await apiRequest<ApiResult<AuthSession>>(
      "/api/auth/register",
      {
        body: registerInputSchema.parse(payload),
        method: "POST",
      }
    );

    return authSessionSchema.parse(response.data);
  },
  resetPassword: (
    payload: ResetPasswordPayload
  ): Promise<ResetPasswordResult> =>
    apiRequest<ApiResult<ResetPasswordResult>>("/api/auth/reset-password", {
      body: resetPasswordInputSchema.parse(payload),
      method: "POST",
    }).then((response) => resetPasswordResultSchema.parse(response.data)),
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

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });

export type { AuthSession, LoginPayload, RegisterPayload };
