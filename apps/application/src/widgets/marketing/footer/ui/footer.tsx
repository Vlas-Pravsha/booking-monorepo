"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Separator } from "@/shared/ui/separator";

const FOOTER_LINKS = [
  {
    links: [
      { name: "Можливості", href: "#features" },
      { name: "Як це працює", href: "#how-it-works" },
      { name: "Тарифи", href: "#pricing" },
    ],
    title: "Продукт",
  },
  {
    links: [
      { name: "Допомога", href: "/help" },
      { name: "Контакти", href: "/contact" },
    ],
    title: "Підтримка",
  },
  {
    links: [
      { name: "Умови використання", href: "/terms" },
      { name: "Конфіденційність", href: "/privacy" },
    ],
    title: "Юридична інформація",
  },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  const [year, setYear] = React.useState<number>(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">
                TableReserve
                <span className="text-primary">.com</span>
              </span>
            </Link>
            <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
              Розумна система бронювання столів для вашого ресторану. Збільшуйте
              прибуток та керуйте закладом ефективно.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-background border hover:bg-primary hover:text-primary-foreground transition-all"
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
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
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
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Зроблено в Україні 🇺🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
