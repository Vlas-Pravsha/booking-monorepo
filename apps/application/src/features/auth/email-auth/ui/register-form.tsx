"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { isApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";

import type { AuthSession } from "../api";
import { useRegister } from "../api";
import {
  AuthCardFooter,
  AuthFormCard,
  AuthFormError,
  AuthFormIntro,
  AuthPasswordField,
  AuthTextField,
} from "./auth-form-parts";
import { RegisterBenefitsList } from "./register-benefits-list";

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

interface RegisterFormProps {
  onAuthenticated?: (session: AuthSession) => void;
}

export function RegisterForm({ onAuthenticated }: RegisterFormProps) {
  const router = useRouter();
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
          onAuthenticated?.(session);
          toast.success("Акаунт створено");
          router.replace("/onboarding");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md">
      <AuthFormIntro
        icon={Sparkles}
        badgeLabel="Безкоштовна реєстрація"
        title="Створіть аккаунт"
        description="Створіть персональний доступ і переходьте до налаштування системи"
      />

      <AuthFormCard>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <AuthTextField
              id="firstName"
              label="Ім'я"
              placeholder="Анна"
              autoComplete="given-name"
              error={form.formState.errors.firstName?.message}
              {...form.register("firstName")}
            />
            <AuthTextField
              id="lastName"
              label="Прізвище"
              placeholder="Коваленко"
              autoComplete="family-name"
              error={form.formState.errors.lastName?.message}
              {...form.register("lastName")}
            />
          </div>

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
                Створюємо...
              </span>
            ) : (
              <>
                Зареєструватися
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
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

        <AuthCardFooter
          prompt="Вже є аккаунт?"
          actionHref="/login"
          actionLabel="Увійти в систему"
        />
      </AuthFormCard>

      <RegisterBenefitsList />
    </div>
  );
}
