"use client";

import { Utensils } from "lucide-react";

import { RestaurantIdentitySection } from "@/features/restaurant";

import type { OnboardingStepDraftProps } from "../../model/types";
import { OnboardingStepShell } from "./step-shell";

export function RestaurantInfoStep({
  draft,
  onPatch,
}: OnboardingStepDraftProps) {
  return (
    <OnboardingStepShell
      icon={Utensils}
      title="Про ресторан"
      description="Заповніть основу бренду та контакти, які побачать гості на домені."
    >
      <div className="mx-auto max-w-4xl">
        <RestaurantIdentitySection draft={draft} onPatch={onPatch} />
      </div>
    </OnboardingStepShell>
  );
}
