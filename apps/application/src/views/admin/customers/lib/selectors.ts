import type { Customer } from "@/entities/customer";
import { getLocalMonthKey } from "@/shared/lib/formatters";

import type { CustomerStats } from "../model/types";

export function getAllCustomerTags(customers: readonly Customer[]): string[] {
  const tags = new Set<string>();

  for (const customer of customers) {
    for (const tag of customer.tags) {
      tags.add(tag);
    }
  }

  return [...tags];
}

export function filterCustomers(
  customers: readonly Customer[],
  searchQuery: string,
  tagFilter: string
): Customer[] {
  const normalizedQuery = searchQuery.toLowerCase();

  return customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(normalizedQuery) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(normalizedQuery);

    const matchesTag = tagFilter === "all" || customer.tags.includes(tagFilter);

    return matchesSearch && matchesTag;
  });
}

export function getCustomerStats(
  customers: readonly Customer[]
): CustomerStats {
  const currentMonthKey = getLocalMonthKey(new Date());

  return {
    newThisMonth: customers.filter(
      (customer) => getLocalMonthKey(customer.createdAt) === currentMonthKey
    ).length,
    thisMonth: customers.filter(
      (customer) =>
        customer.lastVisitAt &&
        getLocalMonthKey(customer.lastVisitAt) === currentMonthKey
    ).length,
    total: customers.length,
    vip: customers.filter((customer) => customer.vip).length,
  };
}
