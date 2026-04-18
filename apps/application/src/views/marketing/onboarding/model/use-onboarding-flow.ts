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
import { isApiError } from "@/shared/api";

import { INITIAL_ONBOARDING_DRAFT, ONBOARDING_STEPS } from "./types";
import type { OnboardingRestaurantDraft } from "./types";

function useOnboardingDraftState(accessToken: string | null) {
  const [draft, replaceDraft] = React.useState<OnboardingRestaurantDraft>(
    INITIAL_ONBOARDING_DRAFT
  );
  const [isReady, setIsReady] = React.useState(false);
  const [savedRestaurantDomain, setSavedRestaurantDomain] = React.useState("");
  const { data: existingRestaurant, isLoading } = useMyRestaurantQuery(
    accessToken,
    Boolean(accessToken)
  );

  React.useEffect(() => {
    if (isLoading || isReady) {
      return;
    }

    if (existingRestaurant) {
      replaceDraft(toRestaurantUpsertPayload(existingRestaurant));
      setSavedRestaurantDomain(existingRestaurant.domain);
    } else {
      replaceDraft(createRestaurantDraft());
    }

    setIsReady(true);
  }, [existingRestaurant, isLoading, isReady]);

  const patchDraft = React.useCallback(
    (patch: Partial<OnboardingRestaurantDraft>) => {
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
    savedRestaurantDomain,
    setSavedRestaurantDomain,
  };
}

function canContinueFromStep(
  currentStep: number,
  draft: OnboardingRestaurantDraft
): boolean {
  if (currentStep === 1) {
    return (
      draft.name.trim().length > 0 &&
      draft.domain.trim().length > 1 &&
      draft.shortDescription.trim().length > 0 &&
      draft.address.trim().length > 0
    );
  }

  if (currentStep === 3) {
    return draft.tables.length > 0;
  }

  return true;
}

function getNextActionLabel(currentStep: number, isSaving: boolean): string {
  if (isSaving) {
    return "Зберігаємо...";
  }

  if (currentStep === ONBOARDING_STEPS.length - 2) {
    return "Завершити";
  }

  return "Далі";
}

async function advanceOnboardingStep(options: {
  currentStep: number;
  draft: OnboardingRestaurantDraft;
  mutateAsync: ReturnType<typeof useUpsertMyRestaurantMutation>["mutateAsync"];
  replaceDraft: React.Dispatch<React.SetStateAction<OnboardingRestaurantDraft>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setSavedRestaurantDomain: (domain: string) => void;
}) {
  const {
    currentStep,
    draft,
    mutateAsync,
    replaceDraft,
    setCurrentStep,
    setSavedRestaurantDomain,
  } = options;

  if (currentStep !== ONBOARDING_STEPS.length - 2) {
    setCurrentStep((step) => step + 1);
    return;
  }

  try {
    const normalizedDraft = normalizeRestaurantUpsertPayload(draft);

    replaceDraft(normalizedDraft);

    const savedRestaurant = await mutateAsync(normalizedDraft);
    setSavedRestaurantDomain(savedRestaurant.domain);
    toast.success("Онбординг збережено");
    setCurrentStep((step) => step + 1);
  } catch (error) {
    toast.error(
      isApiError(error)
        ? error.message
        : "Не вдалося зберегти ресторан. Спробуйте ще раз."
    );
  }
}

export function useOnboardingFlowController(accessToken: string | null) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const onboardingDraftState = useOnboardingDraftState(accessToken);
  const saveDraftMutation = useUpsertMyRestaurantMutation(accessToken);
  const isCompletionStep = currentStep === ONBOARDING_STEPS.length - 1;

  const goToPreviousStep = React.useCallback(() => {
    setCurrentStep((step) => step - 1);
  }, []);

  const goToNextStep = React.useCallback(async () => {
    if (currentStep >= ONBOARDING_STEPS.length - 1) {
      return;
    }

    await advanceOnboardingStep({
      currentStep,
      draft: onboardingDraftState.draft,
      mutateAsync: saveDraftMutation.mutateAsync,
      replaceDraft: onboardingDraftState.replaceDraft,
      setCurrentStep,
      setSavedRestaurantDomain: onboardingDraftState.setSavedRestaurantDomain,
    });
  }, [currentStep, onboardingDraftState, saveDraftMutation.mutateAsync]);

  return {
    canContinue: canContinueFromStep(currentStep, onboardingDraftState.draft),
    currentStep,
    draft: onboardingDraftState.draft,
    goToNextStep,
    goToPreviousStep,
    isCompletionStep,
    isReady: onboardingDraftState.isReady,
    isSaving: saveDraftMutation.isPending,
    patchDraft: onboardingDraftState.patchDraft,
    primaryActionLabel: getNextActionLabel(
      currentStep,
      saveDraftMutation.isPending
    ),
    savedRestaurantDomain: onboardingDraftState.savedRestaurantDomain,
  };
}
