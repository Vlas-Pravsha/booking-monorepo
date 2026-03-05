"use client";

import {
  Armchair,
  Edit,
  Grid3X3,
  MoreHorizontal,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import * as React from "react";

import { getStatusBadgeClass, getStatusLabel, TABLES } from "@/entities/table";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

function getTableShapeLabel(shape: string): string {
  if (shape === "round") {
    return "Круглий";
  }
  if (shape === "square") {
    return "Квадратний";
  }
  return "Прямокутний";
}

export function TablesPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const setGridView = React.useCallback(() => {
    setViewMode("grid");
  }, []);

  const setListView = React.useCallback(() => {
    setViewMode("list");
  }, []);

  const stats = {
    available: TABLES.filter((t) => t.status === "available").length,
    occupied: TABLES.filter((t) => t.status === "occupied").length,
    reserved: TABLES.filter((t) => t.status === "reserved").length,
    total: TABLES.length,
    totalSeats: TABLES.reduce((sum, t) => sum + t.seats, 0),
  };

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

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <Armchair className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Всього столів</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
                <Grid3X3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted-foreground">Вільних</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 text-amber-600 p-2 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.occupied}</p>
                <p className="text-xs text-muted-foreground">Зайнятих</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
                <Grid3X3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.reserved}</p>
                <p className="text-xs text-muted-foreground">Зарезервовано</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalSeats}</p>
                <p className="text-xs text-muted-foreground">Всього місць</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>План зали</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={setGridView}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={setListView}
              >
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-4">
              {TABLES.map((table) => (
                <div
                  key={table.id}
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105",
                    table.status === "available" &&
                      "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400",
                    table.status === "occupied" &&
                      "border-amber-200 bg-amber-50/50 hover:border-amber-400",
                    table.status === "reserved" &&
                      "border-blue-200 bg-blue-50/50 hover:border-blue-400",
                    table.status === "maintenance" &&
                      "border-red-200 bg-red-50/50 hover:border-red-400"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{table.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Редагувати
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Видалити
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{table.seats} місць</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "mt-2 font-medium text-xs",
                      getStatusBadgeClass(table.status)
                    )}
                  >
                    {getStatusLabel(table.status)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {TABLES.map((table) => (
                <div
                  key={table.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <Armchair className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{table.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {table.seats} місць • {getTableShapeLabel(table.shape)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-medium",
                        getStatusBadgeClass(table.status)
                      )}
                    >
                      {getStatusLabel(table.status)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Редагувати
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Видалити
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
