"use client";

import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { buildTenantSiteUrl } from "@/shared/lib/tenant";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

interface CompletionStepProps {
  domain: string;
}

export function CompletionStep({ domain }: CompletionStepProps) {
  const domainUrl = buildTenantSiteUrl(domain);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-6">
          <CheckCircle2 className="w-14 h-14 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Все готово!</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Ваш ресторан успішно налаштований. Тепер ви можете почати приймати
          бронювання.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <Card className="border-none bg-primary/10 border border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center mb-2">
              Ваша сторінка бронювання
            </p>
            <div className="flex items-center justify-center gap-2">
              <Link
                href={domainUrl}
                className="text-lg font-bold text-primary hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {domainUrl.replace(/^https?:\/\//, "")}
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Поділіться цим посиланням з вашими гостями
            </p>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/30">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">AI-оптимізація</p>
                <p className="text-sm text-muted-foreground">
                  Система сама знайде найкращі слоти для бронювань
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Telegram-бот</p>
                <p className="text-sm text-muted-foreground">
                  Сповіщення про нові бронювання
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button size="lg" className="w-full h-12" asChild>
            <Link href="/admin">
              Перейти до панелі керування
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full h-12" asChild>
            <Link href={domainUrl} target="_blank" rel="noopener noreferrer">
              Переглянути публічну сторінку
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
