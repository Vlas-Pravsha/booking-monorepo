"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

import { FloatingElement } from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { LandingSection } from "@/shared/ui/layout";

const benefits = [
  {
    description: "Повністю налаштуйте систему за 15 хвилин",
    number: "15",
    title: "Швидкий старт",
    unit: "хв",
  },
  {
    description: "Менше ручної роботи, більше клієнтів",
    number: "80%",
    title: "Автоматизація",
    unit: "",
  },
  {
    description: "Зменшіть кількість нез'явок на 70%",
    number: "70%",
    title: "Менше пропусків",
    unit: "",
  },
  {
    description: "Бронювання працюють навіть поки ви спите",
    number: "24/7",
    title: "Цілодобово",
    unit: "",
  },
] as const;

const featureChecklist = [
  "Персональна підтримка на всіх етапах роботи",
  "Оплата лише за реально потрібні функції",
  "SMS та email-нагадування для гостей",
  "Інтеграція з сайтом за 2 кліки",
] as const;

const startPlanFeatures = [
  "До 50 бронювань на місяць",
  "Базова аналітика",
  "Підтримка по email",
] as const;

export function LandingBenefits() {
  return (
    <LandingSection
      badge="Переваги"
      title={
        <>
          Чому ресторатори обирають{" "}
          <span className="text-primary">TableReserve</span>
        </>
      }
      description="Ми знаємо, як важливо ефективно керувати бронюваннями. Тому створили інструмент, який реально працює."
    >
      <FloatingElement className="top-32 left-[5%] h-12 w-12" delay={0}>
        <div className="h-12 w-12 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-60 right-[8%] h-16 w-16" delay={600}>
        <div className="h-16 w-16 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[15%] h-10 w-10" delay={1200}>
        <div className="h-10 w-10 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[20%] h-14 w-14" delay={1800}>
        <div className="h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="group relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative rounded-3xl border bg-card/80 p-6 shadow-primary/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8">
              <div className="mb-2 text-5xl font-black text-primary sm:text-6xl">
                {benefit.number}
                <span className="text-2xl text-muted-foreground sm:text-3xl">
                  {benefit.unit}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Що ви отримуєте</h3>
              <p className="text-sm text-muted-foreground">
                Повний набір інструментів
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featureChecklist.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium leading-6">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground">
          <div className="relative">
            <h3 className="mb-4 text-2xl font-bold">Почніть безкоштовно</h3>
            <p className="mb-6 text-primary-foreground/80">
              Тариф &quot;Старт&quot; повністю безкоштовний для невеликих
              закладів. Без обмежень за часом.
            </p>
            <ul className="mb-8 space-y-3">
              {startPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              className="h-12 w-full text-base font-semibold"
              asChild
            >
              <Link href="/register">Спробувати безкоштовно</Link>
            </Button>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
