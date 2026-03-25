"use client";

import * as React from "react";

import { useTablesQuery } from "@/entities/table";
import { useAdminAccessToken } from "@/views/admin/shared";

import { getTableStats } from "../lib/get-table-stats";
import type { ViewMode } from "./types";

const EMPTY_TABLES: never[] = [];

export function useTablesPage() {
  const accessToken = useAdminAccessToken();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const tablesQuery = useTablesQuery(accessToken);
  const tables = tablesQuery.data?.tables ?? EMPTY_TABLES;
  const restaurant = tablesQuery.data?.restaurant ?? null;
  const stats = React.useMemo(() => getTableStats(tables), [tables]);
  const refreshTables = React.useCallback(async () => {
    await tablesQuery.refetch();
  }, [tablesQuery]);

  return {
    isLoading: tablesQuery.isLoading,
    isRefreshing: tablesQuery.isFetching,
    refreshTables,
    restaurant,
    setViewMode,
    stats,
    tables,
    tablesQuery,
    viewMode,
  };
}
