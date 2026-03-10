"use client";

import { Filter, Plus, Search } from "lucide-react";
import * as React from "react";

import { CUSTOMERS } from "@/entities/customer";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

import {
  filterCustomers,
  getAllCustomerTags,
  getCustomerStats,
} from "../lib/selectors";
import { CustomerRow } from "./components/customer-row";
import { CustomersStats } from "./components/customers-stats";
import { TagFilterItem } from "./components/tag-filter-item";

export function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState<string>("all");

  const allTags = React.useMemo(() => getAllCustomerTags(CUSTOMERS), []);

  const filteredCustomers = React.useMemo(
    () => filterCustomers(CUSTOMERS, searchQuery, tagFilter),
    [searchQuery, tagFilter]
  );

  const stats = React.useMemo(() => getCustomerStats(CUSTOMERS), []);

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  return (
    <DashboardShell>
      <PageHeader
        title="Клієнти"
        subtitle="База клієнтів та історія відвідувань"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <Plus className="h-4 w-4" />
            Додати клієнта
          </Button>
        }
      />

      <CustomersStats stats={stats} />

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук за іменем, телефоном або email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-white/50"
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {tagFilter === "all" ? "Всі теги" : tagFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTagFilter("all")}>
                    Всі теги
                  </DropdownMenuItem>
                  {allTags.map((tag) => (
                    <TagFilterItem
                      key={tag}
                      tag={tag}
                      onSelect={setTagFilter}
                    />
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {filteredCustomers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
