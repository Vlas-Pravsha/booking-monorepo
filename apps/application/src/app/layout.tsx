import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthBootstrap } from "@/features/auth/session";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/ui";

import { ReactQueryProvider, StoreProvider, ThemeProvider } from "./providers";

import "@/app/styles/globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
});

const interDisplay = Inter({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  description: "SaaS рішення для ресторанів",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  title: "TableReserve - Система бронювання столиків",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          interDisplay.variable,
          "font-sans antialiased selection:bg-primary selection:text-primary-foreground"
        )}
      >
        <ThemeProvider>
          <StoreProvider>
            <ReactQueryProvider>
              <AuthBootstrap />
              <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
                <div
                  aria-hidden="true"
                  className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
                >
                  <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/12" />
                  <div className="absolute right-[-10rem] top-1/4 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/10" />
                  <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-rose-400/12 blur-3xl dark:bg-rose-500/10" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,white,transparent_78%)] dark:bg-[linear-gradient(to_right,rgba(248,250,252,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,250,252,0.05)_1px,transparent_1px)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_48%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.4),transparent_36%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.15),transparent_46%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.28),transparent_34%)]" />
                </div>

                <div className="relative flex min-h-screen flex-col">
                  {children}
                </div>
              </div>
              <Toaster />
            </ReactQueryProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
