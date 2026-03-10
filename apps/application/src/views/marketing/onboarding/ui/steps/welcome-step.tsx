"use client";

import { PartyPopper } from "lucide-react";
import * as React from "react";

import { Card, CardContent } from "@/shared/ui/card";

export function WelcomeStep() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-6">
          <PartyPopper className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Ласкаво просимо!
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Дякуємо, що обрали TableReserve. Разом ми створимо найкращу систему
          бронювання для вашого ресторану.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[
          { description: "Швидке налаштування", title: "5 хвилин" },
          { description: "14 днів пробного періоду", title: "Безкоштовно" },
          { description: "Безліч столиків та гостей", title: "Без обмежень" },
        ].map((item) => (
          <Card
            key={item.title}
            className="border-none bg-muted/30 hover:bg-primary/5 transition-colors"
          >
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
