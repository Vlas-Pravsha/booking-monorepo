"use client";

import { Clock } from "lucide-react";
import * as React from "react";

import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { SurfaceCard } from "@/shared/ui/surface-card";
import { Switch } from "@/shared/ui/switch";

const DAY_LABELS: Record<string, string> = {
  friday: "П'ятниця",
  monday: "Понеділок",
  saturday: "Субота",
  sunday: "Неділя",
  thursday: "Четвер",
  tuesday: "Вівторок",
  wednesday: "Середа",
};

export function ScheduleSettings() {
  const [schedule] = React.useState({
    friday: { close: "23:00", enabled: true, open: "10:00" },
    monday: { close: "22:00", enabled: true, open: "10:00" },
    saturday: { close: "23:00", enabled: true, open: "10:00" },
    sunday: { close: "21:00", enabled: true, open: "11:00" },
    thursday: { close: "22:00", enabled: true, open: "10:00" },
    tuesday: { close: "22:00", enabled: true, open: "10:00" },
    wednesday: { close: "22:00", enabled: true, open: "10:00" },
  });

  return (
    <SurfaceCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Графік роботи
        </CardTitle>
        <CardDescription>
          Налаштування годин роботи для кожного дня
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(schedule).map(([day, { open, close, enabled }]) => (
          <div key={day} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Switch checked={enabled} />
              <span
                className={cn(
                  "w-24 capitalize",
                  !enabled && "text-muted-foreground"
                )}
              >
                {DAY_LABELS[day] ?? day}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                defaultValue={open}
                disabled={!enabled}
                className={cn(surfaceClassNames.mutedInput, "w-28")}
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="time"
                defaultValue={close}
                disabled={!enabled}
                className={cn(surfaceClassNames.mutedInput, "w-28")}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </SurfaceCard>
  );
}
