"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function SampleDataNotice() {
  return (
    <Card className="border-warning/30 bg-warning/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Пробні дані в базі</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Частина записів у цій адмінці створена як пробна база для демонстрації
        реального сценарію роботи. Вони позначені в списках і їх можна поступово
        замінити живими бронюваннями та клієнтами.
      </CardContent>
    </Card>
  );
}

export function MissingRestaurantState() {
  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Спочатку налаштуйте заклад</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          У вашому акаунті ще немає ресторану, тому адмінка поки не має з чим
          працювати.
        </p>
        <Button asChild>
          <Link href="/onboarding">Перейти в онбординг</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
