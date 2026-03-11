import type { ComponentType, ReactNode } from "react";

import type { SemanticTone } from "@/shared/config";
import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

import { CardContent } from "../card";
import { SurfaceCard } from "../surface-card";

export interface SummaryStatItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tone?: SemanticTone;
  value: ReactNode;
}

interface SummaryStatsGridProps {
  items: readonly SummaryStatItem[];
  className?: string;
  columnsClassName?: string;
}

export function SummaryStatsGrid({
  items,
  className,
  columnsClassName = "md:grid-cols-4",
}: SummaryStatsGridProps) {
  return (
    <div className={cn("grid gap-4", columnsClassName, className)}>
      {items.map((item) => {
        const tone = semanticToneStyles[item.tone ?? "primary"];

        return (
          <SurfaceCard interactive key={item.label}>
            <CardContent className="relative p-5">
              <div
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </span>
                  <p className="admin-display text-3xl font-semibold leading-none text-foreground">
                    {item.value}
                  </p>
                  <div
                    className={cn("h-1.5 w-16 rounded-full", tone.progress)}
                  />
                </div>

                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-[20px]",
                    tone.icon
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
