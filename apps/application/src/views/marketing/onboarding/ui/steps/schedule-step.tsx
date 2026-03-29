"use client";

import { Clock } from "lucide-react";

import { RestaurantOperationsSection } from "@/features/restaurant";

import type { OnboardingStepDraftProps } from "../../model/types";
import { OnboardingStepShell } from "./step-shell";

export function ScheduleStep({ draft, onPatch }: OnboardingStepDraftProps) {
  return (
    <OnboardingStepShell
      icon={Clock}
      title="Налаштування залу"
      description="Визначте час роботи та конфігурацію столів."
    >
      <div className="mx-auto max-w-4xl">
        <RestaurantOperationsSection draft={draft} onPatch={onPatch} />
      </div>
    </OnboardingStepShell>
  );
}
