"use client";

import { Filter, Plus, Search } from "lucide-react";
import * as React from "react";

import { useCustomersQuery } from "@/entities/customer";
import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";

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
  const { data: customers = [] } = useCustomersQuery();

  const allTags = React.useMemo(
    () => getAllCustomerTags(customers),
    [customers]
  );

  const filteredCustomers = React.useMemo(
    () => filterCustomers(customers, searchQuery, tagFilter),
    [customers, searchQuery, tagFilter]
  );

  const stats = React.useMemo(() => getCustomerStats(customers), [customers]);

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="База гостей"
        title="Клієнти"
        subtitle="База гостей з сегментацією, історією візитів і швидким доступом до цінних контактів."
        insights={[
          {
            label: "Всього клієнтів",
            tone: "primary",
            value: `${stats.total} у базі`,
          },
          {
            label: "VIP сегмент",
            tone: "warning",
            value: `${stats.vip} постійних гостей`,
          },
          {
            label: "Нові за місяць",
            tone: "success",
            value: `+${stats.newThisMonth} нових контактів`,
          },
        ]}
        action={
          <Button className={surfaceClassNames.actionButton}>
            <Plus className="h-4 w-4" />
            Додати клієнта
          </Button>
        }
      />

      <CustomersStats stats={stats} />

      <SurfaceCard>
        <CardHeader className="pb-4">
          <div className="mb-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Пошук і сегментація
            </p>
            <p className="text-sm text-muted-foreground">
              Знаходьте гостей за контактами та відбирайте потрібні теги для
              швидких дій.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Пошук за іменем, телефоном або email..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={cn(surfaceClassNames.mutedInput, "pl-10")}
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-full">
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
      </SurfaceCard>
    </DashboardShell>
  );
}
