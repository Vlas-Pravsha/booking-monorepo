"use client";

import {
  Bell,
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Timer,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { Switch } from "@/shared/ui/switch";

function SettingItem({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-border/50 last:border-0">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-2 rounded-lg mt-1">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const DAY_LABELS: Record<string, string> = {
  friday: "П'ятниця",
  monday: "Понеділок",
  saturday: "Субота",
  sunday: "Неділя",
  thursday: "Четвер",
  tuesday: "Вівторок",
  wednesday: "Середа",
};

export function SettingsPage() {
  const [notifications, setNotifications] = React.useState({
    bookings: true,
    marketing: false,
    reminders: true,
    sms: true,
    telegram: true,
  });

  const handleBookingsChange = React.useCallback((checked: boolean) => {
    setNotifications((prev) => ({ ...prev, bookings: checked }));
  }, []);

  const handleRemindersChange = React.useCallback((checked: boolean) => {
    setNotifications((prev) => ({ ...prev, reminders: checked }));
  }, []);

  const handleMarketingChange = React.useCallback((checked: boolean) => {
    setNotifications((prev) => ({ ...prev, marketing: checked }));
  }, []);

  const handleSmsChange = React.useCallback((checked: boolean) => {
    setNotifications((prev) => ({ ...prev, sms: checked }));
  }, []);

  const handleTelegramChange = React.useCallback((checked: boolean) => {
    setNotifications((prev) => ({ ...prev, telegram: checked }));
  }, []);

  const [schedule] = React.useState({
    friday: { close: "23:00", enabled: true, open: "10:00" },
    monday: { close: "22:00", enabled: true, open: "10:00" },
    saturday: { close: "23:00", enabled: true, open: "10:00" },
    sunday: { close: "21:00", enabled: true, open: "11:00" },
    thursday: { close: "22:00", enabled: true, open: "10:00" },
    tuesday: { close: "22:00", enabled: true, open: "10:00" },
    wednesday: { close: "22:00", enabled: true, open: "10:00" },
  });

  return (
    <DashboardShell>
      <PageHeader
        title="Налаштування"
        subtitle="Конфігурація закладу та системи"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <Save className="h-4 w-4" />
            Зберегти зміни
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Інформація про заклад
            </CardTitle>
            <CardDescription>
              Основна інформація про ваш ресторан
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Назва закладу</Label>
              <Input id="name" defaultValue='Ресторан "Смак"' />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Адреса</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  defaultValue="вул. Хрещатик, 1, Київ"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  defaultValue="+380 44 123 4567"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="info@smak.restaurant"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Веб-сайт</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  defaultValue="smak.table-reserve.com"
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Графік роботи
            </CardTitle>
            <CardDescription>
              Налаштування годин роботи для кожного дня
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(schedule).map(([day, { open, close, enabled }]) => (
              <div key={day} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Switch checked={enabled} />
                  <span
                    className={cn(
                      "w-24 capitalize",
                      !enabled && "text-muted-foreground"
                    )}
                  >
                    {DAY_LABELS[day] ?? day}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    defaultValue={open}
                    disabled={!enabled}
                    className="w-28 bg-white/50"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="time"
                    defaultValue={close}
                    disabled={!enabled}
                    className="w-28 bg-white/50"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Сповіщення
            </CardTitle>
            <CardDescription>
              Налаштування автоматичних сповіщень
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <SettingItem
                icon={Bell}
                title="Нові бронювання"
                description="Сповіщення про нові бронювання"
              >
                <Switch
                  checked={notifications.bookings}
                  onCheckedChange={handleBookingsChange}
                />
              </SettingItem>
              <SettingItem
                icon={Timer}
                title="Нагадування гостям"
                description="Автоматичні нагадування за 2 години до візиту"
              >
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={handleRemindersChange}
                />
              </SettingItem>
              <SettingItem
                icon={Mail}
                title="Email розсилка"
                description="Маркетингові повідомлення та акції"
              >
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={handleMarketingChange}
                />
              </SettingItem>
              <SettingItem
                icon={Phone}
                title="SMS сповіщення"
                description="Відправка SMS через шлюз"
              >
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={handleSmsChange}
                />
              </SettingItem>
              <SettingItem
                icon={Shield}
                title="Telegram бот"
                description="Сповіщення та керування через Telegram"
              >
                <Switch
                  checked={notifications.telegram}
                  onCheckedChange={handleTelegramChange}
                />
              </SettingItem>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Налаштування бронювання
            </CardTitle>
            <CardDescription>Параметри системи бронювання</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Середня тривалість (хвилин)</Label>
              <Input id="duration" type="number" defaultValue="90" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="advance">Максимальна бронь наперед (днів)</Label>
              <Input id="advance" type="number" defaultValue="30" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slot">Інтервал слотів (хвилин)</Label>
              <Input id="slot" type="number" defaultValue="30" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minGuests">Мінімальна кількість гостей</Label>
              <Input id="minGuests" type="number" defaultValue="1" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxGuests">Максимальна кількість гостей</Label>
              <Input id="maxGuests" type="number" defaultValue="20" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Підтвердження бронювань</p>
                <p className="text-sm text-muted-foreground">
                  Автоматичне підтвердження без перевірки
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
