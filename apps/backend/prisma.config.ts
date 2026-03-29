import "dotenv/config";
import { defineConfig } from "prisma/config";

const defaultDatabaseUrl = "file:./prisma/dev.db";
const databaseUrl = process.env.DATABASE_URL ?? defaultDatabaseUrl;

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  schema: "prisma/schema.prisma",
});
