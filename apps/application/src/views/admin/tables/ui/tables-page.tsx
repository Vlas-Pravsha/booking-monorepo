"use client";

import { Plus } from "lucide-react";
import * as React from "react";

import { TABLES } from "@/entities/table";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

import { getTableStats } from "../lib/get-table-stats";
import type { ViewMode } from "../model/types";
import { TableGridItem } from "./components/table-grid-item";
import { TableListItem } from "./components/table-list-item";
import { TableViewModeToggle } from "./components/table-view-mode-toggle";
import { TablesStats } from "./components/tables-stats";

export function AdminTablesPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  const stats = React.useMemo(() => getTableStats(TABLES), []);

  const setGridView = React.useCallback(() => {
    setViewMode("grid");
  }, []);

  const setListView = React.useCallback(() => {
    setViewMode("list");
  }, []);

  return (
    <DashboardShell>
      <PageHeader
        title="Столи"
        subtitle="Управління столиками закладу"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <Plus className="h-4 w-4" />
            Додати стіл
          </Button>
        }
      />

      <TablesStats stats={stats} />

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>План зали</CardTitle>
            <TableViewModeToggle
              viewMode={viewMode}
              onSetGrid={setGridView}
              onSetList={setListView}
            />
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-4">
              {TABLES.map((table) => (
                <TableGridItem key={table.id} table={table} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {TABLES.map((table) => (
                <TableListItem key={table.id} table={table} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
