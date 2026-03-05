"use client";

import * as React from "react";

import { OnboardingFlow } from "./flow/onboarding-flow";

export function OnboardingPage() {
  return (
    <div className="selection:bg-primary selection:text-primary-foreground flex min-h-screen flex-col">
      <OnboardingFlow />
    </div>
  );
}
