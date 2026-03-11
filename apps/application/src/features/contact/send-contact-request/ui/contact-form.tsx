"use client";

import { ArrowRight, Check } from "lucide-react";
import * as React from "react";

import { semanticToneStyles } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useSendContactRequest } from "../api/use-send-contact-request";

export function ContactForm() {
  const { isPending, isSuccess, mutate, reset } = useSendContactRequest();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    mutate({
      email: formData.get("email")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
      name: formData.get("name")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
    });
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-border/50 bg-card/80 p-8 text-center backdrop-blur-sm">
        <div
          className={cn(
            "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full",
            semanticToneStyles.success.icon
          )}
        >
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mb-3 text-2xl font-bold">Дякуємо!</h3>
        <p className="mb-6 text-muted-foreground">
          Ми отримали ваше повідомлення і відповімо найближчим часом.
        </p>
        <Button variant="outline" onClick={() => reset()}>
          Надіслати ще одне
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/50 bg-card/80 p-8 shadow-xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Ім&apos;я</Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Олександр"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Телефон</Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+38 (099) 123-45-67"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="info@restaurant.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Повідомлення</Label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Опишіть ваше питання..."
            className="border-input flex min-h-[120px] w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full text-base font-semibold"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Відправляємо...
            </span>
          ) : (
            <>
              Надіслати повідомлення
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Натискаючи &quot;Надіслати&quot;, ви погоджуєтесь з обробкою
          персональних даних
        </p>
      </form>
    </div>
  );
}
