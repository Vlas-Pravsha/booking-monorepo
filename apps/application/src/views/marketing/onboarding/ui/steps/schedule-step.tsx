"use client";

import { Clock } from "lucide-react";
import * as React from "react";

import { RestaurantOperationsSection } from "@/entities/restaurant";

import type { OnboardingData } from "../types";

interface ScheduleStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export function ScheduleStep({ data, updateData }: ScheduleStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Налаштування залу</h2>
        <p className="text-muted-foreground">
          Визначте час роботи та конфігурацію столів
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <RestaurantOperationsSection value={data} onChange={updateData} />
      </div>
    </div>
  );
}
