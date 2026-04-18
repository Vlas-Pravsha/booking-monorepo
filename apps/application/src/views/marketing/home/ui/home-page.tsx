"use client";

import dynamic from "next/dynamic";
import * as React from "react";

import { MarketingFooter, MarketingHeader } from "@/widgets/marketing";

import { LandingHero } from "./sections/hero";

const LandingFeatures = dynamic(() =>
  import("./sections/features").then((mod) => mod.LandingFeatures)
);
const LandingHowItWorks = dynamic(() =>
  import("./sections/how-it-works").then((mod) => mod.LandingHowItWorks)
);
const LandingAI = dynamic(() =>
  import("./sections/ai").then((mod) => mod.LandingAI)
);
const LandingBenefits = dynamic(() =>
  import("./sections/benefits").then((mod) => mod.LandingBenefits)
);
const LandingStats = dynamic(() =>
  import("./sections/stats").then((mod) => mod.LandingStats)
);
const LandingPricing = dynamic(() =>
  import("./sections/pricing").then((mod) => mod.LandingPricing)
);
const LandingFAQ = dynamic(
  () => import("./sections/faq").then((mod) => mod.LandingFAQ),
  { ssr: false }
);
const LandingCTA = dynamic(() =>
  import("./sections/cta").then((mod) => mod.LandingCTA)
);
const LandingContact = dynamic(() =>
  import("./sections/contact").then((mod) => mod.LandingContact)
);

export function HomePage() {
  return (
    <div className="selection:bg-primary selection:text-primary-foreground flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingAI />
        <LandingBenefits />
        <LandingStats />
        <LandingPricing />
        <LandingFAQ />
        <LandingCTA />
        <LandingContact />
      </main>

      <MarketingFooter />
    </div>
  );
}
