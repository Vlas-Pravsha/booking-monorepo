"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { ForgotPasswordForm } from "@/features/auth-by-email";
import {
  AnimatedBackground,
  DefaultFloatingElements,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export function ForgotPasswordPage() {
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
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад до входу
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-20 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
        <AnimatedBackground />

        <DefaultFloatingElements />

        <Container className="relative">
          <div className="flex items-center justify-center">
            <ForgotPasswordForm />
          </div>
        </Container>
      </main>
    </div>
  );
}
