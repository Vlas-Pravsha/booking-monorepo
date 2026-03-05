"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  PartyPopper,
  Phone,
  Plus,
  Sparkles,
  Timer,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
  AnimatedBackground,
  FloatingElement,
} from "@/shared/ui/animated-background";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const STEPS = [
  { icon: Sparkles, id: 0, title: "Вітання" },
  { icon: Utensils, id: 1, title: "Про ресторан" },
  { icon: Clock, id: 2, title: "Графік" },
  { icon: CheckCircle2, id: 3, title: "Готово" },
];

interface OnboardingData {
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  averageDuration: number;
  tables: { seats: number; name: string }[];
}

const initialData: OnboardingData = {
  address: "",
  averageDuration: 90,
  closingTime: "22:00",
  email: "",
  openingTime: "10:00",
  phone: "",
  restaurantName: "",
  tables: [
    { seats: 2, name: "Стіл 1" },
    { seats: 4, name: "Стіл 2" },
    { seats: 4, name: "Стіл 3" },
    { seats: 6, name: "Стіл 4" },
  ],
};

function WelcomeStep() {
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
        ].map((item, i) => (
          <Card
            key={i}
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

function RestaurantInfoStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Про ресторан</h2>
        <p className="text-muted-foreground">
          Розкажіть нам основну інформацію про заклад
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Основна інформація
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Назва ресторану</Label>
              <Input
                id="restaurantName"
                placeholder='Ресторан "Улюблен"'
                value={data.restaurantName}
                onChange={(e) => updateData({ restaurantName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адреса</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  className="pl-10"
                  placeholder="вул. Хрещатик, 1, Київ"
                  value={data.address}
                  onChange={(e) => updateData({ address: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Контакти
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+38 (099) 123-45-67"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@restaurant.ua"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ScheduleStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}) {
  const durations = [60, 90, 120, 150, 180];

  const addTable = () => {
    updateData({
      tables: [
        ...data.tables,
        { name: `Стіл ${data.tables.length + 1}`, seats: 2 },
      ],
    });
  };

  const removeTable = (index: number) => {
    updateData({
      tables: data.tables.filter((_, i) => i !== index),
    });
  };

  const updateTable = (index: number, seats: number) => {
    const newTables = [...data.tables];
    const existingTable = newTables[index];
    if (existingTable) {
      newTables[index] = { ...existingTable, seats };
      updateData({ tables: newTables });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Налаштування залу</h2>
        <p className="text-muted-foreground">
          Визначте час роботи та конфігурацію столів
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border-none bg-muted/30 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Години роботи
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="openingTime"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Відкриття
                  </Label>
                  <div className="relative">
                    <Input
                      id="openingTime"
                      type="time"
                      className="bg-background/50 h-11"
                      value={data.openingTime}
                      onChange={(e) =>
                        updateData({ openingTime: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="closingTime"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Закриття
                  </Label>
                  <Input
                    id="closingTime"
                    type="time"
                    className="bg-background/50 h-11"
                    value={data.closingTime}
                    onChange={(e) =>
                      updateData({ closingTime: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/30 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Тривалість візиту
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-2">
                {durations.map((duration) => (
                  <Button
                    key={duration}
                    variant={
                      data.averageDuration === duration ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateData({ averageDuration: duration })}
                    className={cn(
                      "h-10 transition-all px-2",
                      data.averageDuration === duration
                        ? "shadow-md shadow-primary/20"
                        : "bg-background/50"
                    )}
                  >
                    {duration}
                    <span className="ml-1 text-[10px] opacity-70">хв</span>
                  </Button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 leading-tight italic">
                * Середній час бронювання одного столу
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Столи та місця
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/50 h-8"
              onClick={addTable}
            >
              <Plus className="w-4 h-4 mr-1" />
              Додати стіл
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {data.tables.map((table, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/60 border border-transparent hover:border-primary/20 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">
                      {table.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-primary/70" />
                      <span className="text-sm font-bold">
                        {table.seats}{" "}
                        {table.seats === 1
                          ? "місце"
                          : (table.seats < 5
                            ? "місця"
                            : "місць")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md hover:bg-background"
                        onClick={() =>
                          updateTable(index, Math.max(1, table.seats - 1))
                        }
                        disabled={table.seats <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md hover:bg-background"
                        onClick={() =>
                          updateTable(index, Math.min(20, table.seats + 1))
                        }
                        disabled={table.seats >= 20}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => removeTable(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {data.tables.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-xl border-muted-foreground/20">
                <Users className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Ви ще не додали жодного столу
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CompletionStep({ restaurantName }: { restaurantName: string }) {
  const subdomain =
    restaurantName
      .toLowerCase()
      .replaceAll(/[^a-z0-9\u0430-\u044F]/gu, "-")
      .replaceAll(/-+/g, "-")
      .replaceAll(/^-|-$/g, "") || "restaurant";
  const domain = `${subdomain}.table-reserve.com`;

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
                href={`https://${domain}`}
                className="text-lg font-bold text-primary hover:underline"
              >
                {domain}
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
            <Link href={`https://${domain}`} target="_blank">
              Переглянути публічну сторінку
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [data, setData] = React.useState<OnboardingData>(initialData);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        return data.restaurantName.trim().length > 0;
      }
      case 2: {
        return data.tables.length > 0;
      }
      default: {
        return true;
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: {
        return <WelcomeStep />;
      }
      case 1: {
        return <RestaurantInfoStep data={data} updateData={updateData} />;
      }
      case 2: {
        return <ScheduleStep data={data} updateData={updateData} />;
      }
      case 3: {
        return <CompletionStep restaurantName={data.restaurantName} />;
      }
      default: {
        return null;
      }
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />

      <FloatingElement className="top-20 left-[10%] h-16 w-16" delay={0}>
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-primary/10 bg-primary/20 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[15%] h-12 w-12" delay={500}>
        <div className="h-12 w-12 -rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[20%] h-20 w-20" delay={1000}>
        <div className="h-20 w-20 rotate-45 rounded-2xl border border-primary/10 bg-primary/10 backdrop-blur-sm" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[10%] h-14 w-14" delay={1500}>
        <div className="h-14 w-14 rotate-12 rounded-full border border-primary/10 bg-primary/15 backdrop-blur-sm" />
      </FloatingElement>

      <header className="relative z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">
            TableReserve
            <span className="text-primary">.com</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Увійти</Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {!isLastStep && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                          isCompleted &&
                            "border-primary bg-primary text-primary-foreground",
                          isActive &&
                            "border-primary bg-primary/10 text-primary",
                          !isActive &&
                            !isCompleted &&
                            "border-muted bg-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-xs font-medium hidden sm:block",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {renderStep()}

          {!isLastStep && (
            <div className="mt-12 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === STEPS.length - 2 ? "Завершити" : "Далі"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
