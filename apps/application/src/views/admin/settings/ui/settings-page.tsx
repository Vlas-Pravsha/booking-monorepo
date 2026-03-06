"use client";

import { Save } from "lucide-react";
import * as React from "react";

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
        title="Налаштування"
        subtitle="Конфігурація закладу та системи"
        action={
          <Button className="shadow-primary/20 hover:shadow-primary/30 gap-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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
