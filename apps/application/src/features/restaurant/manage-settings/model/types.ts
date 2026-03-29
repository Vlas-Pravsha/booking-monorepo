import type { RestaurantUpsertPayload } from "@/entities/restaurant";

export interface RestaurantDraftSectionProps {
  draft: RestaurantUpsertPayload;
  onPatch: (patch: Partial<RestaurantUpsertPayload>) => void;
}
