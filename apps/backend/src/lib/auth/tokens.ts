import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

import { ApiError, isApiError } from "../../core/api-error";
import { env } from "../env";

const TOKEN_HEADER = {
  alg: "HS256",
  typ: "JWT",
} as const;

const TOKEN_ISSUER = "booking-system-backend";
const TOKEN_AUDIENCE = "booking-system-client";

const encodeSecret = (value: string): Uint8Array =>
  new TextEncoder().encode(value);

const accessSecret = encodeSecret(env.JWT_ACCESS_SECRET);
const refreshSecret = encodeSecret(env.JWT_REFRESH_SECRET);

const accessTokenClaimsSchema = z.object({
  email: z.string().email(),
  sid: z.string().min(1),
  sub: z.string().min(1),
});

const refreshTokenClaimsSchema = z.object({
  sid: z.string().min(1),
  sub: z.string().min(1),
});

export interface AccessTokenPayload {
  userId: string;
  sessionId: string;
  email: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

const issueToken = (
  claims: Record<string, string>,
  secret: Uint8Array,
  subject: string,
  expiresIn: string
): Promise<string> =>
  new SignJWT(claims)
    .setProtectedHeader(TOKEN_HEADER)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

export const issueAccessToken = (
  payload: AccessTokenPayload
): Promise<string> =>
  issueToken(
    {
      email: payload.email,
      sid: payload.sessionId,
    },
    accessSecret,
    payload.userId,
    `${env.ACCESS_TOKEN_TTL_MINUTES}m`
  );

export const issueRefreshToken = (
  payload: RefreshTokenPayload
): Promise<string> =>
  issueToken(
    {
      sid: payload.sessionId,
    },
    refreshSecret,
    payload.userId,
    `${env.REFRESH_TOKEN_TTL_DAYS}d`
  );

const verifyTokenClaims = async <TClaims, TPayload>(
  token: string,
  secret: Uint8Array,
  schema: z.ZodType<TClaims>,
  mapClaims: (claims: TClaims) => TPayload,
  payloadErrorMessage: string,
  invalidTokenMessage: string
): Promise<TPayload> => {
  try {
    const { payload } = await jwtVerify(token, secret, {
      audience: TOKEN_AUDIENCE,
      issuer: TOKEN_ISSUER,
    });

    const parsedPayload = schema.safeParse(payload);

    if (!parsedPayload.success) {
      throw ApiError.unauthorized(payloadErrorMessage);
    }

    return mapClaims(parsedPayload.data);
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }

    throw ApiError.unauthorized(invalidTokenMessage);
  }
};

export const verifyAccessToken = (token: string): Promise<AccessTokenPayload> =>
  verifyTokenClaims(
    token,
    accessSecret,
    accessTokenClaimsSchema,
    (claims) => ({
      email: claims.email,
      sessionId: claims.sid,
      userId: claims.sub,
    }),
    "Invalid access token payload",
    "Invalid or expired access token"
  );

export const verifyRefreshToken = (
  token: string
): Promise<RefreshTokenPayload> =>
  verifyTokenClaims(
    token,
    refreshSecret,
    refreshTokenClaimsSchema,
    (claims) => ({
      sessionId: claims.sid,
      userId: claims.sub,
    }),
    "Invalid refresh token payload",
    "Invalid or expired refresh token"
  );
