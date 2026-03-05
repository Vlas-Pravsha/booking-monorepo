"use client";

import { GripVertical, Link2, Rocket, TrendingUp } from "lucide-react";
import * as React from "react";

import { FloatingElement } from "@/shared/ui/animated-background";
import { LandingSection } from "@/shared/ui/layout";

const steps = [
  {
    description:
      "Створіть обліковий заклад за 2 хвилини. Додайте назву, адресу та контакти.",
    icon: Rocket,
    number: 1,
    title: "Реєстрація",
  },
  {
    description:
      "Додайте столи, зали та графік роботи. Налаштуйте часові слоти бронювання.",
    icon: GripVertical,
    number: 2,
    title: "Налаштування",
  },
  {
    description:
      "Отримайте посилання на вашу сторінку бронювання або встановіть віджет на сайт.",
    icon: Link2,
    number: 3,
    title: "Підключення",
  },
  {
    description:
      "Почніть приймати бронювання та збільшуйте завантаженість вашого закладу.",
    icon: TrendingUp,
    number: 4,
    title: "Прибуток",
  },
];

export function LandingHowItWorks() {
  return (
    <LandingSection
      id="how-it-works"
      badge="Процес"
      title="Як почати роботу"
      description="Всього 4 простих кроки до автоматизації вашого ресторану."
      className="bg-muted/20"
    >
      <FloatingElement className="top-32 left-[5%] h-12 w-12" delay={0}>
        <div className="h-12 w-12 rotate-45 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-48 right-[8%] h-16 w-16" delay={500}>
        <div className="h-16 w-16 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-32 left-[12%] h-10 w-10" delay={1000}>
        <div className="h-10 w-10 rotate-12 rounded-full border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[10%] h-14 w-14" delay={1500}>
        <div className="h-14 w-14 -rotate-45 rounded-2xl border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="bg-primary shadow-primary/20 flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl">
                <step.icon className="text-primary-foreground h-9 w-9" />
              </div>
              <div className="bg-card border-primary absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold">
                {step.number}
              </div>
            </div>
            <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground max-w-xs">{step.description}</p>
            {i < steps.length - 1 && (
              <div className="from-primary/50 hidden h-0.5 w-[80%] bg-gradient-to-r to-transparent lg:absolute lg:top-10 lg:left-[60%] lg:block" />
            )}
          </div>
        ))}
      </div>
    </LandingSection>
  );
}
