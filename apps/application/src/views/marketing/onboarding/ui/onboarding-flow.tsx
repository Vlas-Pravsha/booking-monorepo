"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { useAuthAccessToken } from "@/features/auth/session";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";

import { useOnboardingFlowController } from "../model/use-onboarding-flow";
import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingStepContent } from "./onboarding-step-content";

export function OnboardingFlow() {
  const accessToken = useAuthAccessToken();
  const {
    canContinue,
    currentStep,
    draft,
    goToNextStep,
    goToPreviousStep,
    isCompletionStep,
    isReady,
    isSaving,
    patchDraft,
    primaryActionLabel,
    savedRestaurantDomain,
  } = useOnboardingFlowController(accessToken);

  if (!isReady) {
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
          {isCompletionStep ? null : (
            <OnboardingProgress currentStep={currentStep} />
          )}

          <OnboardingStepContent
            currentStep={currentStep}
            draft={draft}
            onPatch={patchDraft}
            savedRestaurantDomain={savedRestaurantDomain}
          />

          {isCompletionStep ? null : (
            <div className="mt-12 flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  await goToNextStep();
                }}
                disabled={!canContinue || isSaving}
              >
                {primaryActionLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
