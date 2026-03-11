"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

import { useRegister } from "../api";

const REGISTER_BENEFITS = [
  "Моментальний доступ до адмін-панелі",
  "Реєстрація без участі менеджера",
  "Безкоштовний старт і гнучке масштабування",
  "Професійний онбординг одразу після входу",
];

const registerSchema = z
  .object({
    confirmPassword: z.string().min(8, "Підтвердіть пароль"),
    email: z.email("Вкажіть коректний email"),
    firstName: z.string().trim().min(1, "Вкажіть ім'я").max(64),
    lastName: z.string().trim().max(64).optional(),
    password: z
      .string()
      .min(8, "Пароль має містити щонайменше 8 символів")
      .max(128, "Пароль надто довгий"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { isPending, mutate } = useRegister();
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const submitError = form.formState.errors.root?.message;

  const handleSubmit = (values: RegisterFormValues) => {
    form.clearErrors("root");

    mutate(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName?.trim() || undefined,
        password: values.password,
      },
      {
        onError: (error) => {
          if (isApiError(error)) {
            if (error.status === 409) {
              form.setError("email", {
                message: "Користувач з таким email вже існує",
              });
              return;
            }

            form.setError("root", {
              message: error.message,
            });
            return;
          }

          form.setError("root", {
            message: "Не вдалося створити акаунт. Спробуйте ще раз.",
          });
        },
        onSuccess: (session) => {
          dispatch(setSession(session));
          toast.success("Акаунт створено");
          router.replace("/onboarding");
        },
      }
    );
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
          Створіть персональний доступ і переходьте до налаштування системи
        </p>
      </div>

      <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/10">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ім&apos;я</Label>
              <Input
                id="firstName"
                placeholder="Анна"
                autoComplete="given-name"
                {...form.register("firstName")}
              />
              <p className="min-h-5 text-xs text-danger">
                {form.formState.errors.firstName?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Прізвище</Label>
              <Input
                id="lastName"
                placeholder="Коваленко"
                autoComplete="family-name"
                {...form.register("lastName")}
              />
              <p className="min-h-5 text-xs text-danger">
                {form.formState.errors.lastName?.message}
              </p>
            </div>
          </div>

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
            <Label htmlFor="password">Пароль</Label>
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
                onClick={() => setShowPassword((value) => !value)}
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
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={
                  showConfirmPassword
                    ? "Приховати підтвердження пароля"
                    : "Показати підтвердження пароля"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            className="w-full h-12 text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? (
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
        {REGISTER_BENEFITS.map((benefit) => (
          <div
            key={benefit}
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
