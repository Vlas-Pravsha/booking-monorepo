"use client";

import { useQuery } from "@tanstack/react-query";

import { mockRequest } from "@/shared/api";

import { CUSTOMERS } from "../model/mock";
import type { Customer } from "../model/types";

export const customerQueryKeys = {
  all: ["customers"] as const,
  list: () => [...customerQueryKeys.all, "list"] as const,
};

export const customerApi = {
  getList: (): Promise<Customer[]> =>
    mockRequest(CUSTOMERS, {
      delayMs: 250,
    }),
};

export const useCustomersQuery = () =>
  useQuery({
    initialData: CUSTOMERS,
    queryFn: () => customerApi.getList(),
    queryKey: customerQueryKeys.list(),
  });
