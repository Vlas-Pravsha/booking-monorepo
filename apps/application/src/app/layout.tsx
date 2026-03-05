import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReactQueryProvider, StoreProvider } from "./providers";

import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
    <html lang="uk">
      <body className={inter.className}>
        <StoreProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
