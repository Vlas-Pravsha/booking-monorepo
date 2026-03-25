"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  applyRestaurantDraftPatch,
  createRestaurantDraft,
  toRestaurantUpsertPayload,
  useMyRestaurantQuery,
  useUpsertMyRestaurantMutation,
} from "@/entities/restaurant";
import type { RestaurantUpsertPayload } from "@/entities/restaurant";
import { isApiError } from "@/shared/api";
import { useAdminAccessToken } from "@/views/admin/shared";

function useRestaurantSettingsForm(accessToken: string | null) {
  const [formData, setFormData] = React.useState<RestaurantUpsertPayload>(
    createRestaurantDraft()
  );
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { data: restaurant, isLoading } = useMyRestaurantQuery(
    accessToken,
    Boolean(accessToken)
  );

  React.useEffect(() => {
    if (isLoading || isInitialized) {
      return;
    }

    setFormData(
      restaurant
        ? toRestaurantUpsertPayload(restaurant)
        : createRestaurantDraft()
    );
    setIsInitialized(true);
  }, [isInitialized, isLoading, restaurant]);

  const updateFormData = React.useCallback(
    (patch: Partial<RestaurantUpsertPayload>) => {
      setFormData((previousState) =>
        applyRestaurantDraftPatch(previousState, patch)
      );
    },
    []
  );

  return {
    formData,
    isInitialized,
    setFormData,
    updateFormData,
  };
}

export function useAdminSettingsPage() {
  const accessToken = useAdminAccessToken();
  const settingsForm = useRestaurantSettingsForm(accessToken);
  const saveMutation = useUpsertMyRestaurantMutation(accessToken);
  const enabledSectionsCount = React.useMemo(
    () =>
      [
        settingsForm.formData.showGallery,
        settingsForm.formData.showMenu,
        settingsForm.formData.showReviews,
      ].filter(Boolean).length,
    [
      settingsForm.formData.showGallery,
      settingsForm.formData.showMenu,
      settingsForm.formData.showReviews,
    ]
  );
  const contentItemsCount = React.useMemo(
    () =>
      settingsForm.formData.menuHighlights.length +
      settingsForm.formData.gallery.length +
      settingsForm.formData.reviews.length,
    [
      settingsForm.formData.gallery.length,
      settingsForm.formData.menuHighlights.length,
      settingsForm.formData.reviews.length,
    ]
  );
  const handleSave = React.useCallback(() => {
    saveMutation.mutate(settingsForm.formData, {
      onError: (error) => {
        toast.error(
          isApiError(error)
            ? error.message
            : "Не вдалося зберегти налаштування. Спробуйте ще раз."
        );
      },
      onSuccess: (savedRestaurant) => {
        settingsForm.setFormData(toRestaurantUpsertPayload(savedRestaurant));
        toast.success("Налаштування збережено");
      },
    });
  }, [saveMutation, settingsForm]);

  return {
    contentItemsCount,
    enabledSectionsCount,
    formData: settingsForm.formData,
    handleFormChange: settingsForm.updateFormData,
    handleSave,
    isInitialized: settingsForm.isInitialized,
    isSaving: saveMutation.isPending,
  };
}
