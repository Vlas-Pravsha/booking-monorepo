"use client";

import { Check, Sparkles } from "lucide-react";
import * as React from "react";

const REGISTER_STEPS = [
  {
    description: "Створіть обліковий запис за 2 хвилини",
    num: 1,
    title: "Реєстрація",
  },
  {
    description: "Додайте столи та налаштуйте графік роботи",
    num: 2,
    title: "Налаштування",
  },
  {
    description: "Отримайте посилання на вашу сторінку бронювання",
    num: 3,
    title: "Посилання",
  },
  {
    description: "Почніть приймати бронювання вже сьогодні",
    num: 4,
    title: "Прибуток",
  },
];

export function HowItWorks() {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Всього 4 кроки</h2>
        <p className="text-muted-foreground">
          Почніть приймати бронювання за 15 хвилин
        </p>
      </div>

      <div className="grid gap-4">
        {REGISTER_STEPS.map((step, i) => (
          <div
            key={i}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">
            Безкоштовний тариф &quot;Старт&quot;
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Повний функціонал для малого бізнесу без жодних витрат
        </p>
        <ul className="space-y-2">
          {["До 50 бронювань/міс", "Базова аналітика", "Підтримка"].map(
            (item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                {item}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
