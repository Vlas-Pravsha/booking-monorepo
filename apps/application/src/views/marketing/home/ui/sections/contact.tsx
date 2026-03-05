"use client";

import * as React from "react";

import { ContactForm } from "@/features/support/send-contact-request";
import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";

function AnimatedBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-8 top-1/4 h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
        <div className="absolute -right-6 top-3/4 h-12 w-12 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
        <div className="absolute bottom-1/4 left-1/4 h-20 w-20 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
        <div className="absolute right-1/4 top-1/2 h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
}

export function LandingContact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <AnimatedBackground />

      <Container>
        <div className="relative">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-5 py-2 text-sm font-medium"
            >
              Зворотний зв&apos;язок
            </Badge>
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Маєте питання?
              <br />
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Напишіть нам
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Розкажіть нам про свій заклад — ми допоможемо підібрати оптимальне
              рішення для ваших потреб.
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
