"use client";

import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
            Ласкаво просимо
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Увійти в систему
        </h1>
        <p className="text-muted-foreground">
          Продовжіть керувати вашим закладом
        </p>
      </div>

      <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/10">
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Забули пароль?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Введіть пароль"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Входимо...
              </span>
            ) : (
              <>
                Увійти
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Немає аккаунту?
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/register">
              Зареєструватися
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <p className="mt-8 text-xs text-center text-muted-foreground">
        Проблеми з входом?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Зв&apos;яжіться з підтримкою
        </Link>
      </p>
    </div>
  );
}
