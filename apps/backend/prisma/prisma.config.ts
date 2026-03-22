import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "prisma/config";

const defaultSqliteDatabaseUrl = "file:./dev.db";
const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const prismaDirectory = path.join(backendDirectory, "prisma");

const resolveDatasourceUrl = (databaseUrl: string): string => {
  if (!databaseUrl.startsWith("file:")) {
    return databaseUrl;
  }

  const sqlitePath = databaseUrl.slice("file:".length);

  if (path.isAbsolute(sqlitePath)) {
    return databaseUrl;
  }

  return `file:${path.resolve(prismaDirectory, sqlitePath)}`;
};

export default defineConfig({
  datasource: {
    url: resolveDatasourceUrl(
      process.env.DATABASE_URL ?? defaultSqliteDatabaseUrl
    ),
  },
  engine: "classic",
  migrations: {
    path: "prisma/migrations",
  },
  schema: "prisma/schema.prisma",
});
