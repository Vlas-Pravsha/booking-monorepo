"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";

import { useResetPassword } from "../api";
import {
  AuthCardFooter,
  AuthFormCard,
  AuthFormError,
  AuthFormIntro,
  AuthPasswordField,
  AuthSuccessState,
} from "./auth-form-parts";

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
      <AuthSuccessState
        icon={CheckCircle2}
        title="Пароль оновлено"
        description="Тепер ви можете увійти в систему з новим паролем."
        actionHref="/login"
        actionLabel="Увійти в систему"
      />
    );
  }

  return (
    <div className="w-full max-w-md">
      <AuthFormIntro
        icon={KeyRound}
        badgeLabel="Новий пароль"
        title="Оновіть пароль"
        description="Вкажіть новий пароль для вашого акаунта."
      />

      <AuthFormCard>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <AuthPasswordField
            id="password"
            label="Новий пароль"
            placeholder="Мінімум 8 символів"
            autoComplete="new-password"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />

          <AuthPasswordField
            id="confirmPassword"
            label="Підтвердження пароля"
            placeholder="Повторіть пароль"
            autoComplete="new-password"
            error={form.formState.errors.confirmPassword?.message}
            {...form.register("confirmPassword")}
          />

          <AuthFormError message={submitError} />

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

        <AuthCardFooter
          actionHref="/forgot-password"
          actionLabel="Запросити нове посилання"
          variant="ghost"
        />
      </AuthFormCard>
    </div>
  );
}
