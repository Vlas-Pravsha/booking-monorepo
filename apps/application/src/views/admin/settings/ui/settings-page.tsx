"use client";

import { ExternalLink, Save, Sparkles } from "lucide-react";
import Link from "next/link";

import {
  RestaurantIdentitySection,
  RestaurantOperationsSection,
  RestaurantSiteContentSection,
} from "@/entities/restaurant";
import { surfaceClassNames } from "@/shared/config";
import { buildTenantSiteUrl } from "@/shared/lib/tenant";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { AdminPageLoadingState } from "@/views/admin/shared";

import { useAdminSettingsPage } from "../model/use-admin-settings-page";

export function AdminSettingsPage() {
  const settingsPage = useAdminSettingsPage();

  if (!settingsPage.isInitialized) {
    return (
      <DashboardShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <AdminPageLoadingState message="Завантажуємо налаштування ресторану..." />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Конфігурація"
        title="Налаштування"
        subtitle="Тепер адмінка керує тим самим контентом, який бачать гості на доменному сайті."
        insights={[
          {
            label: "Домен",
            tone: "primary",
            value: settingsPage.formData.domain
              ? `${settingsPage.formData.domain}.table-reserve.com`
              : "ще не задано",
          },
          {
            label: "Вітрина",
            tone: "success",
            value: `${settingsPage.enabledSectionsCount}/3 секції увімкнено`,
          },
          {
            label: "Контент",
            tone: "info",
            value: `${settingsPage.contentItemsCount} елементів`,
          },
        ]}
        action={
          <div className="flex items-center gap-3">
            {settingsPage.formData.domain ? (
              <Button variant="outline" asChild>
                <Link
                  href={buildTenantSiteUrl(settingsPage.formData.domain)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Переглянути сайт
                </Link>
              </Button>
            ) : null}
            <Button
              className={surfaceClassNames.actionButton}
              onClick={settingsPage.handleSave}
              disabled={settingsPage.isSaving}
            >
              <Save className="h-4 w-4" />
              {settingsPage.isSaving ? "Зберігаємо..." : "Зберегти зміни"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-6">
        <Card className="border-border/60 bg-linear-to-br from-primary/10 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Що змінилось
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
              З онбордингу та адмінки тепер редагується одна і та сама модель
              ресторану.
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
              Меню, галерея та відгуки можна включати або вимикати незалежно.
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
              Доменний сайт виріс із простої броні в повноцінну презентацію
              бренду.
            </div>
          </CardContent>
        </Card>

        <RestaurantIdentitySection
          value={settingsPage.formData}
          onChange={settingsPage.handleFormChange}
        />
        <RestaurantSiteContentSection
          value={settingsPage.formData}
          onChange={settingsPage.handleFormChange}
        />
        <RestaurantOperationsSection
          value={settingsPage.formData}
          onChange={settingsPage.handleFormChange}
        />
      </div>
    </DashboardShell>
  );
}
