"use client";

import type { OnboardingRestaurantDraft } from "../model/types";
import { CompletionStep } from "./steps/completion-step";
import { RestaurantInfoStep } from "./steps/restaurant-info-step";
import { ScheduleStep } from "./steps/schedule-step";
import { SiteContentStep } from "./steps/site-content-step";
import { WelcomeStep } from "./steps/welcome-step";

interface OnboardingStepContentProps {
  currentStep: number;
  draft: OnboardingRestaurantDraft;
  onPatch: (patch: Partial<OnboardingRestaurantDraft>) => void;
  savedRestaurantDomain: string;
}

export function OnboardingStepContent({
  currentStep,
  draft,
  onPatch,
  savedRestaurantDomain,
}: OnboardingStepContentProps) {
  switch (currentStep) {
    case 0: {
      return <WelcomeStep />;
    }
    case 1: {
      return <RestaurantInfoStep draft={draft} onPatch={onPatch} />;
    }
    case 2: {
      return <SiteContentStep draft={draft} onPatch={onPatch} />;
    }
    case 3: {
      return <ScheduleStep draft={draft} onPatch={onPatch} />;
    }
    case 4: {
      return <CompletionStep domain={savedRestaurantDomain || draft.domain} />;
    }
    default: {
      return null;
    }
  }
}
