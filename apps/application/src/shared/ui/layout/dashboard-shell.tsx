"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";

export interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      <AnimatedBackground />

      <FloatingElement className="top-40 right-[10%] h-8 w-8" delay={400}>
        <div className="h-8 w-8 rotate-45 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>

      <div className="relative z-10 space-y-8">{children}</div>
    </div>
  );
}
