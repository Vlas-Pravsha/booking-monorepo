import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReactQueryProvider, StoreProvider } from "./providers";

import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  description:
    "SaaS \u0440\u0456\u0448\u0435\u043D\u043D\u044F \u0434\u043B\u044F \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u0456\u0432",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  title:
    "TableReserve - \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u0441\u0442\u043E\u043B\u0438\u043A\u0456\u0432",
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
