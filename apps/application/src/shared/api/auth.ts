export type {
  AuthSession,
  AuthUser,
  AuthUserEnvelope,
  LoginPayload,
  RegisterPayload,
} from "@booking/contracts/auth";

export interface AuthHeadersOptions {
  accessToken?: string;
}

export const getAuthHeaders = (
  options: AuthHeadersOptions = {}
): Record<string, string> => {
  if (!options.accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${options.accessToken}`,
  };
};
