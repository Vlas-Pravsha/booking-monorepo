"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";

import type { AuthSession } from "../api";
import { useLogin } from "../api";
import {
  AuthCardFooter,
  AuthFormCard,
  AuthFormError,
  AuthFormIntro,
  AuthPasswordField,
  AuthTextField,
} from "./auth-form-parts";

const loginSchema = z.object({
  email: z.email("Вкажіть коректний email"),
  password: z
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .max(128, "Пароль надто довгий"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onAuthenticated?: (session: AuthSession) => void;
}

export function LoginForm({ onAuthenticated }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPending, mutate } = useLogin();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const submitError = form.formState.errors.root?.message;

  const handleSubmit = (values: LoginFormValues) => {
    form.clearErrors("root");

    mutate(values, {
      onError: (error) => {
        if (isApiError(error)) {
          form.setError("root", {
            message: error.message,
          });
          return;
        }

        form.setError("root", {
          message: "Не вдалося увійти. Спробуйте ще раз.",
        });
      },
      onSuccess: (session) => {
        onAuthenticated?.(session);
        toast.success("Вхід виконано");

        const nextPath = searchParams.get("next");
        router.replace(
          nextPath && nextPath.startsWith("/") ? nextPath : "/admin"
        );
      },
    });
  };

  return (
    <div className="w-full max-w-md">
      <AuthFormIntro
        icon={Sparkles}
        badgeLabel="Ласкаво просимо"
        title="Увійти в систему"
        description="Продовжіть керувати вашим закладом"
      />

      <AuthFormCard>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <AuthTextField
            id="email"
            type="email"
            label="Email"
            placeholder="info@restaurant.com"
            autoComplete="email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />

          <AuthPasswordField
            id="password"
            label="Пароль"
            placeholder="Введіть пароль"
            autoComplete="current-password"
            helperHref="/forgot-password"
            helperLabel="Забули пароль?"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
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

        <AuthCardFooter
          prompt="Немає аккаунту?"
          textAlign="center"
          actionHref="/register"
          actionLabel="Зареєструватися"
        />
      </AuthFormCard>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Захищений доступ через персональну сесію та автоматичне оновлення
        токенів.
      </p>
    </div>
  );
}
