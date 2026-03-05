"use client";

import {
  BarChart3,
  Bell,
  CalendarCheck,
  Headphones,
  Smartphone,
  Tablet,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import * as React from "react";

import { FloatingElement } from "@/shared/ui/animated-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LandingSection } from "@/shared/ui/layout";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    description:
      "Гості бронюють столики самостійно через ваш сайт, соцмережі або наш віджет — без дзвінків та очікувань.",
    icon: CalendarCheck,
    title: "Онлайн-бронювання 24/7",
  },
  {
    description:
      "Керуйте бронюваннями з будь-якого пристрою. Перегляд, підтвердження та скасування в один клік.",
    icon: Smartphone,
    title: "Мобільний додаток",
  },
  {
    description:
      "SMS та Email повідомлення за 24 та 2 години до візиту. Зменшуємо no-shows до мінімуму.",
    icon: Bell,
    title: "Автоматичні нагадування",
  },
  {
    description:
      "Зберігаємо історію відвідувань, вподобання та контакти. Персоналізований сервіс для постійних гостей.",
    icon: Users,
    title: "База гостей CRM",
  },
  {
    description:
      "Графіки завантаженості, найпопулярніші години, середній чек та RFM-аналіз ваших гостей.",
    icon: BarChart3,
    title: "Аналітика та звіти",
  },
  {
    description:
      'Розумні алгоритми аналізують ваші дані та пропонують динамічні знижки для заповнення "тихих" годин.',
    icon: Zap,
    title: "ШІ-оптимізація",
  },
  {
    description:
      "Візуальна схема столиків з можливістю перетягування. Гості бачать вільні місця в реальному часі.",
    icon: Tablet,
    title: "План зали",
  },
  {
    description:
      "Підключення до Pos boss, Yclients, вашого сайту на WordPress, Tilda або власної CRM.",
    icon: Webhook,
    title: "Інтеграції",
  },
  {
    description:
      "Наша команда завжди на зв'язку. Допомогаємо налаштувати систему та вирішити будь-яки питання.",
    icon: Headphones,
    title: "Підтримка 24/7",
  },
];

export function LandingFeatures() {
  return (
    <LandingSection
      id="features"
      badge="Всі можливості"
      title="Все для успішного бізнесу"
      description="Потужний інструментарій, який допомагає ресторанам працювати ефективніше та заробляти більше."
    >
      <FloatingElement className="top-20 left-[5%] h-14 w-14" delay={0}>
        <div className="h-14 w-14 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[10%] h-10 w-10" delay={400}>
        <div className="h-10 w-10 rotate-45 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[8%] h-16 w-16" delay={800}>
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[15%] h-12 w-12" delay={1400}>
        <div className="h-12 w-12 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group h-full border-none bg-muted/30 transition-all duration-500 hover:-translate-y-2 hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/5"
          >
            <CardHeader>
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110">
                <feature.icon className="h-7 w-7" />
              </div>
              <CardTitle className="group-hover:text-primary text-xl font-bold transition-colors">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LandingSection>
  );
}
