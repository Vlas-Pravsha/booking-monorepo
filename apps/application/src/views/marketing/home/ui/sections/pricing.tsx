"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { FloatingElement } from "@/shared/ui/animated-background";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { LandingSection } from "@/shared/ui/layout";

const plans = [
  {
    description: "Для невеликих кав'ярень та нових закладів",
    features: [
      "До 50 бронювань/міс",
      "Базова сторінка бронювання",
      "Ручне підтвердження",
      "Email підтримка",
      "Базова аналітика",
    ],
    name: "Старт",
    period: "назавжди",
    popular: false,
    price: "0₴",
  },
  {
    description: "Для активних ресторанів середнього розміру",
    features: [
      "Безліміт бронювань",
      "Власний віджет на сайт",
      "Автоматичні нагадування",
      "SMS + Email повідомлення",
      "Повна аналітика",
      "Інтеграції (POS, CRM)",
      "Пріоритетна підтримка",
    ],
    name: "Бізнес",
    period: "/міс",
    popular: true,
    price: "990₴",
  },
  {
    description: "Для мереж ресторанів та великих закладів",
    features: [
      "Все з тарифу Бізнес",
      "Спільна база клієнтів",
      "Централізоване керування",
      "API доступ",
      "Персональний менеджер",
      "Кастомні інтеграції",
      "SLA договір",
    ],
    name: "Мережа",
    period: "",
    popular: false,
    price: "Індивідуально",
  },
];

export function LandingPricing() {
  return (
    <LandingSection
      id="pricing"
      badge="Тарифи"
      title="Прості та прозорі ціни"
      description="Оберіть план, який відповідає вашим потребам. Жодних прихованих платежів."
      className="bg-muted/20"
    >
      <FloatingElement className="top-32 left-[5%] h-14 w-14" delay={0}>
        <div className="h-14 w-14 -rotate-12 rounded-full border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-48 right-[8%] h-10 w-10" delay={500}>
        <div className="h-10 w-10 rotate-45 rounded-2xl border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[10%] h-16 w-16" delay={1000}>
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[12%] h-12 w-12" delay={1500}>
        <div className="h-12 w-12 -rotate-45 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className={cn(
              "relative flex h-full flex-col",
              plan.popular
                ? "border-primary shadow-primary/10 z-10 shadow-xl lg:scale-105"
                : "hover:shadow-lg"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Популярний
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-center">
                {plan.description}
              </CardDescription>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="mt-auto p-6 pt-0">
              <Button
                className="h-12 w-full"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/register">
                  {plan.price === "Індивідуально" ? "Зв'язатися" : "Почати"}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </LandingSection>
  );
}
