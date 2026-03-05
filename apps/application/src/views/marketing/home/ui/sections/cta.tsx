"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

function AnimatedShapes() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
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
      <div className="absolute top-20 left-[5%] w-px h-32 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 animate-pulse" />
      <div className="absolute bottom-32 right-[8%] w-px h-48 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 animate-pulse delay-500" />
      <div className="absolute top-1/3 right-[20%] w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/4 left-[15%] w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </>
  );
}

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute hidden lg:block ${className}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36 lg:py-44">
      <AnimatedShapes />

      <FloatingBadge
        className="top-16 left-[8%] animate-[float_6s_ease-in-out_infinite]"
        delay={0}
      >
        <div className="rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md">
          🚀 Безкоштовний старт
        </div>
      </FloatingBadge>

      <FloatingBadge
        className="top-32 right-[10%] animate-[float_6s_ease-in-out_infinite]"
        delay={300}
      >
        <div className="rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md">
          ⚡ 15 хвилин налаштування
        </div>
      </FloatingBadge>

      <FloatingBadge
        className="bottom-40 left-[12%] animate-[float_6s_ease-in-out_infinite]"
        delay={500}
      >
        <div className="rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md">
          💬 Підтримка 24/7
        </div>
      </FloatingBadge>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 sm:mb-8">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider sm:text-sm">
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
              <Link href="/register">
                Спробувати безкоштовно
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
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Жодної кредитної картки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Відмова від підписки будь-коли</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
