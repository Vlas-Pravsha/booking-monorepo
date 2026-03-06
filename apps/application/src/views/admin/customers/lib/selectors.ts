import type { Customer } from "@/entities/customer";

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
  return {
    newThisMonth: 2,
    thisMonth: customers.filter((customer) =>
      customer.lastVisit.startsWith("28.02")
    ).length,
    total: customers.length,
    vip: customers.filter((customer) => customer.vip).length,
  };
}
