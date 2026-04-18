import { z } from "zod";

import { successResponseSchema } from "./shared";

export const registerInputSchema = z.object({
  email: z.email(),
  firstName: z.string().min(1).max(64).optional(),
  lastName: z.string().min(1).max(64).optional(),
  password: z.string().min(8).max(128),
});

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const refreshTokenInputSchema = z.object({
  refreshToken: z.string().min(10),
});

export const forgotPasswordInputSchema = z.object({
  email: z.email(),
});

export const resetPasswordInputSchema = z.object({
  password: z.string().min(8).max(128),
  token: z.string().trim().min(32),
});

export const authUserSchema = z.object({
  createdAt: z.string().min(1),
  email: z.email(),
  firstName: z.string().nullable(),
  id: z.string().trim().min(1),
  lastLoginAt: z.string().nullable(),
  lastName: z.string().nullable(),
  status: z.string().trim().min(1),
  updatedAt: z.string().min(1),
});

export const authSessionSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  user: authUserSchema,
});

export const authUserEnvelopeSchema = z.object({
  user: authUserSchema,
});

export const forgotPasswordResultSchema = successResponseSchema;
export const resetPasswordResultSchema = successResponseSchema;
export const logoutResultSchema = successResponseSchema;

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenInputSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthSession = z.infer<typeof authSessionSchema>;
export type AuthUserEnvelope = z.infer<typeof authUserEnvelopeSchema>;
export type LoginPayload = LoginInput;
export type RegisterPayload = RegisterInput;
export type ForgotPasswordResult = z.infer<typeof forgotPasswordResultSchema>;
export type ResetPasswordResult = z.infer<typeof resetPasswordResultSchema>;
export type LogoutResult = z.infer<typeof logoutResultSchema>;
