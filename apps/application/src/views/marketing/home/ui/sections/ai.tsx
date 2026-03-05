"use client";

import { Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

const aiFeatures = [
  "Прогнозування завантаженості",
  "Автоматичні знижки",
  "Персоналізовані пропозиції",
  "Оптимізація цін",
];

const chartData = [65, 80, 45, 30, 25, 20, 55, 75, 90, 85, 70, 95];

export function LandingAI() {
  return (
    <section className="bg-linear-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden py-32">
      <Container>
        <div className="flex flex-col items-center gap-16">
          <div className="mx-auto flex-1 space-y-8 text-center max-w-3xl">
            <div className="bg-primary/10 border border-primary/20 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Sparkles className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-medium">
                AI Powered
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Штучний інтелект,
              <br />
              <span className="text-primary"> який заробляє</span>
            </h2>

            <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed">
              Наші алгоритми машинного навчання аналізують вашу історію
              бронювань та поведінку гостей, щоб запропонувати
              <span className="text-primary font-semibold">
                {" "}
                оптимальні знижки{" "}
              </span>
              саме в ті години, коли ваш зал найменш заповнений.
            </p>

            <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2">
              {aiFeatures.map((item) => (
                <div
                  key={item}
                  className="bg-background/50 flex items-center gap-3 rounded-xl border p-3"
                >
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Check className="text-primary h-4 w-4" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="shadow-primary/20 shadow-lg" asChild>
              <Link href="/register">
                Спробувати AI
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="w-full max-w-xl flex-1">
            <div className="relative">
              <div className="from-primary/20 via-primary/10 to-primary/20 absolute -inset-4 rounded-3xl bg-gradient-to-r blur-2xl" />
              <div className="bg-card relative rounded-2xl border p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">AI Асистент</div>
                      <div className="text-muted-foreground text-xs">
                        Активно
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-600"
                  >
                    Online
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-2xl p-4">
                    <div className="text-muted-foreground mb-2 text-sm">
                      Аналіз завантаженості
                    </div>
                    <div className="flex h-20 items-end gap-1">
                      {chartData.map((h, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div
                          key={`bar-${String(i)}`}
                          className={cn(
                            "flex-1 rounded-t-sm",
                            i >= 10 ? "bg-primary" : "bg-primary/30"
                          )}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                      <span>Пн</span>
                      <span>Нд</span>
                    </div>
                  </div>

                  <div className="border-primary/10 bg-primary/5 rounded-2xl border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">
                          Рекомендація
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Пропонуємо знижку
                          <span className="text-primary font-bold"> -15% </span>
                          у вівторок з 14:00 до 17:00
                        </div>
                        <div className="text-primary text-xs">
                          Очікуваний приріст: +12 бронювань
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
