"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  applyRestaurantDraftPatch,
  createRestaurantDraft,
  normalizeRestaurantUpsertPayload,
  toRestaurantUpsertPayload,
  useMyRestaurantQuery,
  useUpsertMyRestaurantMutation,
} from "@/entities/restaurant";
import type { RestaurantUpsertPayload } from "@/entities/restaurant";
import { useAuthAccessToken } from "@/features/auth/session";
import {
  countEnabledSiteSections,
  countSiteContentItems,
} from "@/features/restaurant";
import { isApiError } from "@/shared/api";

function useRestaurantDraftState(accessToken: string | null) {
  const [draft, replaceDraft] = React.useState<RestaurantUpsertPayload>(
    createRestaurantDraft()
  );
  const [isReady, setIsReady] = React.useState(false);
  const { data: restaurant, isLoading } = useMyRestaurantQuery(
    accessToken,
    Boolean(accessToken)
  );

  React.useEffect(() => {
    if (isLoading || isReady) {
      return;
    }

    replaceDraft(
      restaurant
        ? toRestaurantUpsertPayload(restaurant)
        : createRestaurantDraft()
    );
    setIsReady(true);
  }, [isLoading, isReady, restaurant]);

  const patchDraft = React.useCallback(
    (patch: Partial<RestaurantUpsertPayload>) => {
      replaceDraft((currentDraft) =>
        applyRestaurantDraftPatch(currentDraft, patch)
      );
    },
    []
  );

  return {
    draft,
    isReady,
    patchDraft,
    replaceDraft,
  };
}

export function useAdminSettingsPage() {
  const accessToken = useAuthAccessToken();
  const restaurantDraftState = useRestaurantDraftState(accessToken);
  const saveDraftMutation = useUpsertMyRestaurantMutation(accessToken);
  const enabledSiteSectionCount = countEnabledSiteSections(
    restaurantDraftState.draft
  );
  const siteContentItemCount = countSiteContentItems(
    restaurantDraftState.draft
  );
  const saveDraft = React.useCallback(() => {
    const normalizedPayload = normalizeRestaurantUpsertPayload(
      restaurantDraftState.draft
    );

    restaurantDraftState.replaceDraft(normalizedPayload);

    saveDraftMutation.mutate(normalizedPayload, {
      onError: (error) => {
        toast.error(
          isApiError(error)
            ? error.message
            : "Не вдалося зберегти налаштування. Спробуйте ще раз."
        );
      },
      onSuccess: (savedRestaurant) => {
        restaurantDraftState.replaceDraft(
          toRestaurantUpsertPayload(savedRestaurant)
        );
        toast.success("Налаштування збережено");
      },
    });
  }, [restaurantDraftState, saveDraftMutation]);

  return {
    draft: restaurantDraftState.draft,
    enabledSiteSectionCount,
    isReady: restaurantDraftState.isReady,
    isSaving: saveDraftMutation.isPending,
    patchDraft: restaurantDraftState.patchDraft,
    saveDraft,
    siteContentItemCount,
  };
}
