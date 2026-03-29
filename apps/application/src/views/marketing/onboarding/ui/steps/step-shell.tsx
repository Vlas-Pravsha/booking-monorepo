"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface OnboardingStepShellProps {
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  title: string;
}

export function OnboardingStepShell({
  children,
  description,
  icon: Icon,
  title,
}: OnboardingStepShellProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {children}
    </div>
  );
}
