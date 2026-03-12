import { createRestaurantDraft } from "@/entities/restaurant";
import type { RestaurantUpsertPayload } from "@/entities/restaurant";

export type OnboardingData = RestaurantUpsertPayload;

export const ONBOARDING_INITIAL_DATA: OnboardingData = createRestaurantDraft();

export const ONBOARDING_STEPS = [
  { id: 0, title: "Вітання" },
  { id: 1, title: "Про ресторан" },
  { id: 2, title: "Контент" },
  { id: 3, title: "Графік" },
  { id: 4, title: "Готово" },
] as const;
