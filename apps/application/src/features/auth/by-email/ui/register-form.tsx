"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const REGISTER_BENEFITS = [
  'Безкоштовний тариф "Старт"',
  "Налаштування за 15 хвилин",
  "Без кредитної картки",
  "Підтримка 24/7",
];

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual registration logic
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            Безкоштовна реєстрація
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Створіть аккаунт
        </h1>
        <p className="text-muted-foreground">
          Почніть приймати бронювання вже сьогодні
        </p>
      </div>

      <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Назва закладу</Label>
              <Input id="name" placeholder='Ресторан "Улюблен"' required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+38 (099) 123-45-67"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="info@restaurant.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Мінімум 8 символів"
              required
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Місто</Label>
            <Input id="city" placeholder="Київ" required />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Створюємо...
              </span>
            ) : (
              <>
                Зареєструватися
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Реєструючись, ви погоджуєтесь з{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Умовами використання
            </Link>{" "}
            та{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Політикою конфіденційності
            </Link>
          </p>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">Вже є аккаунт?</p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">
              Увійти в систему
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {REGISTER_BENEFITS.map((benefit, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            {benefit}
          </div>
        ))}
      </div>
    </div>
  );
}
