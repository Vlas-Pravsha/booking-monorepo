import { hash, verify } from "@node-rs/argon2";

const PASSWORD_HASH_OPTIONS = {
  memoryCost: 19_456,
  parallelism: 1,
  timeCost: 2,
};

export const hashPassword = (password: string): Promise<string> =>
  hash(password, PASSWORD_HASH_OPTIONS);

export const verifyPassword = (
  passwordHash: string,
  password: string
): Promise<boolean> => verify(passwordHash, password);
