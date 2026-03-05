"use client";

import { ArrowRight, Check } from "lucide-react";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-card/80 border-border/50 rounded-3xl border p-8 text-center backdrop-blur-sm">
        <div className="bg-green-500/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-3 text-2xl font-bold">Дякуємо!</h3>
        <p className="text-muted-foreground mb-6">
          Ми отримали ваше повідомлення і відповімо найближчим часом.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Надіслати ще одне
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card/80 border-border/50 rounded-3xl border p-8 shadow-xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Ім&apos;я</Label>
            <Input id="contact-name" placeholder="Олександр" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Телефон</Label>
            <Input
              id="contact-phone"
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
            type="email"
            placeholder="info@restaurant.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Повідомлення</Label>
          <textarea
            id="contact-message"
            placeholder="Опишіть ваше питання..."
            className="border-input flex min-h-[120px] w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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

        <p className="text-muted-foreground text-center text-xs">
          Натискаючи &quot;Надіслати&quot;, ви погоджуєтесь з обробкою
          персональних даних
        </p>
      </form>
    </div>
  );
}
