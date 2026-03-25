import { z } from "zod";

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

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenInputSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
