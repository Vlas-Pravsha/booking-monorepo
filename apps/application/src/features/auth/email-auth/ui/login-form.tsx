"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAppDispatch } from "@/app/store/hooks";
import { setSession } from "@/features/auth/session";
import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useLogin } from "../api";

const loginSchema = z.object({
  email: z.email("Вкажіть коректний email"),
  password: z
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .max(128, "Пароль надто довгий"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
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
        dispatch(setSession(session));
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
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
                autoComplete="current-password"
                className="pr-10"
                {...form.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Приховати пароль" : "Показати пароль"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

          {submitError ? (
            <div className="rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
              {submitError}
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? (
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
        Захищений доступ через персональну сесію та автоматичне оновлення
        токенів.
      </p>
    </div>
  );
}
