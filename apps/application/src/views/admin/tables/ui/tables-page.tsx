"use client";

import { RefreshCw } from "lucide-react";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useTablesQuery } from "@/entities/table";
import { selectAuthSession } from "@/features/auth/session";
import { surfaceClassNames } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";
import {
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared/ui/data-state-cards";

import { getTableStats } from "../lib/get-table-stats";
import type { ViewMode } from "../model/types";
import { TableGridItem } from "./components/table-grid-item";
import { TableListItem } from "./components/table-list-item";
import { TableViewModeToggle } from "./components/table-view-mode-toggle";
import { TablesStats } from "./components/tables-stats";

const EMPTY_TABLES: never[] = [];

function useTablesPageData(accessToken: string | null) {
  const tablesQuery = useTablesQuery(accessToken);
  const tables = tablesQuery.data?.tables ?? EMPTY_TABLES;
  const restaurant = tablesQuery.data?.restaurant ?? null;
  const stats = React.useMemo(() => getTableStats(tables), [tables]);

  return { restaurant, stats, tables, tablesQuery };
}

export function AdminTablesPage() {
  const session = useAppSelector(selectAuthSession);
  const accessToken = session?.accessToken ?? null;
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const pageData = useTablesPageData(accessToken);

  if (pageData.tablesQuery.isLoading) {
    return (
      <DashboardShell>
        <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 text-sm text-muted-foreground shadow-xl">
          Завантажуємо план залу...
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
          <Button
            className={surfaceClassNames.actionButton}
            onClick={() => {
              pageData.tablesQuery.refetch();
            }}
            disabled={pageData.tablesQuery.isFetching}
          >
            <RefreshCw className="h-4 w-4" />
            Оновити план
          </Button>
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
              viewMode={viewMode}
              onSetGrid={() => setViewMode("grid")}
              onSetList={() => setViewMode("list")}
            />
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === "grid" ? (
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
