"use client";

import { Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

const aiFeatures = [
  "Прогнозування завантаженості",
  "Автоматичні знижки",
  "Персоналізовані пропозиції",
  "Оптимізація цін",
] as const;

const chartData = [65, 80, 45, 30, 25, 20, 55, 75, 90, 85, 70, 95];

export function LandingAI() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10 py-32">
      <Container>
        <div className="flex flex-col items-center gap-16">
          <div className="mx-auto max-w-3xl flex-1 space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Powered
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Штучний інтелект,
              <br />
              <span className="text-primary"> який заробляє</span>
            </h2>

            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              Наші алгоритми машинного навчання аналізують вашу історію
              бронювань та поведінку гостей, щоб запропонувати
              <span className="font-semibold text-primary">
                {" "}
                оптимальні знижки{" "}
              </span>
              саме в ті години, коли ваш зал найменш заповнений.
            </p>

            <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2">
              {aiFeatures.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border bg-background/50 p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
              <Link href="/register">
                Спробувати AI
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="w-full max-w-xl flex-1">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl" />
              <div className="relative rounded-2xl border bg-card p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">AI Асистент</div>
                      <div className="text-xs text-muted-foreground">
                        Активно
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={semanticToneStyles.success.badge}
                  >
                    Online
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-muted/50 p-4">
                    <div className="mb-2 text-sm text-muted-foreground">
                      Аналіз завантаженості
                    </div>
                    <div className="flex h-20 items-end gap-1">
                      {chartData.map((height, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div
                          key={`bar-${String(index)}`}
                          className={cn(
                            "flex-1 rounded-t-sm",
                            index >= 10 ? "bg-primary" : "bg-primary/30"
                          )}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>Пн</span>
                      <span>Нд</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          semanticToneStyles.primary.solidIcon
                        )}
                      >
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">
                          Рекомендація
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Пропонуємо знижку
                          <span className="font-bold text-primary"> -15% </span>
                          у вівторок з 14:00 до 17:00
                        </div>
                        <div className="text-xs text-primary">
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
