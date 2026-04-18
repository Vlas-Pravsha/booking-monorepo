"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { RestaurantDraftSectionProps } from "../model/types";
import { useRestaurantTablesController } from "../model/use-restaurant-tables";
import { SettingsSectionCard } from "./settings-section-card";

export function RestaurantOperationsSection({
  draft,
  onPatch,
}: RestaurantDraftSectionProps) {
  const { addTable, patchTable, removeTable } = useRestaurantTablesController(
    draft.tables,
    (tables) => onPatch({ tables })
  );

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
            value={draft.openingTime}
            onChange={(event) => onPatch({ openingTime: event.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-closing-time">Закриття</Label>
          <Input
            id="restaurant-closing-time"
            type="time"
            value={draft.closingTime}
            onChange={(event) => onPatch({ closingTime: event.target.value })}
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
            value={String(draft.averageDuration)}
            onChange={(event) =>
              onPatch({
                averageDuration: Number(
                  event.target.value || draft.averageDuration
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
          <Button type="button" variant="outline" onClick={addTable}>
            <Plus className="mr-2 h-4 w-4" />
            Додати стіл
          </Button>
        </div>

        <div className="space-y-3">
          {draft.tables.map((table, index) => (
            <div
              key={`${table.name}-${String(index)}`}
              className="grid gap-3 rounded-2xl border border-border/60 p-3 md:grid-cols-[1fr_180px_44px]"
            >
              <Input
                value={table.name}
                onChange={(event) =>
                  patchTable(index, { name: event.target.value })
                }
                placeholder="Назва столу"
              />
              <Input
                type="number"
                min={1}
                max={20}
                value={String(table.seats)}
                onChange={(event) =>
                  patchTable(index, {
                    seats: Number(event.target.value || 1),
                  })
                }
                placeholder="К-сть місць"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeTable(index)}
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
