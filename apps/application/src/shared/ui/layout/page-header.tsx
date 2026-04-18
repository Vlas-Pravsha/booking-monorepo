"use client";

import * as React from "react";

import type { SemanticTone } from "@/shared/config";
import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

interface HeaderInsight {
  label: string;
  tone?: SemanticTone;
  value: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  eyebrow?: string;
  insights?: readonly HeaderInsight[];
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  eyebrow,
  insights = [],
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 space-y-8", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4 max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border/20">
              {eyebrow}
            </span>
          )}

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base text-muted-foreground/80 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {action && <div className="flex shrink-0 lg:pb-1">{action}</div>}
      </div>

      {insights.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <div
              key={`${insight.label}-${insight.value}`}
              className={cn(
                "rounded-xl border bg-card p-5 shadow-sm",
                semanticToneStyles[insight.tone ?? "neutral"].card
              )}
            >
              <p className="text-xs font-medium text-muted-foreground">
                {insight.label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                {insight.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
