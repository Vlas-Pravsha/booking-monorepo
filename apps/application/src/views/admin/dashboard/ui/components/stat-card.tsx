import { TrendingUp } from "lucide-react";

import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { SurfaceCard } from "@/shared/ui/surface-card";

import type { StatCardItem } from "../../model/types";

interface StatCardProps {
  item: StatCardItem;
  className?: string;
}

const getTrendTone = (trend: StatCardItem["trend"]) => {
  if (trend === "up") {
    return semanticToneStyles.success;
  }

  if (trend === "down") {
    return semanticToneStyles.danger;
  }

  return semanticToneStyles.neutral;
};

export function StatCard({ item, className }: StatCardProps) {
  const trendTone = getTrendTone(item.trend);
  let iconTone = "bg-primary/10 text-primary";

  if (item.trend === "up") {
    iconTone = "bg-success/10 text-success";
  }

  if (item.trend === "down") {
    iconTone = "bg-danger/10 text-danger";
  }

  return (
    <SurfaceCard interactive className={className}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {item.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
            iconTone
          )}
        >
          <item.icon className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-foreground">{item.value}</div>
        {item.trend && item.trendValue && (
          <div
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
              trendTone.badge
            )}
          >
            <TrendingUp
              className={cn(
                "h-3.5 w-3.5",
                item.trend === "down" && "rotate-180"
              )}
            />
            <span>{item.trendValue}</span>
          </div>
        )}
      </CardContent>
    </SurfaceCard>
  );
}
