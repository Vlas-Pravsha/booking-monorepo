export interface AuthIdentity {
  userId: string;
  email: string;
  sessionId: string;
}

export interface RequestContextVariables {
  auth: AuthIdentity;
  requestId: string;
}
