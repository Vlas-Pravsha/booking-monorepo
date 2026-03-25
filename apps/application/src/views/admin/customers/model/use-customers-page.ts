"use client";

import * as React from "react";

import { useCustomersQuery } from "@/entities/customer";
import { useAdminAccessToken } from "@/views/admin/shared";

import {
  filterCustomers,
  getAllCustomerTags,
  getCustomerStats,
} from "../lib/selectors";

const EMPTY_CUSTOMERS: never[] = [];

export function useCustomersPage() {
  const accessToken = useAdminAccessToken();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState("all");
  const customersQuery = useCustomersQuery(accessToken);
  const customers = customersQuery.data?.customers ?? EMPTY_CUSTOMERS;
  const restaurant = customersQuery.data?.restaurant ?? null;
  const allTags = React.useMemo(
    () => getAllCustomerTags(customers),
    [customers]
  );
  const filteredCustomers = React.useMemo(
    () => filterCustomers(customers, searchQuery, tagFilter),
    [customers, searchQuery, tagFilter]
  );
  const stats = React.useMemo(() => getCustomerStats(customers), [customers]);
  const refreshCustomers = React.useCallback(() => {
    customersQuery.refetch();
  }, [customersQuery]);

  return {
    allTags,
    customersQuery,
    filteredCustomers,
    isLoading: customersQuery.isLoading,
    isRefreshing: customersQuery.isFetching,
    refreshCustomers,
    restaurant,
    searchQuery,
    setSearchQuery,
    setTagFilter,
    stats,
    tagFilter,
  };
}
