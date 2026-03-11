"use client";

import { Save } from "lucide-react";

import { surfaceClassNames } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

import { BookingSettings } from "./sections/booking-settings";
import { GeneralSettings } from "./sections/general-settings";
import { NotificationSettings } from "./sections/notification-settings";
import { ScheduleSettings } from "./sections/schedule-settings";

export function AdminSettingsPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Конфігурація"
        title="Налаштування"
        subtitle="Керуйте конфігурацією закладу, графіком, сповіщеннями та правилами бронювання."
        insights={[
          {
            label: "Конфігурація",
            tone: "primary",
            value: "4 модулі налаштувань",
          },
          {
            label: "Операційний режим",
            tone: "success",
            value: "Заклад працює 7 днів на тиждень",
          },
          {
            label: "Синхронізація",
            tone: "info",
            value: "Система активна і готова до змін",
          },
        ]}
        action={
          <Button className={surfaceClassNames.actionButton}>
            <Save className="h-4 w-4" />
            Зберегти зміни
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <GeneralSettings />
        <ScheduleSettings />
        <NotificationSettings />
        <BookingSettings />
      </div>
    </DashboardShell>
  );
}
