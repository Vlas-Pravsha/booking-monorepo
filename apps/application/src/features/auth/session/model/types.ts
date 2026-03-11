export interface AuthUser {
  createdAt: string;
  email: string;
  firstName: string | null;
  id: string;
  lastLoginAt: string | null;
  lastName: string | null;
  status: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface AuthUserEnvelope {
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}
