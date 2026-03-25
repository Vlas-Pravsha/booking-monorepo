"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/features/auth/session";
import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

const floatingBadges = [
  {
    className: "top-16 left-[8%] animate-[float_6s_ease-in-out_infinite]",
    delay: 0,
    text: "🚀 Безкоштовний старт",
  },
  {
    className: "top-32 right-[10%] animate-[float_6s_ease-in-out_infinite]",
    delay: 300,
    text: "⚡ 15 хвилин налаштування",
  },
  {
    className: "bottom-40 left-[12%] animate-[float_6s_ease-in-out_infinite]",
    delay: 500,
    text: "💬 Підтримка 24/7",
  },
] as const;

const trustPoints = [
  "Жодної кредитної картки",
  "Відмова від підписки будь-коли",
] as const;

function AnimatedShapes() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/8 blur-3xl delay-1000" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="absolute left-[5%] top-20 h-32 w-px animate-pulse bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
      <div className="absolute bottom-32 right-[8%] h-48 w-px animate-pulse bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 delay-500" />
      <div className="absolute right-[20%] top-1/3 h-px w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/4 left-[15%] h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </>
  );
}

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("absolute hidden lg:block", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function LandingCTA() {
  const currentUser = useAppSelector(selectCurrentUser);
  const primaryCta = currentUser
    ? { href: "/onboarding", label: "Продовжити онбординг" }
    : { href: "/register", label: "Спробувати безкоштовно" };

  return (
    <section className="relative overflow-hidden py-24 sm:py-36 lg:py-44">
      <AnimatedShapes />

      {floatingBadges.map((badge) => (
        <FloatingBadge
          key={badge.text}
          className={badge.className}
          delay={badge.delay}
        >
          <div className="rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md">
            {badge.text}
          </div>
        </FloatingBadge>
      ))}

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 sm:mb-8">
            <Sparkles className="h-4 w-4 animate-pulse text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Почніть зараз
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight sm:mb-8 sm:text-6xl lg:text-7xl">
            Готові перевести
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {" "}
              свій ресторан{" "}
            </span>
            <br className="hidden sm:block" />
            на новий рівень?
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:mb-12 sm:text-xl">
            Приєднуйтесь до сотень ресторанів, які вже автоматизували бронювання
            та заощаджують 10+ годин на тиждень.
          </p>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Button
              size="lg"
              className="group h-14 px-10 text-lg font-bold shadow-2xl shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40"
              asChild
            >
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg font-semibold"
              asChild
            >
              <Link href="#features">Як це працює</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:mt-16 sm:flex-row sm:gap-8">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    semanticToneStyles.success.dot
                  )}
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
