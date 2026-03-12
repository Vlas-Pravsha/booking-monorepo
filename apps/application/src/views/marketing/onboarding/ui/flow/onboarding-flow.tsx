"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

import { useAppSelector } from "@/app/store/hooks";
import {
  applyRestaurantDraftPatch,
  createRestaurantDraft,
  toRestaurantUpsertPayload,
  useMyRestaurantQuery,
  useUpsertMyRestaurantMutation,
} from "@/entities/restaurant";
import { selectAuthSession } from "@/features/auth/session";
import { isApiError } from "@/shared/api";
import { cn } from "@/shared/lib/utils";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";

import { CompletionStep } from "../steps/completion-step";
import { RestaurantInfoStep } from "../steps/restaurant-info-step";
import { ScheduleStep } from "../steps/schedule-step";
import { SiteContentStep } from "../steps/site-content-step";
import { WelcomeStep } from "../steps/welcome-step";
import { ONBOARDING_INITIAL_DATA, ONBOARDING_STEPS } from "../types";
import type { OnboardingData } from "../types";

const STEP_ICONS = [Sparkles, Utensils, Sparkles, Clock, CheckCircle2];

const getCanProceed = (currentStep: number, data: OnboardingData): boolean => {
  if (currentStep === 1) {
    return (
      data.name.trim().length > 0 &&
      data.domain.trim().length > 1 &&
      data.shortDescription.trim().length > 0 &&
      data.address.trim().length > 0
    );
  }

  if (currentStep === 3) {
    return data.tables.length > 0;
  }

  return true;
};

const getNextButtonLabel = (
  currentStep: number,
  isPending: boolean
): string => {
  if (isPending) {
    return "Зберігаємо...";
  }

  if (currentStep === ONBOARDING_STEPS.length - 2) {
    return "Завершити";
  }

  return "Далі";
};

const renderOnboardingStep = (
  currentStep: number,
  data: OnboardingData,
  updateData: (data: Partial<OnboardingData>) => void,
  savedDomain: string
) => {
  switch (currentStep) {
    case 0: {
      return <WelcomeStep />;
    }
    case 1: {
      return <RestaurantInfoStep data={data} updateData={updateData} />;
    }
    case 2: {
      return <SiteContentStep data={data} updateData={updateData} />;
    }
    case 3: {
      return <ScheduleStep data={data} updateData={updateData} />;
    }
    case 4: {
      return <CompletionStep domain={savedDomain || data.domain} />;
    }
    default: {
      return null;
    }
  }
};

const saveOnboardingRestaurant = async (
  data: OnboardingData,
  mutateAsync: ReturnType<typeof useUpsertMyRestaurantMutation>["mutateAsync"],
  setSavedDomain: (domain: string) => void,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const savedRestaurant = await mutateAsync(data);
    setSavedDomain(savedRestaurant.domain);
    toast.success("Онбординг збережено");
    setCurrentStep((previousStep) => previousStep + 1);
  } catch (error) {
    toast.error(
      isApiError(error)
        ? error.message
        : "Не вдалося зберегти ресторан. Спробуйте ще раз."
    );
  }
};

const useOnboardingRestaurantDraft = (accessToken: string | null) => {
  const [data, setData] = React.useState<OnboardingData>(
    ONBOARDING_INITIAL_DATA
  );
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [savedDomain, setSavedDomain] = React.useState("");
  const { data: existingRestaurant, isLoading } = useMyRestaurantQuery(
    accessToken,
    Boolean(accessToken)
  );

  React.useEffect(() => {
    if (isLoading || isInitialized) {
      return;
    }

    if (existingRestaurant) {
      setData(toRestaurantUpsertPayload(existingRestaurant));
      setSavedDomain(existingRestaurant.domain);
    } else {
      setData(createRestaurantDraft());
    }

    setIsInitialized(true);
  }, [existingRestaurant, isInitialized, isLoading]);

  const updateData = React.useCallback((patch: Partial<OnboardingData>) => {
    setData((previousState) => applyRestaurantDraftPatch(previousState, patch));
  }, []);

  return {
    data,
    isInitialized,
    savedDomain,
    setSavedDomain,
    updateData,
  };
};

export function OnboardingFlow() {
  const session = useAppSelector(selectAuthSession);
  const [currentStep, setCurrentStep] = React.useState(0);
  const onboardingDraft = useOnboardingRestaurantDraft(
    session?.accessToken ?? null
  );
  const saveRestaurantMutation = useUpsertMyRestaurantMutation(
    session?.accessToken ?? null
  );
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const handleNext = async () => {
    if (currentStep >= ONBOARDING_STEPS.length - 1) {
      return;
    }

    if (currentStep === ONBOARDING_STEPS.length - 2) {
      await saveOnboardingRestaurant(
        onboardingDraft.data,
        saveRestaurantMutation.mutateAsync,
        onboardingDraft.setSavedDomain,
        setCurrentStep
      );
      return;
    }

    setCurrentStep((previousStep) => previousStep + 1);
  };

  const handleNextClick = () => {
    handleNext();
  };

  if (!onboardingDraft.isInitialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-5 text-sm text-muted-foreground shadow-xl">
          Завантажуємо конфігурацію закладу...
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />

      <FloatingElement className="top-20 left-[10%] h-16 w-16" delay={0}>
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[15%] h-12 w-12" delay={500}>
        <div className="h-12 w-12 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[20%] h-20 w-20" delay={1000}>
        <div className="h-20 w-20 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[10%] h-14 w-14" delay={1500}>
        <div className="h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <header className="relative z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">
            TableReserve
            <span className="text-primary">.com</span>
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          {isLastStep ? null : (
            <div className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                {ONBOARDING_STEPS.map(
                  (step: (typeof ONBOARDING_STEPS)[number], index: number) => {
                    const Icon = STEP_ICONS[index];
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                            isCompleted &&
                              "border-primary bg-primary text-primary-foreground",
                            isActive &&
                              "border-primary bg-primary/10 text-primary",
                            !isActive &&
                              !isCompleted &&
                              "border-muted bg-muted text-muted-foreground"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            Icon && <Icon className="h-5 w-5" />
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
                  }
                )}
              </div>

              <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(currentStep / (ONBOARDING_STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {renderOnboardingStep(
            currentStep,
            onboardingDraft.data,
            onboardingDraft.updateData,
            onboardingDraft.savedDomain
          )}

          {isLastStep ? null : (
            <div className="mt-12 flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  setCurrentStep((previousStep) => previousStep - 1)
                }
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={
                  !getCanProceed(currentStep, onboardingDraft.data) ||
                  saveRestaurantMutation.isPending
                }
              >
                {getNextButtonLabel(
                  currentStep,
                  saveRestaurantMutation.isPending
                )}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
