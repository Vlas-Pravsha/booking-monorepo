"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useResetPassword } from "../api";

const resetPasswordSchema = z
  .object({
    confirmPassword: z.string().min(8, "Підтвердіть пароль"),
    password: z
      .string()
      .min(8, "Пароль має містити щонайменше 8 символів")
      .max(128, "Пароль надто довгий"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { isPending, isSuccess, mutate } = useResetPassword();
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });
  const submitError = form.formState.errors.root?.message;

  const handleSubmit = (values: ResetPasswordFormValues) => {
    if (!token) {
      form.setError("root", {
        message: "Посилання для відновлення недійсне або неповне.",
      });
      return;
    }

    form.clearErrors("root");
    mutate(
      {
        password: values.password,
        token,
      },
      {
        onError: (error) => {
          form.setError("root", {
            message: isApiError(error)
              ? "Не вдалося змінити пароль. Перевірте посилання або запросіть нове."
              : "Сталася помилка. Спробуйте ще раз.",
          });
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border/60 bg-card/90 p-8 text-center shadow-2xl shadow-primary/10 backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Пароль оновлено</h2>
          <p className="mb-8 text-muted-foreground">
            Тепер ви можете увійти в систему з новим паролем.
          </p>
          <Button className="w-full" asChild>
            <Link href="/login">Увійти в систему</Link>
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
          <span className="text-sm font-medium text-primary">Новий пароль</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Оновіть пароль</h1>
        <p className="text-muted-foreground">
          Вкажіть новий пароль для вашого акаунта.
        </p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">Новий пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Мінімум 8 символів"
                autoComplete="new-password"
                className="pr-10"
                {...form.register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  showPassword ? "Приховати пароль" : "Показати пароль"
                }
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="min-h-5 text-xs text-danger">
              {form.formState.errors.password?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Підтвердження пароля</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Повторіть пароль"
                autoComplete="new-password"
                className="pr-10"
                {...form.register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  showConfirmPassword
                    ? "Приховати підтвердження пароля"
                    : "Показати підтвердження пароля"
                }
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="min-h-5 text-xs text-danger">
              {form.formState.errors.confirmPassword?.message}
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
                Оновлюємо...
              </span>
            ) : (
              <>
                Зберегти пароль
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 border-t border-border/50 pt-6">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/forgot-password">Запросити нове посилання</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
