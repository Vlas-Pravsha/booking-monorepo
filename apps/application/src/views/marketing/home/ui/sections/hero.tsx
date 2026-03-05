"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export function LandingHero() {
  const stats = [
    { label: "Ресторанів", value: "500+" },
    { label: "Бронювань/міс", value: "50K+" },
    { label: "Задоволених", value: "98%" },
  ];

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-linear-to-b from-background via-background to-primary/5">
      <AnimatedBackground />

      <FloatingElement className="top-20 left-[10%] h-16 w-16" delay={0}>
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[15%] h-12 w-12" delay={500}>
        <div className="h-12 w-12 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[20%] h-20 w-20" delay={1000}>
        <div className="h-20 w-20 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[10%] h-14 w-14" delay={1500}>
        <div className="h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="animate-in fade-in slide-in-from-bottom-3 mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 duration-500">
            <Sparkles className="text-primary h-4 w-4 animate-pulse" />
            <span className="text-primary text-sm font-medium">
              Нове покоління систем бронювання
            </span>
          </div>

          <h1 className="animate-in fade-in slide-in-from-bottom-4 mb-8 text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl duration-700">
            Розумне
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              бронювання
            </span>
            <br />
            для ресторанів
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-5 text-muted-foreground mb-10 max-w-3xl text-balance text-xl leading-relaxed sm:text-2xl duration-1000">
            Збільшуйте завантаженість залу до 85%, зменшуйте кількість
            <span className="text-primary font-semibold"> no-shows </span>
            на 70% та заощаджуйте 10+ годин на тиждень на телефонних дзвінках.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-6 mb-16 flex w-full flex-col gap-4 sm:w-auto sm:flex-row duration-1000">
            <Button
              size="lg"
              className="h-14 shadow-2xl shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 px-10 text-lg font-semibold"
              asChild
            >
              <Link href="/register">
                Почати безкоштовно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg font-semibold"
              asChild
            >
              <Link href="#demo">Дивитися демо</Link>
            </Button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-7 delay-300 grid w-full max-w-lg grid-cols-3 gap-8 duration-1000">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-primary text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2 p-2 items-start">
          <div className="bg-muted-foreground/50 h-2 w-1 animate-pulse rounded-full" />
        </div>
      </div>
    </section>
  );
}
