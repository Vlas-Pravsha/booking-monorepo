"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { RegisterForm } from "@/features/auth/by-email";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

import { HowItWorks } from "./how-it-works";

export function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              TableReserve
              <span className="text-primary">.com</span>
            </span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              На головну
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-20 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
        <AnimatedBackground />

        <FloatingElement className="top-20 left-[5%] w-16 h-16" delay={0}>
          <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/10 rotate-12" />
        </FloatingElement>
        <FloatingElement className="top-40 right-[10%] w-12 h-12" delay={500}>
          <div className="w-12 h-12 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/10 -rotate-12" />
        </FloatingElement>
        <FloatingElement
          className="bottom-40 left-[15%] w-20 h-20"
          delay={1000}
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/10 rotate-45" />
        </FloatingElement>
        <FloatingElement
          className="bottom-20 right-[5%] w-14 h-14"
          delay={1500}
        >
          <div className="w-14 h-14 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/10 rotate-12" />
        </FloatingElement>

        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            <RegisterForm />
            <HowItWorks />
          </div>
        </Container>
      </main>
    </div>
  );
}
