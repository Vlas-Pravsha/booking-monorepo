import type { Metadata } from "next";

import { AdminFooter } from "@/widgets/admin/footer";
import { AdminSidebar } from "@/widgets/admin/sidebar";

export const metadata: Metadata = {
  title: "Адмін-панель | TableReserve",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar className="fixed inset-y-0 left-0 z-50" />
      <main className="flex-1 ml-64 bg-slate-50/50 min-h-screen flex flex-col">
        <div className="container mx-auto p-6 flex-1">{children}</div>
        <AdminFooter />
      </main>
    </div>
  );
}
