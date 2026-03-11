"use client";

import { Bell, Mail, Phone, Shield, Timer } from "lucide-react";
import * as React from "react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { SurfaceCard } from "@/shared/ui/surface-card";
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
    <div className="flex items-start justify-between border-b border-border/50 py-4 last:border-0">
      <div className="flex items-start gap-4">
        <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function NotificationSettings() {
  const [notifications, setNotifications] = React.useState({
    bookings: true,
    marketing: false,
    reminders: true,
    sms: true,
    telegram: true,
  });

  const toggleNotification = React.useCallback(
    (key: keyof typeof notifications) => {
      setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  return (
    <SurfaceCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Сповіщення
        </CardTitle>
        <CardDescription>Налаштування автоматичних сповіщень</CardDescription>
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
              onCheckedChange={() => toggleNotification("bookings")}
            />
          </SettingItem>
          <SettingItem
            icon={Timer}
            title="Нагадування гостям"
            description="Автоматичні нагадування за 2 години до візиту"
          >
            <Switch
              checked={notifications.reminders}
              onCheckedChange={() => toggleNotification("reminders")}
            />
          </SettingItem>
          <SettingItem
            icon={Mail}
            title="Email розсилка"
            description="Маркетингові повідомлення та акції"
          >
            <Switch
              checked={notifications.marketing}
              onCheckedChange={() => toggleNotification("marketing")}
            />
          </SettingItem>
          <SettingItem
            icon={Phone}
            title="SMS сповіщення"
            description="Відправка SMS через шлюз"
          >
            <Switch
              checked={notifications.sms}
              onCheckedChange={() => toggleNotification("sms")}
            />
          </SettingItem>
          <SettingItem
            icon={Shield}
            title="Telegram бот"
            description="Сповіщення та керування через Telegram"
          >
            <Switch
              checked={notifications.telegram}
              onCheckedChange={() => toggleNotification("telegram")}
            />
          </SettingItem>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}
