"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { FloatingElement } from "@/shared/ui/animated-background";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

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
];

const features = [
  {
    description: "Персональна підтримка на всіх етапах роботи",
    title: "Ваш персональний менеджер",
  },
  {
    description: "Платите тільки за те, що використовуєте",
    title: "Без прихованих платежів",
  },
  {
    description: "SMS та Email нагадування для гостей",
    title: "Миттєві сповіщення",
  },
  {
    description: "Віджет завантажується за 2 кліки",
    title: "Інтеграція з вашим сайтом",
  },
];

export function LandingBenefits() {
  return (
    <section className="relative overflow-hidden py-32">
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

      <Container>
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 font-medium">
            Переваги
          </Badge>
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            Чому ресторатори обирають{" "}
            <span className="text-primary">TableReserve</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Ми знаємо, як важливо ефективно керувати бронюваннями. Тому створили
            інструмент, який реально працює.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="group relative">
              <div className="from-primary/20 to-primary/5 absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="bg-card/80 shadow-primary/10 relative rounded-3xl border p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="text-primary mb-2 text-5xl font-black sm:text-6xl">
                  {benefit.number}
                  <span className="text-muted-foreground text-2xl sm:text-3xl">
                    {benefit.unit}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="bg-card rounded-3xl border p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Sparkles className="text-primary h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Що ви отримуєте</h3>
                <p className="text-muted-foreground text-sm">
                  Повний набір інструментів
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {features.slice(0, 2).map((feature, i) => (
                <div
                  key={i}
                  className="bg-muted/30 flex items-start gap-4 rounded-2xl p-4"
                >
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Check className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="from-primary to-primary/80 relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 text-primary-foreground">
            <div className="relative">
              <h3 className="mb-4 text-2xl font-bold">Почніть безкоштовно</h3>
              <p className="text-primary-foreground/80 mb-6">
                Тариф &quot;Старт&quot; повністю безкоштовний для невеликих
                закладів. Без обмежень за часом.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>До 50 бронювань на місяць</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Базова аналітика</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Підтримка по email</span>
                </li>
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
      </Container>
    </section>
  );
}
