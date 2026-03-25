import { logger } from "../../core/logger";

export interface PasswordResetNotificationPayload {
  email: string;
  expiresAt: Date;
  resetUrl: string;
}

export const sendPasswordResetNotification = (
  payload: PasswordResetNotificationPayload
): void => {
  logger.info(
    {
      email: payload.email,
      expiresAt: payload.expiresAt.toISOString(),
      resetUrl: payload.resetUrl,
    },
    "Password reset link generated"
  );
};
