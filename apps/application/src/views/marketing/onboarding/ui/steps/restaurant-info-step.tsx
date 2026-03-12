"use client";

import { Utensils } from "lucide-react";
import * as React from "react";

import { RestaurantIdentitySection } from "@/entities/restaurant";

import type { OnboardingData } from "../types";

interface RestaurantInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export function RestaurantInfoStep({
  data,
  updateData,
}: RestaurantInfoStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Про ресторан</h2>
        <p className="text-muted-foreground">
          Заповніть основу бренду та контакти, які побачать гості на домені
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <RestaurantIdentitySection value={data} onChange={updateData} />
      </div>
    </div>
  );
}
