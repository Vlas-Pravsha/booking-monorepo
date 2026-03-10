import { createHash } from "node:crypto";

export const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");
