"use client";

import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface AuthFormIntroProps {
  badgeLabel: string;
  description: string;
  icon: LucideIcon;
  title: string;
}

export function AuthFormIntro({
  badgeLabel,
  description,
  icon: Icon,
  title,
}: AuthFormIntroProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
        <Icon className="h-4 w-4 animate-pulse text-primary" />
        <span className="text-sm font-medium text-primary">{badgeLabel}</span>
      </div>
      <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface AuthFormCardProps {
  children: React.ReactNode;
}

export function AuthFormCard({ children }: AuthFormCardProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-2xl shadow-primary/10 backdrop-blur-sm">
      {children}
    </div>
  );
}

interface AuthCardFooterProps {
  actionHref: string;
  actionLabel: string;
  prompt?: string;
  textAlign?: "left" | "center";
  variant?: "ghost" | "outline";
}

export function AuthCardFooter({
  actionHref,
  actionLabel,
  prompt,
  textAlign = "left",
  variant = "outline",
}: AuthCardFooterProps) {
  return (
    <div className="mt-8 border-t border-border/50 pt-6">
      {prompt ? (
        <p
          className={cn(
            "mb-4 text-sm text-muted-foreground",
            textAlign === "center" && "text-center"
          )}
        >
          {prompt}
        </p>
      ) : null}
      <Button variant={variant} className="w-full" asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}

interface AuthFieldErrorProps {
  message?: string;
}

export function AuthFieldError({ message }: AuthFieldErrorProps) {
  return <p className="min-h-5 text-xs text-danger">{message}</p>;
}

interface AuthFormErrorProps {
  message?: string;
}

export function AuthFormError({ message }: AuthFormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
      {message}
    </div>
  );
}

interface AuthSuccessStateProps {
  actionHref: string;
  actionLabel: string;
  description: string;
  icon: LucideIcon;
  title: string;
}

export function AuthSuccessState({
  actionHref,
  actionLabel,
  description,
  icon: Icon,
  title,
}: AuthSuccessStateProps) {
  return (
    <div className="w-full max-w-md">
      <AuthFormCard>
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">{title}</h2>
          <p className="mb-8 text-muted-foreground">{description}</p>
          <Button className="w-full" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      </AuthFormCard>
    </div>
  );
}

interface AuthTextFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "id"
> {
  error?: string;
  id: string;
  label: string;
}

export function AuthTextField({
  error,
  id,
  label,
  ...inputProps
}: AuthTextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
      <AuthFieldError message={error} />
    </div>
  );
}

interface AuthPasswordFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "id" | "type"
> {
  error?: string;
  helperHref?: string;
  helperLabel?: string;
  id: string;
  label: string;
}

export function AuthPasswordField({
  error,
  helperHref,
  helperLabel,
  id,
  label,
  ...inputProps
}: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {helperHref && helperLabel ? (
          <Link
            href={helperHref}
            className="text-xs text-primary hover:underline"
          >
            {helperLabel}
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          className="pr-10"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? "Приховати пароль" : "Показати пароль"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <AuthFieldError message={error} />
    </div>
  );
}
