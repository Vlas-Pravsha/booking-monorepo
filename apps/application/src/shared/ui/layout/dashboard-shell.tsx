"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn("relative min-h-full space-y-8", className)}>
      {children}
    </div>
  );
}
