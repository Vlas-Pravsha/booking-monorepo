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

import { cn } from "@/shared/lib/utils";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";

import { CompletionStep } from "../steps/completion-step";
import { RestaurantInfoStep } from "../steps/restaurant-info-step";
import { ScheduleStep } from "../steps/schedule-step";
import { WelcomeStep } from "../steps/welcome-step";
import { ONBOARDING_INITIAL_DATA, ONBOARDING_STEPS } from "../types";
import type { OnboardingData } from "../types";

const STEP_ICONS = [Sparkles, Utensils, Clock, CheckCircle2];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [data, setData] = React.useState<OnboardingData>(
    ONBOARDING_INITIAL_DATA
  );

  const updateData = (newData: Partial<OnboardingData>): void => {
    setData((prev: OnboardingData) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        return data.restaurantName.trim().length > 0;
      }
      case 2: {
        return data.tables.length > 0;
      }
      default: {
        return true;
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: {
        return <WelcomeStep />;
      }
      case 1: {
        return <RestaurantInfoStep data={data} updateData={updateData} />;
      }
      case 2: {
        return <ScheduleStep data={data} updateData={updateData} />;
      }
      case 3: {
        return <CompletionStep restaurantName={data.restaurantName} />;
      }
      default: {
        return null;
      }
    }
  };

  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

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
        <div className="w-full max-w-2xl">
          {!isLastStep && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
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
                            "mt-2 text-xs font-medium hidden sm:block",
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

              <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(currentStep / (ONBOARDING_STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {renderStep()}

          {!isLastStep && (
            <div className="mt-12 flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === ONBOARDING_STEPS.length - 2
                  ? "Завершити"
                  : "Далі"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
