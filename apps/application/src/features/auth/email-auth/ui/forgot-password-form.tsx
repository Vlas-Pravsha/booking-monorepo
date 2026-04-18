"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";

import { useForgotPassword } from "../api";
import {
  AuthCardFooter,
  AuthFormCard,
  AuthFormError,
  AuthFormIntro,
  AuthSuccessState,
  AuthTextField,
} from "./auth-form-parts";

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
      <AuthSuccessState
        icon={Mail}
        title="Перевірте пошту"
        description="Якщо акаунт з таким email існує, ми надіслали інструкції для відновлення пароля на вашу електронну адресу."
        actionHref="/login"
        actionLabel="Повернутися до входу"
      />
    );
  }

  return (
    <div className="w-full max-w-md">
      <AuthFormIntro
        icon={KeyRound}
        badgeLabel="Відновлення доступу"
        title="Забули пароль?"
        description="Введіть ваш email, і ми надішлемо інструкції для відновлення доступу."
      />

      <AuthFormCard>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <AuthTextField
            id="email"
            type="email"
            label="Email"
            placeholder="info@restaurant.com"
            autoComplete="email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
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

        <AuthCardFooter
          actionHref="/login"
          actionLabel="Повернутися до входу"
          textAlign="center"
          variant="ghost"
        />
      </AuthFormCard>
    </div>
  );
}
