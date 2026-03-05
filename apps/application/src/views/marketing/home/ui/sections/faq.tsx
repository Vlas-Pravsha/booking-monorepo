"use client";

import {
  Bell,
  CheckCircle2,
  Clock,
  Link2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { FloatingElement } from "@/shared/ui/animated-background";
import { LandingSection } from "@/shared/ui/layout";

const faqs = [
  {
    a: "В середньому 15-30 хвилин. Ви можете почати приймати бронювання в той самий день. Процес максимально простий: реєстрація, налаштування страв та столів, і все готово до роботи.",
    icon: Clock,
    q: "Скільки часу займає налаштування?",
  },
  {
    a: "Ні, система працює повністю в браузері. Для гостей — звичайна сторінка, для вас — будь-який пристрій з інтернетом. Адмін-панель доступна з комп'ютера, планшета чи смартфона.",
    icon: Smartphone,
    q: "Чи потрібно встановлювати додаток?",
  },
  {
    a: "Ми надаємо готовий код для WordPress, Tilda, Wix та інших платформ. Встановлюється в 2 кліки. Просто скопіюйте код віджета та вставте на потрібну сторінку вашого сайту.",
    icon: Link2,
    q: "Як підключити віджет на свій сайт?",
  },
  {
    a: 'Тариф "Старт" повністю безкоштовний назавжди. Також даємо 14 днів Бізнес-функцій для тестування. Жодних кредитних карток — просто зареєструйтесь та почніть.',
    icon: Sparkles,
    q: "Чи є безкоштовний пробний період?",
  },
  {
    a: "Автоматичні нагадування за 24 та 2 години до візиту. Гості отримують SMS та Email нагадування. Наші клієнти зменшують no-shows на 70% завдяки цьому механізму.",
    icon: Bell,
    q: "Як система зменшує no-shows?",
  },
  {
    a: "Ми приймаємо Visa, Mastercard, Apple Pay, Google Pay. Також можлива оплата за реквізитами для юридичних осіб. Платіж списується автоматично щомісяця.",
    icon: CheckCircle2,
    q: "Які способи оплати доступні?",
  },
];

export function LandingFAQ() {
  return (
    <LandingSection
      badge="FAQ"
      title="Популярні запитання"
      description="Відповідаємо на найпоширеніші питання про нашу систему"
      className="from-background via-muted/10 to-background bg-linear-to-b"
    >
      <FloatingElement className="top-32 left-[5%] h-12 w-12" delay={0}>
        <div className="h-12 w-12 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-48 right-[8%] h-16 w-16" delay={600}>
        <div className="h-16 w-16 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[10%] h-10 w-10" delay={1200}>
        <div className="h-10 w-10 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[12%] h-14 w-14" delay={1800}>
        <div className="h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-card/80 border-border/50 group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-lg"
          >
            <AccordionTrigger className="group-hover:bg-muted/30 px-6 py-5 transition-colors hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground hidden h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 sm:flex">
                  <faq.icon className="h-5 w-5" />
                </div>
                <span className="text-foreground text-lg font-semibold">
                  {faq.q}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5">
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:hidden">
                  <faq.icon className="h-4 w-4" />
                </div>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </LandingSection>
  );
}
