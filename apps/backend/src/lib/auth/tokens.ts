import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

import { ApiError } from "../../core/api-error";
import { env } from "../env";

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET);
const issuer = "booking-system-backend";
const audience = "booking-system-client";

const accessTokenPayloadSchema = z.object({
  email: z.string().email(),
  sid: z.string().min(1),
  sub: z.string().min(1),
});

const refreshTokenPayloadSchema = z.object({
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

export const issueAccessToken = (
  payload: AccessTokenPayload
): Promise<string> =>
  new SignJWT({
    email: payload.email,
    sid: payload.sessionId,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuer(issuer)
    .setAudience(audience)
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${env.ACCESS_TOKEN_TTL_MINUTES}m`)
    .sign(accessSecret);

export const issueRefreshToken = (
  payload: RefreshTokenPayload
): Promise<string> =>
  new SignJWT({
    sid: payload.sessionId,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuer(issuer)
    .setAudience(audience)
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${env.REFRESH_TOKEN_TTL_DAYS}d`)
    .sign(refreshSecret);

export const verifyAccessToken = async (
  token: string
): Promise<AccessTokenPayload> => {
  try {
    const { payload } = await jwtVerify(token, accessSecret, {
      audience,
      issuer,
    });

    const parsedPayload = accessTokenPayloadSchema.safeParse({
      email: payload.email,
      sid: payload.sid,
      sub: payload.sub,
    });

    if (!parsedPayload.success) {
      throw ApiError.unauthorized("Invalid access token payload");
    }

    return {
      email: parsedPayload.data.email,
      sessionId: parsedPayload.data.sid,
      userId: parsedPayload.data.sub,
    };
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }
};

export const verifyRefreshToken = async (
  token: string
): Promise<RefreshTokenPayload> => {
  try {
    const { payload } = await jwtVerify(token, refreshSecret, {
      audience,
      issuer,
    });

    const parsedPayload = refreshTokenPayloadSchema.safeParse({
      sid: payload.sid,
      sub: payload.sub,
    });

    if (!parsedPayload.success) {
      throw ApiError.unauthorized("Invalid refresh token payload");
    }

    return {
      sessionId: parsedPayload.data.sid,
      userId: parsedPayload.data.sub,
    };
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }
};
