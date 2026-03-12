"use client";

import { Filter, RefreshCw, Search } from "lucide-react";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useCustomersQuery } from "@/entities/customer";
import { selectAuthSession } from "@/features/auth/session";
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
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared/ui/data-state-cards";

import {
  filterCustomers,
  getAllCustomerTags,
  getCustomerStats,
} from "../lib/selectors";
import { CustomerRow } from "./components/customer-row";
import { CustomersStats } from "./components/customers-stats";
import { TagFilterItem } from "./components/tag-filter-item";

const EMPTY_CUSTOMERS: never[] = [];

function useCustomerPageData(
  accessToken: string | null,
  searchQuery: string,
  tagFilter: string
) {
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

  return { allTags, customersQuery, filteredCustomers, restaurant, stats };
}

export function AdminCustomersPage() {
  const session = useAppSelector(selectAuthSession);
  const accessToken = session?.accessToken ?? null;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState<string>("all");
  const pageData = useCustomerPageData(accessToken, searchQuery, tagFilter);

  if (pageData.customersQuery.isLoading) {
    return (
      <DashboardShell>
        <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 text-sm text-muted-foreground shadow-xl">
          Завантажуємо клієнтську базу...
        </div>
      </DashboardShell>
    );
  }

  if (!pageData.restaurant) {
    return (
      <DashboardShell>
        <MissingRestaurantState />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="База гостей"
        title="Клієнти"
        subtitle="Клієнтська база формується з реальних бронювань і персональних карток гостей."
        insights={[
          {
            label: "Всього клієнтів",
            tone: "primary",
            value: `${pageData.stats.total} у базі`,
          },
          {
            label: "VIP сегмент",
            tone: "warning",
            value: `${pageData.stats.vip} постійних гостей`,
          },
          {
            label: "Нові за місяць",
            tone: "success",
            value: `+${pageData.stats.newThisMonth} нових контактів`,
          },
        ]}
        action={
          <Button
            className={surfaceClassNames.actionButton}
            onClick={() => {
              pageData.customersQuery.refetch();
            }}
            disabled={pageData.customersQuery.isFetching}
          >
            <RefreshCw className="h-4 w-4" />
            Оновити базу
          </Button>
        }
      />

      {pageData.customersQuery.data?.hasSampleData ? (
        <SampleDataNotice />
      ) : null}

      <CustomersStats stats={pageData.stats} />

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
                  {pageData.allTags.map((tag) => (
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
            {pageData.filteredCustomers.length > 0 ? (
              pageData.filteredCustomers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border/70 bg-background/65 px-6 py-12 text-center text-sm text-muted-foreground">
                Клієнтів за поточним фільтром не знайдено.
              </div>
            )}
          </div>
        </CardContent>
      </SurfaceCard>
    </DashboardShell>
  );
}
