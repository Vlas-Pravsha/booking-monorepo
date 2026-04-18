"use client";

import type { LucideIcon } from "lucide-react";
import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Switch } from "@/shared/ui/switch";

interface SiteContentStatisticCardProps {
  icon: LucideIcon;
  label: string;
  status: "active" | "optional";
  value: string;
}

export function SiteContentStatisticCard({
  icon: Icon,
  label,
  status,
  value,
}: SiteContentStatisticCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-border/60 bg-muted/20 p-4">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-background">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
      <Badge
        variant={status === "active" ? "default" : "secondary"}
        className="mt-3"
      >
        {status === "active" ? "Активно" : "За потреби"}
      </Badge>
    </div>
  );
}

interface SiteContentEditorPanelProps {
  children: ReactNode;
  countLabel: string;
  description: string;
  emptyStateDescription: string;
  icon: LucideIcon;
  isEnabled: boolean;
  itemCount: number;
  onEnabledChange: (isEnabled: boolean) => void;
  title: string;
}

export function SiteContentEditorPanel({
  children,
  countLabel,
  description,
  emptyStateDescription,
  icon: Icon,
  isEnabled,
  itemCount,
  onEnabledChange,
  title,
}: SiteContentEditorPanelProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/70">
      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Badge variant={isEnabled ? "default" : "secondary"}>
                {isEnabled ? `${itemCount} ${countLabel}` : "Вимкнено"}
              </Badge>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3">
          <div className="text-right">
            <p className="text-sm font-medium">
              {isEnabled ? "Показувати на сайті" : "Не показувати"}
            </p>
            <p className="text-xs text-muted-foreground">
              Перемикається незалежно від інших блоків
            </p>
          </div>
          <Switch checked={isEnabled} onCheckedChange={onEnabledChange} />
        </div>
      </div>

      <Separator />

      {isEnabled ? (
        <div className="space-y-6 p-5">{children}</div>
      ) : (
        <div className="p-5 text-sm text-muted-foreground">
          {emptyStateDescription}
        </div>
      )}
    </div>
  );
}

export function SiteContentEmptyState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-border/60 bg-muted/20 p-5">
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function ReviewRatingSelector({
  onChange,
  value,
}: {
  onChange: (nextValue: number) => void;
  value: number;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;

        return (
          <Button
            key={`rating-${String(ratingValue)}`}
            type="button"
            size="sm"
            variant={ratingValue <= value ? "default" : "outline"}
            onClick={() => onChange(ratingValue)}
          >
            <Star
              className={`mr-2 h-4 w-4 ${
                ratingValue <= value ? "fill-current" : ""
              }`}
            />
            {ratingValue}
          </Button>
        );
      })}
    </div>
  );
}
