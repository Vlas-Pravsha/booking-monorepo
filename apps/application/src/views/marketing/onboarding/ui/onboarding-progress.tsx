"use client";

import { Check, CheckCircle2, Clock, Sparkles, Utensils } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { ONBOARDING_STEPS } from "../model/types";

const ONBOARDING_PROGRESS_ITEMS = [
  { ...ONBOARDING_STEPS[0], icon: Sparkles },
  { ...ONBOARDING_STEPS[1], icon: Utensils },
  { ...ONBOARDING_STEPS[2], icon: Sparkles },
  { ...ONBOARDING_STEPS[3], icon: Clock },
  { ...ONBOARDING_STEPS[4], icon: CheckCircle2 },
] as const;

function getProgressWidth(currentStep: number) {
  return `${(currentStep / (ONBOARDING_STEPS.length - 1)) * 100}%`;
}

export function OnboardingProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        {ONBOARDING_PROGRESS_ITEMS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-primary/10 text-primary",
                  !isActive &&
                    !isCompleted &&
                    "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-medium sm:block",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
          style={{ width: getProgressWidth(currentStep) }}
        />
      </div>
    </div>
  );
}
