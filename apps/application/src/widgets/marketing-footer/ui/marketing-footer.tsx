"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/features/auth/session";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

const FOOTER_LINKS = [
  {
    links: [
      { href: "#features", name: "Можливості" },
      { href: "#how-it-works", name: "Як це працює" },
      { href: "#pricing", name: "Тарифи" },
      { href: "#contact", name: "Контакти" },
    ],
    title: "Продукт",
  },
] as const;

const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
] as const;

export function MarketingFooter() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [year, setYear] = React.useState<number>(2026);
  const primaryCta = currentUser
    ? { href: "/onboarding", label: "Продовжити онбординг" }
    : { href: "/register", label: "Створити акаунт" };

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">
                TableReserve
                <span className="text-primary">.com</span>
              </span>
            </Link>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Розумна система бронювання столів для вашого ресторану. Збільшуйте
              прибуток та керуйте закладом ефективно.
            </p>
            <Button className="w-full sm:w-auto" asChild>
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border bg-background transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-16" />

        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} TableReserve.com. Усі права захищені.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Зроблено в Україні
          </p>
        </div>
      </div>
    </footer>
  );
}
