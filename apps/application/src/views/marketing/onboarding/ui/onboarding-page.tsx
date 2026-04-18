"use client";

import { AuthGuard } from "@/features/auth/session";

import { OnboardingFlow } from "./onboarding-flow";

export function OnboardingPage() {
  return (
    <AuthGuard mode="protected">
      <div className="selection:bg-primary selection:text-primary-foreground flex min-h-screen flex-col">
        <OnboardingFlow />
      </div>
    </AuthGuard>
  );
}
