"use client";

import { Filter, Search } from "lucide-react";

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
  AdminInlineEmptyState,
  AdminPageLoadingState,
  AdminRefreshButton,
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared";

import { useCustomersPage } from "../model/use-customers-page";
import { CustomerRow } from "./components/customer-row";
import { CustomersStats } from "./components/customers-stats";
import { TagFilterItem } from "./components/tag-filter-item";

export function AdminCustomersPage() {
  const pageData = useCustomersPage();

  if (pageData.isLoading) {
    return (
      <DashboardShell>
        <AdminPageLoadingState message="Завантажуємо клієнтську базу..." />
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
          <AdminRefreshButton
            onClick={() => pageData.refreshCustomers()}
            disabled={pageData.isRefreshing}
            label="Оновити базу"
          />
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
                value={pageData.searchQuery}
                onChange={(event) =>
                  pageData.setSearchQuery(event.target.value)
                }
                className={cn(surfaceClassNames.mutedInput, "pl-10")}
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-full">
                    <Filter className="h-4 w-4" />
                    {pageData.tagFilter === "all"
                      ? "Всі теги"
                      : pageData.tagFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => pageData.setTagFilter("all")}
                  >
                    Всі теги
                  </DropdownMenuItem>
                  {pageData.allTags.map((tag) => (
                    <TagFilterItem
                      key={tag}
                      tag={tag}
                      onSelect={(selectedTag) =>
                        pageData.setTagFilter(selectedTag)
                      }
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
              <AdminInlineEmptyState message="Клієнтів за поточним фільтром не знайдено." />
            )}
          </div>
        </CardContent>
      </SurfaceCard>
    </DashboardShell>
  );
}
