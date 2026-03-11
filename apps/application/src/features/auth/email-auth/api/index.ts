"use client";

import { useMutation } from "@tanstack/react-query";

import type { LoginPayload, RegisterPayload } from "@/features/auth/session";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/session";
import { mockRequest } from "@/shared/api";

export interface ForgotPasswordPayload {
  email: string;
}

export const authApi = {
  forgotPassword: (
    _payload: ForgotPasswordPayload
  ): Promise<{ success: true }> =>
    mockRequest(
      {
        success: true as const,
      },
      {
        delayMs: 1200,
      }
    ),
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authApi.forgotPassword(payload),
  });

export const useLogin = () => useLoginMutation();

export const useRegister = () => useRegisterMutation();

export type { LoginPayload, RegisterPayload };
