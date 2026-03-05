"use client";

import { Clock, Target, TrendingUp, Users } from "lucide-react";
import * as React from "react";

import { FloatingElement } from "@/shared/ui/animated-background";
import { Container } from "@/shared/ui/container";

const stats = [
  { icon: TrendingUp, label: "Середній прибуток", value: "+30%" },
  { icon: Clock, label: "No-shows", value: "-70%" },
  { icon: Users, label: "Завантаженість", value: "85%" },
  { icon: Target, label: "Швидше бронювання", value: "10x" },
];

export function LandingStats() {
  return (
    <section className="bg-primary relative overflow-hidden py-20">
      <FloatingElement className="top-10 left-[5%] h-10 w-10" delay={0}>
        <div className="h-10 w-10 rotate-45 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-20 right-[8%] h-12 w-12" delay={400}>
        <div className="h-12 w-12 -rotate-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-10 left-[10%] h-8 w-8" delay={800}>
        <div className="h-8 w-8 rotate-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-15 right-[12%] h-14 w-14" delay={1200}>
        <div className="h-14 w-14 -rotate-45 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm" />
      </FloatingElement>

      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-primary-foreground text-center"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="mb-1 text-3xl font-bold sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm opacity-80 sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
