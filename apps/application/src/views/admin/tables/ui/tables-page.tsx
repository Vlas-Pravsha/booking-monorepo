"use client";

import { Plus } from "lucide-react";
import * as React from "react";

import { useTablesQuery } from "@/entities/table";
import { surfaceClassNames } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";

import { getTableStats } from "../lib/get-table-stats";
import type { ViewMode } from "../model/types";
import { TableGridItem } from "./components/table-grid-item";
import { TableListItem } from "./components/table-list-item";
import { TableViewModeToggle } from "./components/table-view-mode-toggle";
import { TablesStats } from "./components/tables-stats";

export function AdminTablesPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const { data: tables = [] } = useTablesQuery();

  const stats = React.useMemo(() => getTableStats(tables), [tables]);

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="План зали"
        title="Столи"
        subtitle="План залу, доступність і стани столиків у зручному візуальному форматі."
        insights={[
          {
            label: "Всього столів",
            tone: "primary",
            value: `${stats.total} позицій`,
          },
          {
            label: "Готові до посадки",
            tone: "success",
            value: `${stats.available} вільних`,
          },
          {
            label: "Місткість",
            tone: "info",
            value: `${stats.totalSeats} місць загалом`,
          },
        ]}
        action={
          <Button className={surfaceClassNames.actionButton}>
            <Plus className="h-4 w-4" />
            Додати стіл
          </Button>
        }
      />

      <TablesStats stats={stats} />

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
              {tables.map((table) => (
                <TableGridItem key={table.id} table={table} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {tables.map((table) => (
                <TableListItem key={table.id} table={table} />
              ))}
            </div>
          )}
        </CardContent>
      </SurfaceCard>
    </DashboardShell>
  );
}
