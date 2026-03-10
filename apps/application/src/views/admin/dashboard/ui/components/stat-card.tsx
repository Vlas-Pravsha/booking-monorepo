import { TrendingUp } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import type { StatCardItem } from "../../model/types";

interface StatCardProps {
  item: StatCardItem;
  className?: string;
}

export function StatCard({ item, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-none bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {item.title}
        </CardTitle>
        <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
          <item.icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-foreground">{item.value}</div>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        {item.trend && item.trendValue && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs mt-3 font-medium",
              item.trend === "up" && "text-emerald-600",
              item.trend === "down" && "text-red-600",
              item.trend === "neutral" && "text-muted-foreground"
            )}
          >
            <TrendingUp
              className={cn("h-3 w-3", item.trend === "down" && "rotate-180")}
            />
            <span>{item.trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
