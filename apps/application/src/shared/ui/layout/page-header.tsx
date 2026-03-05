"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        className
      )}
    >
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          {title}
          <span className="bg-linear-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            .
          </span>
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
