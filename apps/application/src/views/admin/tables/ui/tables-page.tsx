"use client";

import {
  AdminPageLoadingState,
  AdminRefreshButton,
  MissingRestaurantState,
  SampleDataNotice,
} from "@/shared/ui/admin";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";

import { useTablesPage } from "../model/use-tables-page";
import { TableGridItem } from "./components/table-grid-item";
import { TableListItem } from "./components/table-list-item";
import { TableViewModeToggle } from "./components/table-view-mode-toggle";
import { TablesStats } from "./components/tables-stats";

export function AdminTablesPage() {
  const pageData = useTablesPage();

  if (pageData.isLoading) {
    return (
      <DashboardShell>
        <AdminPageLoadingState message="Завантажуємо план залу..." />
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
        eyebrow="План зали"
        title="Столи"
        subtitle="Стани столів будуються з реального плану залу, бронювань і технічного статусу."
        insights={[
          {
            label: "Всього столів",
            tone: "primary",
            value: `${pageData.stats.total} позицій`,
          },
          {
            label: "Готові до посадки",
            tone: "success",
            value: `${pageData.stats.available} вільних`,
          },
          {
            label: "Місткість",
            tone: "info",
            value: `${pageData.stats.totalSeats} місць загалом`,
          },
        ]}
        action={
          <AdminRefreshButton
            onClick={() => pageData.refreshTables()}
            disabled={pageData.isRefreshing}
            label="Оновити план"
          />
        }
      />

      {pageData.tablesQuery.data?.hasSampleData ? <SampleDataNotice /> : null}

      <TablesStats stats={pageData.stats} />

      <SurfaceCard>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">План зали</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Перемикайтеся між grid і list view для швидкого контролю
                простору.
              </p>
            </div>
            <TableViewModeToggle
              viewMode={pageData.viewMode}
              onSetGrid={() => pageData.setViewMode("grid")}
              onSetList={() => pageData.setViewMode("list")}
            />
          </div>
        </CardHeader>

        <CardContent>
          {pageData.viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pageData.tables.map((table) => (
                <TableGridItem key={table.id} table={table} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {pageData.tables.map((table) => (
                <TableListItem key={table.id} table={table} />
              ))}
            </div>
          )}
        </CardContent>
      </SurfaceCard>
    </DashboardShell>
  );
}
