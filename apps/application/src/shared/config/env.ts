import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Спільні змінні для сервера та клієнта (наприклад, NODE_ENV).
   */
  shared: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Змінні лише для сервера.
   */
  server: {
    // DATABASE_URL: z.string().url(),
  },

  /**
   * Змінні для клієнта (мають починатися з NEXT_PUBLIC_).
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Для Next.js App Router використовуємо experimental__runtimeEnv.
   * Тут потрібно перерахувати ТІЛЬКИ клієнтські та спільні змінні.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },

  /**
   * Пропускати валідацію під час білду (наприклад, для Docker).
   */
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.SKIP_ENV_VALIDATION === "1",

  /**
   * Порожні рядки вважатимуться як undefined.
   */
  emptyStringAsUndefined: true,
});
