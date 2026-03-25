"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useForgotPassword } from "../api";

const forgotPasswordSchema = z.object({
  email: z.email("Вкажіть коректний email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { isPending, isSuccess, mutate } = useForgotPassword();
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const submitError = form.formState.errors.root?.message;

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    form.clearErrors("root");
    mutate(values, {
      onError: (error) => {
        form.setError("root", {
          message: isApiError(error)
            ? "Не вдалося обробити запит. Спробуйте ще раз."
            : "Сталася помилка. Спробуйте ще раз.",
        });
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border/60 bg-card/90 p-8 text-center shadow-2xl shadow-primary/10 backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Перевірте пошту</h2>
          <p className="mb-8 text-muted-foreground">
            Якщо акаунт з таким email існує, ми надіслали інструкції для
            відновлення пароля на вашу електронну адресу.
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
      <div className="mb-8 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <KeyRound className="h-4 w-4 animate-pulse text-primary" />
          <span className="text-sm font-medium text-primary">
            Відновлення доступу
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Забули пароль?</h1>
        <p className="text-muted-foreground">
          Введіть ваш email, і ми надішлемо інструкції для відновлення доступу.
        </p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="info@restaurant.com"
              autoComplete="email"
              {...form.register("email")}
            />
            <p className="min-h-5 text-xs text-danger">
              {form.formState.errors.email?.message}
            </p>
          </div>

          {submitError ? (
            <div className="rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
              {submitError}
            </div>
          ) : null}

          <Button
            type="submit"
            className="h-12 w-full text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
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

        <div className="mt-8 border-t border-border/50 pt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            Повернутися до входу
          </Link>
        </div>
      </div>
    </div>
  );
}
