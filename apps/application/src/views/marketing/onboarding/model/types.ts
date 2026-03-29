import { createRestaurantDraft } from "@/entities/restaurant";
import type { RestaurantUpsertPayload } from "@/entities/restaurant";

export type OnboardingRestaurantDraft = RestaurantUpsertPayload;
export interface OnboardingStepDraftProps {
  draft: OnboardingRestaurantDraft;
  onPatch: (patch: Partial<OnboardingRestaurantDraft>) => void;
}

export const INITIAL_ONBOARDING_DRAFT: OnboardingRestaurantDraft =
  createRestaurantDraft();

export const ONBOARDING_STEPS = [
  { id: 0, title: "Вітання" },
  { id: 1, title: "Про ресторан" },
  { id: 2, title: "Контент" },
  { id: 3, title: "Графік" },
  { id: 4, title: "Готово" },
] as const;
