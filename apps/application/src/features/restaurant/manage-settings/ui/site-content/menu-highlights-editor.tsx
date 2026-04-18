"use client";

import { Trash2, UtensilsCrossed } from "lucide-react";

import type { RestaurantMenuDraft } from "@/entities/restaurant";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import { useMenuHighlightsController } from "../../model/use-site-content";
import { MenuHighlightPreviewCards } from "./previews";
import { SiteContentEditorPanel } from "./primitives";

interface MenuHighlightsEditorProps {
  isEnabled: boolean;
  menuHighlights: RestaurantMenuDraft[];
  onEnabledChange: (isEnabled: boolean) => void;
  onMenuHighlightsChange: (menuHighlights: RestaurantMenuDraft[]) => void;
}

export function MenuHighlightsEditor({
  isEnabled,
  menuHighlights,
  onEnabledChange,
  onMenuHighlightsChange,
}: MenuHighlightsEditorProps) {
  const { addMenuHighlight, patchMenuHighlight, removeMenuHighlight } =
    useMenuHighlightsController(menuHighlights, onMenuHighlightsChange);

  return (
    <SiteContentEditorPanel
      title="Хіти меню"
      icon={UtensilsCrossed}
      isEnabled={isEnabled}
      itemCount={menuHighlights.length}
      countLabel="позицій"
      description="Замість перевантаженого каталогу тут краще залишити кілька сильних хітів: назва, короткий опис і ціна."
      emptyStateDescription="Секція меню прихована. Увімкніть її, коли будете готові показати найсильніші позиції."
      onEnabledChange={onEnabledChange}
    >
      <MenuHighlightPreviewCards menuHighlights={menuHighlights} />

      <div className="space-y-3">
        {menuHighlights.map((menuHighlight, index) => (
          <div
            key={`${menuHighlight.name}-${String(index)}`}
            className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Позиція меню {index + 1}</p>
                <p className="text-sm text-muted-foreground">
                  Гість спершу бачить назву, суть страви і ціну.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeMenuHighlight(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_11rem]">
              <Input
                value={menuHighlight.name}
                onChange={(event) =>
                  patchMenuHighlight(index, { name: event.target.value })
                }
                placeholder="Назва страви"
              />
              <Input
                type="number"
                min={0}
                value={String(menuHighlight.price)}
                onChange={(event) =>
                  patchMenuHighlight(index, {
                    price: Number(event.target.value || 0),
                  })
                }
                placeholder="Ціна"
              />
            </div>
            <Textarea
              value={menuHighlight.description}
              onChange={(event) =>
                patchMenuHighlight(index, { description: event.target.value })
              }
              placeholder="Коротко поясніть, чим ця страва запам'ятовується."
              className="mt-3 min-h-24"
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addMenuHighlight}
        >
          <UtensilsCrossed className="mr-2 h-4 w-4" />
          Додати позицію меню
        </Button>
      </div>
    </SiteContentEditorPanel>
  );
}
