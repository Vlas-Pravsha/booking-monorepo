"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";

const LOGIN_BENEFITS = [
  {
    description: "Гості бронюють столи 24/7 через вашу сторінку",
    title: "Онлайн-бронювання",
  },
  {
    description: "SMS та Email повідомлення зменшують no-shows на 70%",
    title: "Автоматичні нагадування",
  },
  {
    description: "Бачите завантаженість, прибуток та поведінку гостей",
    title: "Аналітика",
  },
];

export function Benefits() {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Все для вашого бізнесу
        </h2>
        <p className="text-muted-foreground">
          Ефективне керування бронюваннями в одному місці
        </p>
      </div>

      <div className="grid gap-4">
        {LOGIN_BENEFITS.map((benefit, i) => (
          <div
            key={benefit.title}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">{i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5" />
          <span className="font-semibold">
            Тариф &quot;Старт&quot; безкоштовно
          </span>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Отримайте повний функціонал для малого бізнесу без жодних витрат
        </p>
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/register">Спробувати безкоштовно</Link>
        </Button>
      </div>
    </div>
  );
}
