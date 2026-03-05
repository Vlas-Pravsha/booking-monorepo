"use client";

import { ArrowRight, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/10 text-center">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Перевірте пошту</h2>
          <p className="text-muted-foreground mb-8">
            Ми надіслали інструкції для відновлення пароля на вашу електронну
            адресу.
          </p>
          <Button className="w-full" asChild>
            <Link href="/login">Повернутися до входу</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <KeyRound className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            Відновлення доступу
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Забули пароль?</h1>
        <p className="text-muted-foreground">
          Введіть ваш email, і ми надішлемо вам посилання для відновлення
        </p>
      </div>

      <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="info@restaurant.com"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Відправляємо...
              </span>
            ) : (
              <>
                Надіслати посилання
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline font-medium"
          >
            Повернутися до входу
          </Link>
        </div>
      </div>
    </div>
  );
}
