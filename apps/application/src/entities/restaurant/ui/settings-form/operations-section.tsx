"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { RestaurantTable } from "../../model/types";
import type { RestaurantSettingsSectionProps } from "./helpers";
import { buildEmptyTable, cloneTables, removeItemAtIndex } from "./helpers";
import { SettingsSectionCard } from "./settings-section-card";

export function RestaurantOperationsSection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  const updateTable = <T extends keyof RestaurantTable>(
    index: number,
    key: T,
    nextValue: RestaurantTable[T]
  ) => {
    const nextTables = cloneTables(value.tables);
    const currentTable = nextTables[index];

    if (!currentTable) {
      return;
    }

    nextTables[index] = {
      ...currentTable,
      [key]: nextValue,
    };

    onChange({ tables: nextTables });
  };

  return (
    <SettingsSectionCard
      title="Графік і бронювання"
      description="Робочі години, середня тривалість візиту та базова конфігурація столів."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-opening-time">Відкриття</Label>
          <Input
            id="restaurant-opening-time"
            type="time"
            value={value.openingTime}
            onChange={(event) => onChange({ openingTime: event.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-closing-time">Закриття</Label>
          <Input
            id="restaurant-closing-time"
            type="time"
            value={value.closingTime}
            onChange={(event) => onChange({ closingTime: event.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-average-duration">
            Середня тривалість, хв
          </Label>
          <Input
            id="restaurant-average-duration"
            type="number"
            min={30}
            max={360}
            value={String(value.averageDuration)}
            onChange={(event) =>
              onChange({
                averageDuration: Number(
                  event.target.value || value.averageDuration
                ),
              })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Столи</p>
            <p className="text-sm text-muted-foreground">
              Це допомагає не лише онбордингу, а й підсилює довіру до продукту.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onChange({
                tables: [...value.tables, buildEmptyTable(value.tables.length)],
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Додати стіл
          </Button>
        </div>

        <div className="space-y-3">
          {value.tables.map((table, index) => (
            <div
              key={`${table.name}-${String(index)}`}
              className="grid gap-3 rounded-2xl border border-border/60 p-3 md:grid-cols-[1fr_180px_44px]"
            >
              <Input
                value={table.name}
                onChange={(event) =>
                  updateTable(index, "name", event.target.value)
                }
                placeholder="Назва столу"
              />
              <Input
                type="number"
                min={1}
                max={20}
                value={String(table.seats)}
                onChange={(event) =>
                  updateTable(index, "seats", Number(event.target.value || 1))
                }
                placeholder="К-сть місць"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  onChange({
                    tables: removeItemAtIndex(value.tables, index),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </SettingsSectionCard>
  );
}
