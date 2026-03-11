"use client";

import { useQuery } from "@tanstack/react-query";

import { mockRequest } from "@/shared/api";

import { TABLES } from "../model/mock";
import type { Table } from "../model/types";

export const tableQueryKeys = {
  all: ["tables"] as const,
  list: () => [...tableQueryKeys.all, "list"] as const,
};

export const tableApi = {
  getList: (): Promise<Table[]> =>
    mockRequest(TABLES, {
      delayMs: 250,
    }),
};

export const useTablesQuery = () =>
  useQuery({
    initialData: TABLES,
    queryFn: () => tableApi.getList(),
    queryKey: tableQueryKeys.list(),
  });
