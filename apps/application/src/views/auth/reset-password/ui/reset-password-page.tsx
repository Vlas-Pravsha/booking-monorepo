"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { ResetPasswordForm } from "@/features/auth/email-auth";
import {
  AnimatedBackground,
  DefaultFloatingElements,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <ResetPasswordForm token={token} />;
}

export function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
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

      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-20">
        <AnimatedBackground />
        <DefaultFloatingElements />

        <Container className="relative">
          <div className="flex items-center justify-center">
            <React.Suspense fallback={<div className="w-full max-w-md" />}>
              <ResetPasswordPageContent />
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}
